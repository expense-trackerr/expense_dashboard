import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export function ListOfTodos({ token }: { token: string }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const fetchData = async () => {
    const result = await axios.get("http://localhost:3000/api/todo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(result.data.todos);
  };

  const handleLogout = () => {
    localStorage.clear();
    const auth = getAuth();
    signOut(auth).then(() => {
      alert("Signed Out. Refresh the page to login again");
    });
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <h1>This is a secured page.</h1>
      <h3>Here is the data</h3>
      {data.map((item: any) => (
        <div key={item.id}>
          <h4>{item.title}</h4>
        </div>
      ))}
    </>
  );
}

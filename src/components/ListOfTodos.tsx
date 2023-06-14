import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AddCategories } from "./AddCategories";

export function ListOfTodos() {
  const [data, setData] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

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
    signOut(auth).then();
    navigate("/login");
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <h3>Here is the data</h3>
      {data.map((item: any) => (
        <div key={item.id}>
          <h4>{item.title}</h4>
        </div>
      ))}
      <AddCategories />
    </>
  );
}

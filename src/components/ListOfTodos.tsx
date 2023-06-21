import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import { AddCategories } from './AddCategories';

type TodoData = {
  data: {
    todos: {
      id: number;
      title: string;
    }[];
  };
};

export function ListOfTodos() {
  const [data, setData] = useState<TodoData['data']['todos']>([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) void fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const result: TodoData = await axios.get(
        'http://localhost:3000/api/todo'
      );
      if (result.data.todos) {
        setData(result.data.todos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    const auth = getAuth();
    void signOut(auth).then();
    navigate('/login');
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <h3>Here is the data</h3>
      {data.map((item) => (
        <div key={item.id}>
          <h4>{item.title}</h4>
        </div>
      ))}
      <AddCategories />
    </>
  );
}

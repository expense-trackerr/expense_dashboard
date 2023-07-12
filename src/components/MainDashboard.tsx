import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import { Categories } from '../containers/Categories';
import Navbar from '../containers/NavBar';
import { AddCategories } from './AddCategories';

type TodoData = {
  data: {
    todos: {
      id: number;
      title: string;
    }[];
  };
};

export function MainDashboard() {
  const [data, setData] = useState<TodoData['data']['todos']>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) void fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const result: TodoData = await axios.get(
        'http://localhost:3000/api/categories'
      );
      console.log('result:', result);
      if (result.data.todos) {
        setData(result.data.todos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Categories />
          </Grid>
          {data.map((item) => (
            <div key={item.id}>
              <h4>{item.title}</h4>
            </div>
          ))}
          <AddCategories />
        </Grid>
      </Container>
    </>
  );
}

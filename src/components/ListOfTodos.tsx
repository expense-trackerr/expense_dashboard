import React, { useEffect } from "react";
import axios from "axios";

export function ListOfTodos({ token }: { token: string }) {
  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const fetchData = async () => {
    const result = await axios.get("http://localhost:3000/api/todo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("result:", result.data);
  };

  return <h1>This is a secured page</h1>;
}

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from '../config/axiosConfig';
import { AxiosError } from 'axios';

export const AddCategories = () => {
  const [fields, setFields] = useState<string[]>(['']);

  const handleAddField = () => {
    setFields([...fields, '']);
  };

  const handleChange = (index: number, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;
    setFields(updatedFields);
  };

  const handleSubmit = () => {
    axios
      .post('http://localhost:3000/api/categories/create', {
        categories: fields,
      })
      .catch((err) => {
        const error = err as AxiosError<{ message: string }>;
        console.error(error.response?.data.message);
      });
  };

  return (
    <>
      {fields.map((field, index) => (
        <div key={index}>
          <TextField
            label="Text Field"
            value={field}
            onChange={(e) => {
              handleChange(index, e.target.value);
            }}
          />
        </div>
      ))}
      <Button variant="contained" onClick={handleAddField}>
        Add
      </Button>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};

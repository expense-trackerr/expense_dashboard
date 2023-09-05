import { Button, Grid } from '@mui/material';
import { useContext } from 'react';
import defaultAxios from '../../config/axiosConfig';
import { PlaidContext } from '../../contexts/PlaidContext';

export function MainDashboard() {
  const { linkToken, linkTokenError, accessToken } = useContext(PlaidContext);

  // const [transactions, setTransactions] = useState();

  const handleGetTransactions = () => {
    if (accessToken) {
      defaultAxios
        .get('http://localhost:3000/api/transactions')
        .then((res) => {
          console.log(res.data);
          // setTransactions(res.data.transactions);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (accessToken) return <Button onClick={handleGetTransactions}>Get transactions</Button>;

  return;
}

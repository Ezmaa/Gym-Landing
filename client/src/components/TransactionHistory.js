import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const TransactionHistory = () => {
  const { loading, error, data } = useQuery(QUERY_ME);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (data && data.me) {
      const userEmail = data.me.email;
      const fetchTransactions = async () => {
        try {
          const response = await fetch(`/api/transactions?email=${encodeURIComponent(userEmail)}`);
          if (response.ok) {
            const data = await response.json();
            setTransactions(data);
          } else {
            throw new Error('Failed to fetch transactions');
          }
        } catch (error) {
          console.error('Error fetching transactions:', error);
          setTransactions([]); // Set transactions to an empty array in case of error
        }
      };

      fetchTransactions();
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!transactions || transactions.length === 0) {
    return <div>No transactions found.</div>;
  }

  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            Transaction ID: {transaction.id} - Amount: {(transaction.amount/100).toFixed(2)} {transaction.currency} - Status: {transaction.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;

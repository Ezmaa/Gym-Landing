import React, {useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import Checkout from '../components/Checkout';
import TransactionHistory from '../components/TransactionHistory';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const MyAccount = () => {
  const { loading, error, data } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState('');

  useEffect(() => {
    if (data && data.me) {
      setUserData(data)
    }
  }, [data]);

  if (!Auth.loggedIn()) {
    return <Navigate to='/login' />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='lg:pt-[140px]'>
      <h1 className='text-4xl font-bold text-gray-800 mb-6'>Welcome</h1>
      <Checkout email={userData.me && userData.me.email}></Checkout>
      <TransactionHistory />
    </div>
  );
};

export default MyAccount;

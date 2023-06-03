import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import Auth from '../utils/auth';

const MyAccount = () => {

    
    if (!Auth.loggedIn()) {
        return <Navigate to='/login' />;
    };

    return(
        <div className='lg:pt-[140px]'>
            <h1>Welcome</h1>
        </div>
    );
};

export default MyAccount;
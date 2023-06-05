import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { loginPage } from '../data';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
   
    try {
      console.log(formState)
      const { data } = await login({
        variables: { ...formState }
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: ''
    });
  };
  const { title, formSubmitBtn, errorMessage } = loginPage;
  return (
    <main className='flex-row justify-center flex-row justify-center lg:pt-[140px] max-w-[1440px] mx-auto overflow-hidden relative'>
      <div className='col-12 col-lg-10'>
        <div className='card'>
          <h4 className='card-header p-2'>{title}</h4>
          <div className='card-body'>
            {data ? (
              <p>
                Success! You may now head <Link to='/'>back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className='form-input'
                  placeholder='Enter your email'
                  name='email'
                  type='email'
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className='form-input'
                  placeholder='******'
                  name='password'
                  type='password'
                  value={formState.password}
                  onChange={handleChange}
                />
                
                <button
                  className='btn btn-block btn-info'
                  style={{ cursor: 'pointer' }}
                  type='submit'
                >
                  {formSubmitBtn}
                </button>
          
                <div className='row'>
                  <div className='col s4'>
                    <Link to='/ForgotPassword'> Forgot password?</Link>
                  </div>
                </div>
              </form>
            )}

            {error && <div className='my-3 p-3 bg-danger'>{errorMessage}</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
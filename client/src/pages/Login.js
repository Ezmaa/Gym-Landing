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
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-semibold mb-6">{title}</h1>
          {data ? (
            <p>
              Success! You may now head <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formState.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none hover:text-primary-200"
              />
              <input
                type="password"
                name="password"
                placeholder="******"
                value={formState.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none hover:text-primary-200"
              />
              <button
                type="submit"
                className="w-full bg-primary-200 text-white py-2 px-4 rounded hover:text-primary-200transition-colors"
              >
                {formSubmitBtn}
              </button>
              <div className="text-center">
                <Link to="/ForgotPassword" className="text-primary-200 hover:text-primary-200">
                  Forgot password?
                </Link>
              </div>
            </form>
          )}
          {error && <div className="my-3 p-3 bg-danger">{errorMessage}</div>}
        </div>
      </div>
    </main>
  );
};

export default Login;

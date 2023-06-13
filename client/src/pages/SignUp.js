import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { signupPage } from '../data';
import Auth from '../utils/auth';

const SignUp = () => {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      const [addUser, { error, data }] = useMutation(ADD_USER);
    
      const [dateValue, setDateValue] = useState(new Date());
    
    
      // update state based on form input changes
      const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    
      // submit form
      const handleFormSubmit = async (event) => {
        console.log(formState);
        event.preventDefault();

        // Check if the password and confirmPassword match
        if (formState.password !== formState.confirmPassword) {
            alert('passwords do not match')
            return; // Stop form submission
        }
    
        try {
          const { data } = await addUser({
            variables: { ...formState }
          });
    
          Auth.login(data.addUser.token);
        } catch (e) {
          console.error(e);
        }
      };
      const { title, formSubmitBtn } = signupPage;
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
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-gray-800">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Your First Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none hover:text-primary-200 "
                    value={formState.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-2 text-gray-800">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Your Last Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none hover:text-primary-200 "
                    value={formState.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-gray-800">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none hover:text-primary-200 "
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-gray-800">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Your Password"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none hover:text-primary-200 "
                    value={formState.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block mb-2 text-gray-800">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none hover:text-primary-200"
                    value={formState.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-200 text-white py-2 px-4 rounded hover:text-primary-300  transition-colors"
                >
                  {formSubmitBtn}
                </button>
              </form>
            )}
            {error && <div className="my-3 p-3 bg-danger">{error.message}</div>}
          </div>
        </div>
      </main>
      );
    }; 
  
  export default SignUp;
  
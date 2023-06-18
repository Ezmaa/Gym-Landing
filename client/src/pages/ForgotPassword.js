import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { QUERY_USER_BY_EMAIL } from '../utils/queries';
import { forgotPassword } from '../data';

const ForgotPassword = (props) => {
  const [formState, setFormState] = useState({ email: '' });
  const [emailSent, setEmailSent] = useState(false);
  const [getUserByEmail, { loading, data, error }] = useLazyQuery(QUERY_USER_BY_EMAIL);

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
    event.preventDefault();

    try {
      const response = await fetch('/api/reset-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formState.email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setEmailSent(true);
        console.log(data); // Display the response data in the console
      } else {
        alert('wrong email');
      }
    } catch (error) {
      console.error(error);
    }

    // clear form values
    setFormState({
      email: '',
    });
  };

  const { title, success, btnLoginText, formSubmitBtn } = forgotPassword;

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-semibold mb-6">{title}</h1>
          <div className="card-body">
            {emailSent ? (
              <p>{success}</p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 text-gray-800">
                    Enter your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Your email"
                  />
                </div>

                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  {formSubmitBtn}
                </button>

                <div className="mt-4 text-center">
                  <Link to="/Login" className="text-indigo-500">
                    {btnLoginText}
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
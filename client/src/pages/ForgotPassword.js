import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { QUERY_USER_BY_EMAIL } from '../utils/queries'
import { forgotPassword } from '../data';


const ForgotPassword = (props) => {
  const [formState, setFormState] = useState({ email: '' });
  const [emailSent, setEmailSent] = useState()
  const [getUserByEmail, { loading, data, error }] = useLazyQuery(QUERY_USER_BY_EMAIL);

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
        const response = await fetch('/api/reset-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formState.email
          })
        });
  
        if (response.ok) {
          const data = await response.json();
          setEmailSent(true)
          console.log(data); // Display the response data in the console
        } else {
          alert('wrong email')
        }
      } catch (error) {
        console.error(error);
      }

    // clear form values
    setFormState({
      email: ''
    });
  };
  const { title, success, btnLoginText, formSubmitBtn } = forgotPassword;
  return (
    <main className='flex-row justify-center flex-row justify-center lg:pt-[140px] max-w-[1440px] mx-auto overflow-hidden relative'>
      <div className='col-12 col-lg-10'>
        <div className='card'>
          <h4 className='card-header p-2'>{title}</h4>
          <div className='card-body'>
            {emailSent ? (
              <p>
                {success}
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
                
                <button
                  className='btn btn-block btn-info'
                  style={{ cursor: 'pointer' }}
                  type='submit'
                >
                  {formSubmitBtn}
                </button>
          
                <div className='row'>
                  <div className='col s4'>
                    <Link  to='/Login'> {btnLoginText} </Link>
                  </div>
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

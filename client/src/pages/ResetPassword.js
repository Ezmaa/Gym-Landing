import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { resetPassword } from '../data';

import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from '../utils/mutations';

import Auth from '../utils/auth';

const ResetPassword = () => {
  const [formState, setFormState] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [changePassword, { error, data }] = useMutation(CHANGE_PASSWORD);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  console.log(token)

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if the password and confirmPassword match
    if (formState.newPassword !== formState.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const { data } = await changePassword({
        variables: {
          resetToken: token,
          newPassword: formState.newPassword
        }
      });

      console.log(data); // Handle the response data as needed
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!token) {
      // Token not found in the URL redirect
      window.location.replace('/404');
    } 
    // Token is expired
    if (Auth.isTokenExpired(token) === true){
      window.location.replace('/404');
    }
  }, [token]);
  // destructure banner data
  const { title, success, btnLoginText, newPasswordLabel, confirmPasswordLabel, formSubmitBtn } = resetPassword;
  return (
    <main className='flex-row justify-center lg:pt-[140px] max-w-[1440px] mx-auto overflow-hidden relative'>
      <div className='col-12 col-lg-10'>
        <div className='card'>
          <h4 className='card-header'>{title}</h4>
          <div className=''>
            {data ? (
              <div>
                <div className='row'>
                  <p>
                    {success}
                  </p>
                </div>
                <div className='row'>
                  <div className='col s4'>
                    <a  href='/Login'> {btnLoginText} </a>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div className='row'>
                    <form className='col s12' onSubmit={handleFormSubmit}>
                      <div className='container'>
                        <div className='row'>
                          <div className='col s12' id='reg-form'>
                            <div className='row'>
                              <div className='input-field col s12'>
                                <input
                                  id='newPassword'
                                  type='password'
                                  className='validate'
                                  minLength='6'
                                  required
                                  name='newPassword'
                                  value={formState.newPassword}
                                  onChange={handleChange}
                                />
                                <label htmlFor='newPassword'>{newPasswordLabel}</label>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='input-field col s12'>
                                <input
                                  id='confirmPassword'
                                  type='password'
                                  className='validate'
                                  minLength='6'
                                  required
                                  name='confirmPassword'
                                  value={formState.confirmPassword}
                                  onChange={handleChange}
                                />
                                <label htmlFor='confirmPassword'>{confirmPasswordLabel}</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className='btn btn-block btn-info'
                        style={{ cursor: 'pointer' }}
                        type='submit'
                      >
                        {formSubmitBtn}
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}

            {error && <div className='my-3 p-3 bg-danger'>{error.message}</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;


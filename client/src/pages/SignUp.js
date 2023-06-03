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
        <main className='flex-row justify-center lg:pt-[140px] max-w-[1440px] mx-auto overflow-hidden relative'>
          <div className='col-12 col-lg-10'>
            <div className='card'>
              <h4 className='card-header'>{title}</h4>
              <div className=''>
                {data ? (
                  <p>
                    Success! You may now head <Link to='/'>back to the homepage.</Link>
                  </p>
                ) : (
                  <>
                    <div>
                      <div className='row'>
                        <form className='col s12' onSubmit={handleFormSubmit}>
                          <div class='container'>
                            <div className='row'>
                              <div className='col s12' id='reg-form'>
                                <div className='row'>
                                  <div className='input-field col s6'>
                                    <input
                                      id='first_name'
                                      name='firstName'
                                      type='text'
                                      className='validate'
                                      required
                                      value={formState.firstName}
                                      onChange={handleChange}
                                    />
                                    <label for='first_name'>First Name</label>
                                  </div>
                                  <div className='input-field col s6'>
                                    <input
                                      id='last_name'
                                      name='lastName'
                                      type='text'
                                      className='validate'
                                      required
                                      value={formState.lastName}
                                      onChange={handleChange}
                                    />
                                    <label for='last_name'>Last Name</label>
                                  </div>
                                </div>
                                <div className='row'>
                                  <div className='input-field col s12'>
                                    <input
                                      id='email'
                                      name='email'
                                      type='email'
                                      className='validate'
                                      required
                                      value={formState.email}
                                      onChange={handleChange}
                                    />
                                    <label for='email'>Email</label>
                                  </div>
                                </div>
                                <div className='row'>
                                  <div className='input-field col s12'>
                                    <input
                                      id='password'
                                      type='password'
                                      className='validate'
                                      minlength='6'
                                      required
                                      name='password'
                                      value={formState.password}
                                      onChange={handleChange}
                                    />
                                    <label for='password'>Password</label>
                                  </div>
                                </div>
                                <div className='row'>
                                  <div className='input-field col s12'>
                                    <input
                                      id='confirmPassword'
                                      type='password'
                                      className='validate'
                                      minlength='6'
                                      required
                                      name='confirmPassword'
                                      value={formState.confirmPassword}
                                      onChange={handleChange}
                                    />
                                    <label for='confirmPassword'>Confirm Password</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className='btn btn-block btn-info'
                            style={{ cursor: 'pointer' }}
                            type='submit'>
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
  
  export default SignUp;
  
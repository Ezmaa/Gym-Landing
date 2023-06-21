import React, { useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

// import data
import { pricing } from '../data';

// import components
import PlanList from './PlanList';

const Pricing = () => {
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: index, quantity, customer_email: null }),
      });
  
      const { sessionId } = await response.json();
  
      // Check if sessionId is defined
      if (sessionId) {
        // Fetch the checkout session data to get the URL
        const sessionResponse = await fetch(`/api/checkout-session/${sessionId}`);
        const { url } = await sessionResponse.json();
  
        // Redirect the user to the Stripe Checkout page
        window.location.href = url;
      } else {
        console.error('Invalid sessionId');
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <section className='section' id='pricing-link'>
      <div className='lg:pt-[140px]'>
            <p>Select number of atheletes</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <div className='flex flex-col lg:flex-row items-center justify-center max-w-[1280px] mx-auto gap-y-4'>
          {pricing.plans.map((plan, currentIndex) => {
            // destructure plan
            const { name, price, list } = plan;
            return (
              <div
                onClick={() => setIndex(currentIndex)}
                key={currentIndex}
                className='w-full md:max-w-[620px] lg:max-w-[405px] rounded-sm px-4 lg:min-h-[550px]'
              >
                <div
                  className={`${
                    currentIndex === index
                      ? 'bg-neutral-500 text-white'
                      : 'bg-neutral-400/10 text-neutral-500'
                  } flex justify-center items-center py-[40px] px-[30px] lg:min-h-[550px] transition duration-100`}
                >
                  <div className='flex flex-row lg:flex-col gap-x-8 gap-y-8 lg:gap-x-0 items-center'>
                    {/* name & price wrapper */}
                    <div>
                      {/* name */}
                      <div
                        className={`${
                          currentIndex === index
                            ? 'bg-white text-neutral-500'
                            : 'bg-neutral-500 text-white'
                        } h-[26px] font-primary text-sm font-semibold max-w-min mx-auto px-[14px] flex items-center justify-center mb-8`}
                      >
                        {name}
                      </div>
                      {/* price */}
                      <div className='text-[40px] lg:text-[50px] font-primary font-extrabold text-center flex flex-col items-center justify-center'>
                        <div className='leading-none'>
                          <span className='tracking-[0.1px]'>{price}</span>
                          <span className='text-[30px] font-extrabold'>$</span>
                        </div>
                        <span className='text-sm font-medium'>/athlete</span>
                      </div>
                    </div>
                    {/* list & btn wrapper */}
                    <div>
                      {/* list */}
                      <ul className='flex flex-col gap-y-4 mb-8'>
                        {list.map((item, idx) => {
                          return (
                            <li
                              className='flex items-center gap-x-[10px]'
                              key={idx}
                            >
                              <div>
                                <BsCheckCircleFill className='text-lg' />
                              </div>
                              <div>{item.name}</div>
                            </li>
                          );
                        })}
                      </ul>
                      {/* btn */}
                      {currentIndex === index && (
                        <button
                          className='bg-white text-neutral-500 btn btn-lg rounded-[1px] lg:mx-auto'
                          onClick={handleCheckout}
                        >
                          Proceed to checkout
                        </button>
                      )}
                      
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

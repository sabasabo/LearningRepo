import React from 'react';
import { useScript } from '../hooks';

export const Script = () => {
  const [isLoaded, isError] = useScript(
    'https://www.google.com/recaptcha/api.js'
  );
  console.log('Script -> isLoaded, isError', isLoaded, isError);
  if (isError) {
    return null;
  }
  return (
    <div>
        <h1>Script</h1>
      {/* {isLoaded && (
        <button
          className='g-recaptcha'
          data-sitekey='reCAPTCHA_site_key'
          data-callback='onSubmit'
          data-action='submit'
        >
          Submit
        </button>
      )} */}
    </div>
  );
};

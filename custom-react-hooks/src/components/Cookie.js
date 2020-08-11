import React from 'react';
import { useCookie } from '../hooks';

export const Cookie = () => {
  const [cookie, setCookie] = useCookie({ key: 'test-key' });
  console.log('Cookie -> cookie', cookie);
  return (
    <div>
      <h1>{cookie || ''}</h1>
      <input
        type='text'
        value={cookie}
        onChange={e => setCookie(e.target.value)}
      />
    </div>
  );
};

import React from 'react';
import { useLocalStorage } from '../hooks';

export const LocalStorage = () => {
  const [value, setValue] = useLocalStorage({
    key: 'test :)',
    initial: 'I Am Initial'
  });
  return (
    <div>
      <h1>{value || ''}</h1>
      <input
        type='text'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};

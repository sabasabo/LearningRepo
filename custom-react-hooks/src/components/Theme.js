import React from 'react';
import { useTheme } from '../hooks';

export const Theme = () => {
  const [theme, setTheme] = useTheme();

  return (
    <div>
      <select defaultValue={theme} onChange={e => setTheme(e.target.value)}>
        <option value='light'>light</option>
        <option value='dark'>dark</option>
      </select>
    </div>
  );
};

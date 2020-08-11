import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

export const useCookie = ({key}) => {
  const [cookie, setCookieState] = useState(Cookies.get(key) || '');

  useEffect(() => {
    Cookies.set(key, cookie);
  }, [cookie, key]);
  return [cookie, setCookieState];
};

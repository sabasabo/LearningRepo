import { useState, useEffect } from 'react';

const cache = [];
export const useScript = src => {
  const [status, setStatus] = useState({
    isLoaded: false,
    isError: false
  });

  useEffect(() => {
    if (cache.includes(src)) {
      setStatus({
        isLoaded: true,
        isError: false
      });
    } else {
      cache.push(src);
      const script = document.createElement('script');
      script.src = src;
      script.async = true;

      const loadHandler = () =>
        setStatus({
          isLoaded: true,
          isError: false
        });

      const errorHandler = () => {
        const srcIndex = cache.indexOf(src);
        if (srcIndex !== -1) {
          cache.splice(srcIndex, 1);
        }
        script.remove();

        setStatus({
          isLoaded: true,
          isError: true
        });
      };

      script.addEventListener('load', loadHandler);
      script.addEventListener('error', errorHandler);

      document.body.appendChild(script);

      return () => {
        script.removeEventListener('load', loadHandler);
        script.removeEventListener('error', errorHandler);
      };
    }
  }, [src]);

  return [status.isLoaded, status.isError];
};

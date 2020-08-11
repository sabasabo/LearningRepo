import { useState, useRef, useEffect } from 'react';

export const useMesure = () => {
  const ref = useRef();
  const [bounds, setBounds] = useState({
    left: 0,
    right: 0,
    width: 0,
    height: 0
  });

  const [resizeObsvr] = useState(
    () => new ResizeObserver(([entry]) => setBounds(entry.contentRect))
  );

  useEffect(() => {
      const currentRef = ref.current;;
    if (currentRef) {
      resizeObsvr.observe(currentRef);
    }
    return () => resizeObsvr.disconnect(currentRef);
  }, [resizeObsvr]);

  return [bounds, { ref }];
};

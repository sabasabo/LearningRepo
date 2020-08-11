import { useState } from "react";

export const useIncremental = ({
  initial = 0,
  minValue = -100000,
  maxValue = 100000,
  step = 1
}) => {
  const [count, setCount] = useState(initial);
  const increase = () =>
    setCount(prevCount => Math.min(maxValue, prevCount + step));
  const decrease = () =>
    setCount(prevCount => Math.max(minValue, prevCount - step));
  const reset = () => setCount(initial);
  // Leaving the count to be named easily while allowing the api user to use only the functions he wants.
  return [count, { setCount, increase, decrease, reset }];
};

import React from "react";
import { useIncremental } from "../hooks";

export const Increment = () => {
  const [volume, { increase, decrease, reset }] = useIncremental({
    maxValue: 10,
    minValue: 0,
    initial: 5,
    step: 3
  });
  return (
    <div>
      <h3>Volume</h3>
      <button onClick={decrease}>-</button>
      <span>{volume}</span>
      <button onClick={increase}>+</button>
      <button onClick={reset}>Reset Volume</button>
    </div>
  );
};

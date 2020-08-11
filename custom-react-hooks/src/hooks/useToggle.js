import { useState } from "react";

export const useToggle = (initialValue = false) => {
  const [isToggled, setIsToggled] = useState(initialValue);
  const toggle = () => setIsToggled(prevValue => !prevValue);
    // Returning an array allows us to rename the variables as we want, but enforces an order.
  //   return [isToggled, setIsToggled, toggle];
  // Returning an object allows us to ignore the order of the variables and cherry picking the vars we want, but enforces using original names.
  return {isToggled, setIsToggled, toggle};
};

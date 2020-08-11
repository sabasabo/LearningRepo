import React from "react";
import { useMount, useUnmount, useToggle } from "../hooks";

export const Mount = () => {
  const { isToggled, toggle } = useToggle();
  return (
    <div>
      <button onClick={toggle}>Toggle mount</button>
      {isToggled && <Unmount />}
    </div>
  );
};

const Unmount = () => {
  useMount(() => {
    console.log(`I'm mounted`);
  });
  useUnmount(() => {
    console.log(`I'm unmounted`);
  });
  return <div>Unmount me</div>;
};

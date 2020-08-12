import React, { useRef, useContext } from "react";
import styled from 'styled-components'
import { useClickOutside } from './useClickOutside'
import { GlobalContext } from './GlobalState'


export const ReduceButtons = () => {
  const ref = useRef<HTMLDivElement>(null!)

  const { rValue, turnOn, turnOff } = useContext(GlobalContext);

  useClickOutside(ref, () => {
    console.log('Clicked outside')
  });
  return (
    <Wrapper ref={ref}>
      <button onClick={turnOn}>Action One</button>
      <button onClick={turnOff}>Action Two</button>
        {rValue && <h1>Visible</h1> }
    </Wrapper>
  );
};

const Wrapper = styled.div`
background: red;
`;
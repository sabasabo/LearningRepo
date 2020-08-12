import React, { createContext, useReducer } from "react";

type Action = {
  type: "one" | "two";
};
// type Action = {type: 'one'} | { type: 'two'}

type State = {
  rValue: boolean;
};

export const initialValues = {
  rValue: true,
  turnOn: () => {},
  turnOff: () => {}
};

export const GlobalContext = createContext(initialValues);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "one":
      return { rValue: true };
    case "two":
      return { rValue: false };
  }
};

export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  return (
    <GlobalContext.Provider
      value={{
        rValue: state.rValue,
        turnOn: () => dispatch({ type: "one" }),
        turnOff: () => dispatch({ type: "two" })
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

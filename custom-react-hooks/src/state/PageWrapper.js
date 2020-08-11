import React, { createContext, useContext } from 'react';
import { useToggle } from '../hooks';

export const AppContext = createContext({
  isMenuOpen: false
});

export const PageWrapper = ({ children }) => {
  const { isToggled, toggle } = useToggle(false);
  return (
    <div>
      <AppContext.Provider
        value={{
          isMenuOpen: isToggled,
          toggleMenu: toggle
        }}
      >
        {children}
      </AppContext.Provider>
    </div>
  );
};

export const useAppState = () => useContext(AppContext);
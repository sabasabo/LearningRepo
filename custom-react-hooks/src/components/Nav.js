import React from 'react';
import { useAppState } from '../state';
import { useScrollFreeze } from '../hooks';

const NavWrapper = () => {
  const { isMenuOpen } = useAppState();
  return isMenuOpen ? <Nav /> : null;
};

const Nav = () => {
  const { toggleMenu } = useAppState();
  useScrollFreeze();
  return (
    <div>
      <nav
        style={{
          background: 'var(--black)',
          color: 'white',
          position: 'fixed',
          left: 0,
          right: 0,
          width: '100vw',
          height: '100vh'
        }}
      >
        <h1>Hello</h1>
        <button onClick={toggleMenu}>Close</button>
      </nav>
    </div>
  );
};

export default NavWrapper;

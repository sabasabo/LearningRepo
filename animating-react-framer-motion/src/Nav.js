import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const variants = {
  open: {
    x: 0
  },
  closed: {
    x: "-100%",
    transition: {
      delay: 1
    }
  }
};

const liVariants = {
  open: {
    y: 0,
    opacity: 1
    // transition: {
    //     delay: 0.2
    // }
  },
  closed: {
    y: -20,
    opacity: 0
  }
};
const ulVariants = {
  open: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
      staggerDirection: 1
    }
  },
  closed: {
    transition: {
      staggerChildren: 0.3,
      staggerDirection: -1
    }
  }
};

const links = ["One", "Two", "Three", "Four"];

export const Nav = ({ isNavOpen, setIsNavOpen }) => {
  return (
    <NavMenu
      variants={variants}
      initial='closed'
      animate={isNavOpen ? "open" : "closed"}
      transition={{ damping: 300 }}
    >
      <button onClick={() => setIsNavOpen(false)}>Close</button>
      <motion.ul variants={ulVariants}>
        {links.map(link => (
          <motion.li key={link} variants={liVariants}>
            <a href='#'>{link}</a>
          </motion.li>
        ))}
      </motion.ul>
    </NavMenu>
  );
};

const NavMenu = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100 vh;
  background-color: var(--black);
  padding: 40px ul {
    padding: 0;
    list-style: none;
    margin: 0;
  }
  li {
    padding: 0;
    margin: 0;
    font-size: 2rem;

    list-style: none;
    a {
      color: white;
      text-decoration: none;
      border-bottom: 2px transparent solid;
      &:hover {
        transition: 0.3 ease border;
        border-bottom: 2px var(--blue) solid;
      }
    }
  }
`;

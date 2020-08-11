import React from "react";
import { Squares } from "./Squares";
import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 }
};

const hVariants = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.5 } },
  exit: { opacity: 0, y: 100, transition: {delay: 0.5} }
};
export const AboutPage = () => {
  return (
    <motion.div
      variants={variants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <motion.h2
        variants={hVariants}
        initial='initial'
        animate='animate'
        exit='exit'
      >
        About
      </motion.h2>
      <Squares />
    </motion.div>
  );
};

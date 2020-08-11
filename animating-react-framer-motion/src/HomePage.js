import React from "react";
import { Slideshow } from "./Slideshow";
import { motion } from "framer-motion";

export const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <h2>Homepage</h2>
      <Slideshow />
    </motion.div>
  );
};

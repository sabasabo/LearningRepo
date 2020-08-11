import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";

const COLORS = [
  `var(--red)`,
  `var(--purp)`,
  `var(--blue)`,
  `var(--black)`,
  `var(--green)`
];

const variants = {
  enter: direction => ({
    opacity: 0,
    x: 1000 * direction
  }),
  center: direction => ({
    opacity: 1,
    x: 0
  }),
  exit: direction => ({
    opacity: 0,
    x: -1000 * direction
  })
};

export const Slideshow = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const paginate = direction => {
    setPage([page + direction, direction]);
    // setPage([
    //   Math.max(0, Math.min(COLORS.length - 1, page + direction)),
    //   direction
    // ]);
  };

  const index = wrap(0, COLORS.length, page);

  return (
    <div style={{ position: "relative", height: 400 }}>
      <AnimatePresence custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            if (Math.abs(offset.x) > 300) {
              // arg is either -1 or 1.
              paginate(-offset.x / Math.abs(offset.x));
            }
          }}
          style={{
            background: COLORS[index],
            height: 400,
            width: "100%",
            position: "absolute",
            left: 0,
            top: 0
          }}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
        />
      </AnimatePresence>
      <div style={{ zIndex: 10, position: 'absolute' }}>
        <button onClick={() => paginate(-1)}>{"<"}</button>
        <button onClick={() => paginate(1)}>{">"}</button>
      </div>
    </div>
  );
};

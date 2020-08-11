import React, { useState } from "react";
import { motion } from "framer-motion";
import { shuffle } from "lodash";

const COLORS = [
  `var(--red)`,
  `var(--purp)`,
  `var(--blue)`,
  `var(--black)`,
  `var(--green)`
];

export const Squares = () => {
  const [colorsList, setColorsList] = useState(COLORS);
  return (
    <div>
      <button onClick={() => setColorsList(shuffle(colorsList))}>
        Shuffle
      </button>
      {colorsList.map(color => (
        <motion.div
          key={color}
          positionTransition={{
            damping: 100,
            stiffness: 10
          }}
          style={{
            background: color,
            width: 100,
            height: 100
          }}
        />
      ))}
    </div>
  );
};

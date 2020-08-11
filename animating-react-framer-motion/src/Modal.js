import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Modal = ({ isOpen, setIsOpen, children }) => {
  // const [isOpen, setIsOpen] = useState(false)
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: "30px",
            left: "50%",
            transform: "translate3d(-50%, 0, 0)"
          }}
        >
          <motion.div initial={{ y: 50 }} animate={{ y: 0 }}>
            {children}
            <button
              style={{ visibility: "visible", backgroundColor: "white" }}
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

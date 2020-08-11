import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loremIpsumPars = [
  `Ooohhh can do. 5 more minute of this and I'm going to get mad! It takes,
    like, 78 years to hang a dragon to death. I'm Scary Terry!! You can run
    but you can't hide, bitch!`,
  `Cause he roped me into this! My name is Slip- Slippery Stair. I'll take
    ya down there for 25 shmeckels! Principal Vagina here, don't let the
    name fool you; I'm very much in charge. Reminding you that tonight is
    our annual flu season dance. I don't know how many times I have to say
    this, but if you have the flu, stay home. The flu season dance is about
    awareness, not celebration. You don't bring dead babies to Passover. I
    going to daughter your brains out, bitch.`,
  `Cool. Just stay in the driveway; the kill-bots are live, and I took you
    off the whitelist. You're our boy dawg, don't even trip. Shadow Jacker,
    you haven't come out of your masturbation cave in eons! What the fuck is
    going on?!`,
  `Lookin' good! Sorry I didn't listen to you and tried to kill the whole
    world and stuff. Guess I gotta learn how to live in the moment a little
    more. It’s a new machine. It detects stuff all the way up your butt. I
    am not putting my father in a home! He just came back into my life, and
    you want to, grab him and, stuff him under a mattress like last month's
    Victoria's Secret?!`
];


const variants = {
  closed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 }
}


export const Accordion = () => {
  const [showParsArray, setShowParsArray] = useState([
    false,
    false,
    false,
    false
  ]);

  const toggle = index => {
    let newShowParsArray = [...showParsArray];
    newShowParsArray[index] = !newShowParsArray[index];
    setShowParsArray(newShowParsArray);
  };
  return (
    <>
      {loremIpsumPars.map((par, index) => (
        <article key={par}>
          <h2 role='button' onClick={() => toggle(index)}>
            Hi {index} {showParsArray[index] ? "-" : "+"}
          </h2>
          <AnimatePresence>
            {showParsArray[index] && (
              <motion.div
                style={{ overflow: "hidden" }}
                variants={variants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <p>{par}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </article>
      ))}
    </>
  );
};

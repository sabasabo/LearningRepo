import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Link, useLocation } from "react-router-dom";
import { Card, CardGrid, Container, Header } from "./Elements";
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionValue
} from "framer-motion";
import { Modal } from "./Modal";
import { Accordion } from "./Accordion";
import { Nav } from "./Nav";
import { HomePage } from "./HomePage";
import { AboutPage } from "./AboutPage";

import "./App.css";
import Menu from "./Menu";
import blue from "./blue.png";
import purp from "./purp.png";
import black from "./black.png";
import green from "./green.png";

const App = () => {
  const [value, setValue] = useState(0);
  const [isToggle, setToggle] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isShowCard, setIsShowCard] = useState(true);
  const location = useLocation();
  
  const x = useMotionValue(0);

  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]); // value, [input], [output]

  return (
    <motion.div
      initial={{
        opacity: 0
        // x: 100,
        // y: 100
      }}
      // animate={{
      //   opacity: [1, 0, 1]
      //   // x: 0,
      //   // y: 0
      // }}
      animate={{
        opacity: 1
        // x: 0,
        // y: 0
      }}
      // transition={{
      //   duration: 5,
      //   times: [0, 0.2, 1]
      // }}
      transition={{
        duration: 1
      }}
    >
      <Header>
        <Menu onClick={() => setIsNavOpen(true)} />
        <h1>Header</h1>
        <Link to='/about'>About</Link>
        <Link to='/'>Home</Link>
        <Nav
          isNavOpen={isNavOpen}
          setIsNavOpen={value => setIsNavOpen(value)}
        />
      </Header>
      <Container>
        <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/about' component={AboutPage} />
        </Switch>
        </AnimatePresence>
        {
          /* <AnimatePresence>
          {isToggle && (
            */
          <motion.h2 animate={{ x: value }}>Super Cool</motion.h2>
          /* )}
        </AnimatePresence>
        <button onClick={() => setToggle(!isToggle)}>Toggle</button>
         */
        }
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} style={{ zIndex: 1 }}>
          <Card style={{ background: "var(--purp)" }}>
            <h3>Some card</h3>
            <img src={purp} />
          </Card>
        </Modal>
        <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
        <input
          type='range'
          min='-100'
          max='100'
          value={value}
          onChange={event => setValue(Number(event.target.value))}
        />
        <Accordion />

        <CardGrid>
          <Card
            // whileHover={{ scale: 1.02 }}
            drag
            dragConstraints={{
              top: -100,
              left: -100,
              right: 100,
              bottom: 100
            }}
            style={{ background: "var(--purp)" }}
          >
            <h3>Some card</h3>
            <img src={purp} />
          </Card>
          <AnimatePresence>
            {isShowCard && (
              <motion.div
                exit={{ height: 0, overflow: "hidden", opacity: 0 }}
                transition={{ opacity: { duration: 0 } }}
              >
                <Card
                  onDragEnd={(event, info) => {
                    if (Math.abs(info.offset.x) > 590) {
                      setIsShowCard(false);
                    }
                  }}
                  drag='x'
                  dragConstraints={{
                    left: 0,
                    right: 0
                  }}
                  style={{ x, opacity, background: "var(--blue)" }}
                >
                  <h3>Some card</h3>
                  <img src={blue} />
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <Card style={{ background: "var(--black)" }}>
            <h3>Some card</h3>
            <img src={black} />
          </Card>
          <Card style={{ background: "var(--green)" }}>
            <h3>Some card</h3>
            <img src={green} />
          </Card>
        </CardGrid>
      </Container>
    </motion.div>
  );
};
const AppWrapper = () => {
  return (
    <BrowserRouter>
      {/* <Switch> */}
      {/* ca */}
      {/* </Switch> */}
      <App />
    </BrowserRouter>
  );
};
export default AppWrapper;

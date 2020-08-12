import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Head } from "./Components/Head";
import { Button } from "./Components/Button";
import { Input } from "./Components/Input";
import { GlobalProvider} from "./Components/GlobalState";
import { ReduceButtons } from "./Components/ReduceButtons";
import BigC  from "./Components/BigC";

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <div className='App'>
        <Head title={"Hello"} />
        <BigC title="I'm in a class component"/>
        <Button onClick={() => {}}>Click Me</Button>
        <Input />
        <ReduceButtons />
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div>
    </GlobalProvider>
  );
};

export default App;

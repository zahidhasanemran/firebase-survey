import React from 'react';
import logo from './logo.svg';
import './App.css';
import Uservey from './component/Uservey';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome </h2>
        <div>


        </div>
      </header>
          <Uservey></Uservey>
    </div>
  );
}

export default App;

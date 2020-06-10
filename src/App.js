import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="App">
      <div>
        <h2>React Calculator</h2>
        <div id="wrapper">
           <div id="calculator">
               <Calculator/>
           </div>
        </div>

      </div>
    </div>
  );
}

export default App;

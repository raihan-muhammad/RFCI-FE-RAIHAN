import React, { useState } from 'react';

import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [statusBtn, setStatusBtn] = useState(false);
  const reverse = () => {
    setStatusBtn(true);
    setInput(input.split('').reverse().join(''));
  };

  console.log(history);
  const undo = () => {};

  const redo = () => {};

  return (
    <div
      className="App"
      style={{ backgroundColor: 'black', height: '100vh', paddingTop: '30vh' }}
    >
      <input
        type="text"
        placeholder="Masukan Kata"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setHistory([
            e.target.value,
            statusBtn === true ? e.target.value : null,
          ]);
        }}
      />
      <br />
      <br />
      <label style={{ color: 'white', fontSize: '48px' }}>
        Output: {input}
      </label>
      <br />
      <br />
      <button onClick={reverse}>Reverse</button>
      <button onClick={undo} onDoubleClick={redo}>
        Undo/Redo
      </button>
    </div>
  );
}

export default App;

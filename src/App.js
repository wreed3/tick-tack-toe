import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test - Can you see this?</h1>
        <p>If you can see this text, React is working!</p>
        <button onClick={() => setCount(count + 1)}>
          Clicked {count} times
        </button>
      </header>
    </div>
  );
}

export default App;
import './App.css';
import React, { useState, useEffect } from 'react'


function App() {

  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/hello', {
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error:', error));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div classname="App">
          <h1>Message is: {message}</h1>
        </div>
      </header>
    </div>
  );
}

export default App;

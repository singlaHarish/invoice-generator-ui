import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'


function App() {

  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

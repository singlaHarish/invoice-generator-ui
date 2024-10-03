import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Layout from './components/Layout';


function App() {

  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Layout><Home/></Layout>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

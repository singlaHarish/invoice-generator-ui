import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Contactus from './components/Contactus';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import GenerateInvoice from './components/GenerateInvoice';

function App() {

  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/generate" element={<GenerateInvoice />} />
          <Route path='/contactus' element={<Contactus />} />
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

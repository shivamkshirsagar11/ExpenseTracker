import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './components/Login';
import Home from './components/Home';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;

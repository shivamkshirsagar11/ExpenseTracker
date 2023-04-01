import React,{useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
function App() {
  const [user, setUser] = useState({name:"", email:"", id:-1})
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home setUser={setUser} user={user}/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/profile" element={<Profile user={user}/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;

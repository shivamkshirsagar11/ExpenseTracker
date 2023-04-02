import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import LOGO from "./logo (2).png";
export default function Login() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      toast.info("Welcom back");
      navigate("/home");
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      email: `${email}`,
      password: `${pass}`,
    });

    let response = await fetch("https://localhost:7186/api/Auth/Login ", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.text();
    if (response.status === 200) {
      localStorage.setItem("token", data);
      toast.success("Login successfull");
      navigate("/home");
    } else toast.error("Invalid credentials");
  };
  return (
    <>
      <form>
        <div className="wrapper">
          <div className="logo">
            <img src={LOGO} alt="" />
          </div>
          <div className="text-center mt-4 name">Expense Tracker</div>
          <form className="p-3 mt-3">
            <div className="form-field d-flex align-items-center">
              <span className="far fa-user"></span>
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="User Email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="form-field d-flex align-items-center">
              <span className="fas fa-key"></span>
              <input
                type="password"
                name="password"
                id="pwd"
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <button className="btn mt-3" onClick={handleSubmit}>
              Login
            </button>
          </form>
          <div className="text-center fs-6">
            <Link to="/register">Sign up</Link>
          </div>
        </div>
      </form>
    </>
  );
}

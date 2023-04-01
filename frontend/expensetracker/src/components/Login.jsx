import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      toast.info("Welcom back")
      navigate("/home");
    }
  }, []);
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
    <div>
      <form>
        Email:{" "}
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter email here..."
        /><br/>
        Password:{" "}
        <input
          type="password"
          onChange={(e) => setPass(e.target.value)}
          placeholder="your password"
        /><br/>
        <button onClick={handleSubmit}>Submit</button><br/>
        <Link to="/register">Don't have an account?</Link>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const navigate = useNavigate();
  const registerHandle = async (e) => {
    e.preventDefault();
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      name: name,
      email: email,
      password: pass,
    });

    let response = await fetch("https://localhost:7186/api/Auth/Register", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.text();
    console.log(data)
    if (response.status === 200){
      localStorage.setItem("token", data);
      toast.update("Registred Successfully")
      navigate("/");
    }
    else
      toast.error("Error in details");
  };
  return (
    <>
      <form>
        Name: <input type="text" onChange={(e)=>setName(e.target.value)} /><br/>
        Email: <input type="email" onChange={(e)=>setEmail(e.target.value)} /><br/>
        Password: <input type="password" onChange={(e)=>setPass(e.target.value)} /><br/>
        <button onClick={registerHandle}>Submit</button>
      </form>
    </>
  );
}

import React,{useState} from 'react'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
export default function Login() {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const navigate = useNavigate()
    const shandleSubmit = async (e)=>{
        e.preventDefault();
        console.log(email, pass);
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
           }
           
           let bodyContent = JSON.stringify({
             "email": `${email}`,
             "password": `${pass}`
           });
           
           let response = await fetch("https://localhost:7186/api/Auth/Login ", { 
             method: "POST",
             body: bodyContent,
             headers: headersList
           });
           
           let data = await response.text();
           if (response.status === 200){
            localStorage.setItem("token", data);
            toast.success("Login successfull");
            navigate("/home");
           }
           else toast.error("Invalid credentials");           
    }
  return (
    <div>
      <form>
        Email: <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='enter email here...'/>
        Password: <input type="password" onChange={(e)=>setPass(e.target.value)} placeholder='your password'/>
        <button onClick={shandleSubmit}>Submit</button>
      </form>
    </div>
  )
}

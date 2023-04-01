import React, { useEffect} from "react";
import ExpenseAdd from "./ExpenseAdd";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Home({setUser, user}) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      toast.error("Not Authorized");
      navigate("/");
    }
    async function getUserDetails(){
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
       }
       
       let response = await fetch("https://localhost:7186/self", { 
         method: "POST",
         headers: headersList
       });
       
       let data = await response.text();
       data = JSON.parse(data);
       if(response.status !== 200){
            toast.error("something went wrong");
            localStorage.removeItem("token")
            navigate("/")
       }
         setUser({
          ...data
         });
        }
        getUserDetails();
  }, []);
  return (
    <>
      <Navbar />
      <ExpenseAdd user={user}/>
    </>
  );
}

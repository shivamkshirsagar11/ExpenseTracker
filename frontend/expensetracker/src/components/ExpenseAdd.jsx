import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function ExpenseAdd({user}) {
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [date, setDate] = useState();
    const [category, setCategory] = useState();
    const navigate = useNavigate();
    async function handleAdd(e){
        e.preventDefault();
        const token = localStorage.getItem('token')
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
           }
           
           let bodyContent = JSON.stringify({
             name,amount, date, category,userId:user.userId
           });
           
           let response = await fetch("https://localhost:7186/api/Expenses", { 
             method: "POST",
             body: bodyContent,
             headers: headersList
           });
           
           let data = await response.text();
           console.log(data);
           if (response.status === 201){
            toast.success("Expense Added");
           }           
           else {
            toast.error("Error occured")
            localStorage.removeItem('token')
            navigate("/")
           }
    }

  return (
    <div className="eadd">
    <section className="content">
        <h3 className="secondTitle">Add a new item: </h3>
        <div className="form">
            <form id="expForm">
                <div className="formLine left">
                    <span htmlFor="type">Type:</span>
                    <select id="type" onChange={(e)=>setCategory(e.target.value)}>
                        <option value="chooseOne">Choose one...</option>
                        <option value="Card">Card</option>
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                    </select>
                </div>
                <div className="formLine right">
                    <span htmlFor="name">Name:</span>
                    <input type="text" id="name" onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div className="formLine left">
                    <span htmlFor="date">Date:</span>
                    <input type="date" id="date" onChange={(e)=>setDate(e.target.value)}/>
                </div>
                <div className="formLine right">
                    <span htmlFor="amount">Amount:</span>
                    <input type="text" id="amount" onChange={(e)=>setAmount(e.target.value)}/>
                </div>
                <button type="submit" className="buttonSave" onClick={handleAdd}>Add a new expense</button>
            </form>
        </div>
    </section>
    </div>
  )
}

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
export default function ExpenseList({ userId }) {
  const [expenses, setExpenses] = useState([]);
  const [editExpenses, setEditExpenses] = useState({});
  const [hide, setHide] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    async function loadExpense() {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `https://localhost:7186/api/Expenses/${userId}`,
        {
          method: "GET",
          headers: headersList,
        }
      );

      let data = await response.json();
      setExpenses(data);
      if (response.status !== 200) {
        navigate("/home");
        toast.error("Something went wrong");
      }
    }
    loadExpense();
  },[hide, deleteFlag]);
  const handleChange = (e) => {
    setEditExpenses({ ...editExpenses, [e.target.name]: e.target.value });
  };
  const handleEdit = async (e)=>{
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify({
       ...editExpenses
     });
     
     let response = await fetch(`https://localhost:7186/api/Expenses/${editExpenses.id}`, { 
       method: "PUT",
       body: bodyContent,
       headers: headersList
     });
     if (response.status !== 204){
      toast.error("something went wrong")
      navigate("/home")
     }
     toast.info("Expense updated")
     setHide(!hide)
  }
  const handleDelete = async(id)=>{
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     }
     
     let response = await fetch(`https://localhost:7186/api/Expenses/${id}`, { 
       method: "DELETE",
       headers: headersList
     });
     if (response.status !== 204){
      toast.error("something went wrong")
      navigate("/home")
     }
     toast.info("Expense Deleted")
     setDeleteFlag(!deleteFlag)
  }
  return (
    <div>
      <Navbar />
      {expenses.length === 0 && (
        <span style={{ color: "red" }}>No expense added</span>
      )}
      {!hide && expenses.length > 0 && (
        <table>
          <tr>
            <th>Id</th>
            <th>Item Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {expenses.map((ele) => {
            return (
              <tr key={ele.id}>
                <td>{ele.id}</td>
                <td>{ele.name}</td>
                <td>{ele.date}</td>
                <td>{ele.amount}</td>
                <td>{ele.category}</td>
                <td>
                  <button
                    onClick={(e) => {
                      setEditExpenses(ele);
                      setHide(!hide);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td><button
                    onClick={(e)=>handleDelete(ele.id)}
                  >
                    Delete
                  </button></td>
              </tr>
            );
          })}
        </table>
      )}
      {hide && (
        <>
          <table>
            <tr>
              <th>Id</th>
              <th>Item Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
            <tr>
              <td>
              {editExpenses.id}
              </td>
              <td>
                <input type="text" name="name" onChange={handleChange} value={editExpenses.name}/>
              </td>
              <td>
                <input type="date" name="date" onChange={handleChange} value={editExpenses.date}/>
              </td>
              <td>
                <input type="text" name="amount" onChange={handleChange} value={editExpenses.amount}/>
              </td>
              <td>
                <select id="type" name="category" onChange={handleChange}>
                        <option value="chooseOne">{editExpenses.category}</option>
                        <option value="Card">Card</option>
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                    </select>
              </td>
            </tr>
          </table>
          <button
            onClick={handleEdit}
          >
            done
          </button>
        </>
      )}
    </div>
  );
}

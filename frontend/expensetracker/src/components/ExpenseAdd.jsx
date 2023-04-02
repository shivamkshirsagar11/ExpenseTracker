import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function ExpenseAdd({ user }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const navigate = useNavigate();
  async function handleAdd(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      name,
      amount,
      date,
      category,
      userId: user.userId,
    });

    let response = await fetch("https://localhost:7186/api/Expenses", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.text();
    console.log(data);
    if (response.status === 201) {
      toast.success("Expense Added");
    } else {
      toast.error("Error occured");
      localStorage.removeItem("token");
      navigate("/");
    }
    navigate("/get/expenses");
  }

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="card" style={{ width: "20rem" }}>
        <div className="card-body">
          <h5 className="card-title">Insert new Expense</h5>
          <p className="card-text">This Expense will be added in history.</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Name:{" "}
            <input
              className="form-control"
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li className="list-group-item">
            Amount:{" "}
            <input
              className="form-control"
              type="text"
              id="amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </li>
          <li className="list-group-item">
            Date:{" "}
            <input
              type="date"
              id="date"
              className="form-control"
              onChange={(e) => setDate(e.target.value)}
            />
          </li>
          <li className="form-control">
            <select
              className="form-control"
              id="type"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="chooseOne">Payment Mode</option>
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
            </select>
          </li>
        </ul>
        <div className="card-body">
          <button type="submit" className="btn btn-warning" onClick={handleAdd}>
            Add
          </button>
          <br />
          <Link to="/get/expenses" className="card-link">
            Go to history
          </Link>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Profile(props) {
  const navigate = useNavigate();
  const { name, email, userId } = props.user;
  const [uname, setName] = useState(name);
  const [uemail, setEmail] = useState(email);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      toast.error("Not Authorized");
      navigate("/");
    } else if (userId === -1 || userId === undefined) {
      navigate("/");
    }
  });
  const handleUpdate = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    props.user.name = uname;
    props.user.email = uemail;
    console.log("Updated: ", props.user);
    let bodyContent = JSON.stringify(props.user);

    let response = await fetch(
      `https://localhost:7186/api/Users/${props.user.userId}`,
      {
        method: "PUT",
        body: bodyContent,
        headers: headersList,
      }
    );
    if (response.status !== 204) {
      toast.error("Something Went Wrong");
      navigate("/home");
    }
    toast.info("Profile Updated");
    navigate("/home");
  };
  return (
    <div className="container">
      <Navbar />
      <div className="position-absolute top-50 start-50 translate-middle">
        {!hide && (
          <button className="btn btn-warning" onClick={() => setHide(!hide)}>
            Update
          </button>
        )}
        <br />
        {!hide && (
          <>
            Name: <input className="form-control" type="text" value={name} />
            Email: <input className="form-control" type="email" value={email} />
          </>
        )}
        {hide && (
          <form>
            <h2>Update Detail</h2>
            Name:{" "}
            <input
              className="form-control"
              type="text"
              value={uname}
              onChange={(e) => setName(e.target.value)}
            />
            Email:{" "}
            <input
              className="form-control"
              type="email"
              value={uemail}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-danger"
              onClick={handleUpdate}
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

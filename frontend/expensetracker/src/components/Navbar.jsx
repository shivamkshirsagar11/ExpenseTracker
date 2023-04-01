import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify';
export default function Navbar() {
    const navigate = useNavigate();
    const logoutHandle = (e)=>{
        localStorage.removeItem("token");
        toast.info("Logout successfully")
        navigate("/")
    }
  return (
    <>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home">Expense tracker</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">view all</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/profile">My profile</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">delete all</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" style={{color:"red"}} onClick={logoutHandle}>Logout</a>
        </li>
    
      </ul>
    </div>
  </div>
</nav>  
    </>
  )
}

import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [Rpass, setRPass] = useState();
  const navigate = useNavigate();
  const registerHandle = async (e) => {
    e.preventDefault();
    if (pass !== Rpass){
      toast.error("Passwords Didn't matched!")
      return 0;
    }
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
      {/* <form>
        Name: <input type="text" onChange={(e)=>setName(e.target.value)} /><br/>
        Email: <input type="email" onChange={(e)=>setEmail(e.target.value)} /><br/>
        Password: <input type="password" onChange={(e)=>setPass(e.target.value)} /><br/>
        <button onClick={registerHandle}>Submit</button>
      </form> */}
      <section className="vh-100" style={{"background-color": "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{"border-radius": "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" className="form-control" onChange={(e)=>setName(e.target.value)}/>
                      <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" className="form-control" onChange={(e)=>setEmail(e.target.value)} autoComplete="new-password"/>
                      <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control" onChange={(e)=>setPass(e.target.value)} autoComplete="new-password"/>
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4cd" onChange={(e)=>setRPass(e.target.value)}>Repeat your password</label>
                    </div>
                  </div>
                  <div class="form-check d-flex justify-content-center mb-5">
                    <label class="form-check-label" for="form2Example3">
                      <Link to="/">Already A member?</Link>
                    </label>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-lg" onClick={registerHandle}>Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}

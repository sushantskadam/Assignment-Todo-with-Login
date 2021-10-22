import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Login() {
  let history = useHistory();

  const [state, setState] = useState({
    userData: [],
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const URL = "http://localhost:3001/users/";
    axios.get(URL).then((res) => {
      setState({ userData: res.data });
    });
  }, []);

  const handler = (event) => {
    const { name, value } = event.target;
    // let errors=state.errors;
    switch (name) {
      case "email":
        let eemail = regForEmail.test(value) ? "" : "Email is not valid";
        setErrors({ ...errors, email: eemail });
        break;
      case "password":
        let epassword =
          value.length < 8 ? "Password must be 8 characters long" : "";
        setErrors({ ...errors, password: epassword });
        // console.log(value)
        break;

      default:
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // setState({[name]:value},...state);

    // setErrors(errors)
  };
  const email = useRef(null);
  const pass = useRef(null);

  const formSubmit = (event) => {
    event.preventDefault();

    if (
      validate(errors) &&
      document.getElementById("email").value !== "" &&
      document.getElementById("password").value !== ""
    ) {
      var ver = false;

      state.userData.forEach((data) => {
        if (
          data.email === email.current.value &&
          data.password === pass.current.value
        ) {
          ver = true;
        }
      });
      // for (let i=0; i < state.userData.length; i++) {
      //  if ((state.userData[i].email == state.email)&&(state.userData[i].password == state.password)){
      //      ver =true

      //      // this.setState({verified: true},
      //      //     ()=> {

      //      //         let login= this.state.email
      //      //         localStorage.setItem('login',JSON.stringify(login));
      //      //         this.props.history.push("/dashboard")
      //      //         console.log("Redirect")

      //          // else{alert("Email or Password is wrong")}
      //      // }
      //      // )
      //      break;
      //  }
      //  else{

      //      // this.setState({verified: false})
      //      ver= false
      //  }
      //  }

      // if(this.state.verified==false){
      // alert("Email or Password is wrong")}
      // let ver = this.state.verified

      if (ver) {
        let login = email.current.value;
        localStorage.setItem("login", JSON.stringify(login));

        history.push("/dashboard");
      } else {
        alert("Email or Password is wrong");
      }
    } else {
      alert("Please Enter Valid Data");
    }
  };
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  return (
    <div className="back text-left">
      <div className="div-center">
        <div className="content">
          <h3>Login</h3>
          <hr />
          <form onSubmit={formSubmit} id="myForm">
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handler}
                ref={email}
              />
              <small
                style={{
                  position: "absolute",
                  left: "46%",
                  transform: "translate(-160%, -5%)",
                  color: "red",
                }}
                id="component-error-text"
              >
                {errors.email.length > 0 && errors.email}
              </small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handler}
                ref={pass}
              />
              <small
                style={{
                  position: "absolute",
                  left: "46%",
                  transform: "translate(-75%, -5%)",
                  color: "red",
                }}
                id="component-error-text"
              >
                {errors.password.length > 0 && errors.password}
              </small>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <hr />
            <button type="button" className="btn btn-link">
              Signup
            </button>
            <button type="button" className="btn btn-link">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

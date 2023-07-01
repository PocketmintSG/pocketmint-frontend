import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "src/redux/authSlice";
import { RootState } from "src/redux/store";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated, error } = useSelector((state: RootState) => state.authReducer)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    console.log(email)
    console.log(password)
    dispatch(loginUser({ email, password }))
  }

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Redirecting")
      navigate("/")
    } else if (error) {
      alert(error)
    }
  }, [isAuthenticated, error, history]);

  return <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input name="email"></input>
      </div>
      <div>
        <label>Password:</label>
        <input name="password"></input>
      </div>
      <button>Login</button>
    </form>
  </div>
}

export default Login
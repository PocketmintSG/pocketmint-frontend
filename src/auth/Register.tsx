import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "src/hooks/useAuthentication"

const Register = () => {
  const navigate = useNavigate()

  const { isLoading, signUpCall } = useAuthentication()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    console.log(email, password)
    await signUpCall({ email, password })
  }

  return <div>
    Registration
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input name="email"></input>
      </div>
      <div>
        <label>Password:</label>
        <input name="password"></input>
      </div>
      <button>Register</button>
    </form>
  </div>
}

export default Register
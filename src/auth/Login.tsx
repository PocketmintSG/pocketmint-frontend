import React from "react";
import { useAuth } from "../api/auth";

const Login = () => {
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data)
    login(data.get("username"))
  }
  return <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input name="username"></input>
      </div>
      <button>Login</button>
    </form>
  </div>
}

export default Login
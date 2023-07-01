import React from "react";
import { useAuthentication } from "src/hooks/useAuthentication"

export const Login = () => {
  const { isLoading, signInCall } = useAuthentication()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    console.log(email, password)
    await signInCall({ email, password })
  }

  return <div>
    Log In
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

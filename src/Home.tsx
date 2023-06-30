import React from "react";
import { useAuth } from "./api/auth";

const Home = () => {
  const { logout } = useAuth()
  return <div>
    This is the homepage

    <button onClick={logout} >Logout</button>
  </div>
}

export default Home
import React from "react";
import { useSelector } from "react-redux";
import { useAuthentication } from "src/hooks/useAuthentication"
import { RootState } from "src/redux/store";

const Home = () => {
  const { signOutCall } = useAuthentication();
  const user = useSelector((state: RootState) => state.authSliceReducer.user)

  const signOut = async () => {
    await signOutCall()
  }
  return <div>
    <div>Welcome, {user?.email}</div>
    <button onClick={signOut} >Logout</button>
  </div>
}

export default Home
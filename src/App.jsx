import { Route, createBrowserRouter, createRoutesFromElements, defer } from "react-router-dom"
import Home from "./Home"
import Login from "./auth/Login"
import { ProtectedLayout } from "./ProtectedLayout"
import { UnprotectedLayout } from "./UnprotectedLayout"
import { AuthLayout } from "./AuthLayout"

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      console.log(user)
      resolve(user);
    }, 3000)
  );

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={ <AuthLayout /> } loader={ () => defer({ userPromise: getUserData() }) }>
      <Route element={ <ProtectedLayout /> }>
        <Route path="/" element={ <Home /> } />
      </Route>
      <Route element={ <UnprotectedLayout /> }>
        <Route path="/login" element={ <Login /> } />
      </Route>
    </Route>
  )
)


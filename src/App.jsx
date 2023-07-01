import { Route, createBrowserRouter, createRoutesFromElements, defer } from "react-router-dom"
import Home from "./Home"
import Login from "./auth/Login"
import Register from "./auth/Register"
import { ProtectedLayout } from "./ProtectedLayout"
import { UnprotectedLayout } from "./UnprotectedLayout"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={ <ProtectedLayout /> }>
        <Route path="/" element={ <Home /> } />
      </Route>
      <Route element={ <UnprotectedLayout /> }>
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Route>
    </Route>
  )
)


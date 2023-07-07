import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { AuthGuard } from "./components/auth/AuthGuard"
import { GuestGuard } from "./components/auth/GuestGuard"
import { Dashboard } from "./pages/dashboard/index"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { ForgetPassword } from "./pages/auth/ForgetPassword"
import { ResetPassword } from "./pages/auth/ResetPassword"
import { Playground } from "./pages/Playground"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={ <AuthGuard /> }>
        <Route path="/" element={ <Navigate to="/dashboard" /> } />
        <Route path="/dashboard" element={ <Dashboard /> } />
      </Route>
      <Route element={ <GuestGuard /> }>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/forget-password" element={ <ForgetPassword /> } />
        <Route path="/reset-password" element={ <ResetPassword /> } />
      </Route>
      <Route path="/playground" element={ <Playground /> } />
    </Route>
  )
)


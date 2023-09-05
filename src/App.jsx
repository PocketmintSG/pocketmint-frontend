import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthGuard } from "./components/auth/AuthGuard";
import { GuestGuard } from "./components/auth/GuestGuard";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ForgetPassword } from "./pages/auth/ForgetPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";

import { Dashboard } from "./pages/dashboard/index";
import { Expenses } from "./pages/expenses/index";
import { Insurance } from "./pages/insurance/index";
import { Settings } from "./pages/settings/index";

import { Playground } from "./pages/Playground";
import { APIPlayground } from "./pages/APIPlayground";

const env = import.meta.env.VITE_ENV;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<AuthGuard />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route element={<GuestGuard />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      {env === "dev" && (
        <>
          <Route path="/playground" element={<Playground />} />
          <Route path="/api-playground" element={<APIPlayground />} />
        </>
      )}
    </Route>
  )
);

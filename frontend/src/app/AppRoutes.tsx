import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/dashboard/pages/Dashboard";
import ProblemList from "../features/problems/pages/ProblemList";
import ProblemDetails from "../features/problems/pages/ProblemDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/problems"element={<ProblemList />}/>
      <Route path="/problems/:slug" element={<ProblemDetails />}/>
    </Routes>
  );
}

export default AppRoutes;
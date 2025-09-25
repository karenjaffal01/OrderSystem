import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/slices/authSlice";
import { useSelector } from "react-redux";
import NotFound from "./system/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./pages/Profiles/UserProfile";
import Dashboard from "./pages/Profiles/Dashboard";
import ItemsDashboard from "./pages/ItemsDashboard";

function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      dispatch(loginSuccess({ token, refreshToken, role }));
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/profile" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/items" element={<ProtectedRoute allowedRoles={["Admin"]}><ItemsDashboard /></ProtectedRoute>} />
        <Route path="/unauthorized" element={<h1>🚫 Not Authorized</h1>} />
        <Route path="/notFound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notFound" />} />
      </Routes>
    </Router>
  );
}

export default App;

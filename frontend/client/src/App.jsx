import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import NoteDetail from "./pages/NoteDetail";

const AppLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  if (isDashboard) {
    return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route
            path="/notes/:id"
            element={
              <ProtectedRoute>
                <NoteDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

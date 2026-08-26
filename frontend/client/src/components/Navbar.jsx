import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BookOpen, LogOut, LayoutDashboard, Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-900 font-bold text-lg shrink-0 hover:opacity-80 transition-opacity"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100">
              <BookOpen size={16} className="text-emerald-600" />
            </span>
            Student Notes
          </Link>

          {/* Desktop nav */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-gray-500">
                Hi, <span className="font-medium text-gray-700">{user?.name}</span>
              </span>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-1.5 h-10 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-1.5 h-10 px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center h-10 px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center h-10 px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-500 px-3 py-1">
                  Hi, <span className="font-medium text-gray-700">{user?.name}</span>
                </span>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 h-11 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 h-11 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer text-left"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center h-11 px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center h-11 px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get("/api/auth/logout");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 transition hover:text-blue-600"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-600" />
          PERN Auth
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer rounded-lg border border-red-200 bg-red-50 px-3.5 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100 hover:text-red-700 active:scale-[0.98]"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-sm font-medium text-white shadow-xs transition hover:bg-blue-700 active:scale-[0.98]"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", form);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password", err);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to your account to continue
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs transition hover:bg-blue-700 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-blue-600/20"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;

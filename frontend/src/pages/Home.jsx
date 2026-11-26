
import { Link } from "react-router-dom";

const Home = ({ user, error }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {user ? (
          <div>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-lg font-semibold text-blue-600 ring-1 ring-blue-100">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Welcome,{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text font-bold text-transparent">
                {user.name}
              </span>
              !
            </h1>

            <p className="mt-2 inline-block rounded-full border border-slate-200/80 bg-slate-50 px-3.5 py-1 text-sm text-slate-600">
              {user.email}
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Welcome to PERN Auth
            </h1>
            <p className="mt-1.5 mb-6 text-sm text-slate-500">
              Sign in to your account or create a new one to continue.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs transition hover:bg-blue-700 active:scale-[0.99]"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.99]"
              >
                Create an account
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

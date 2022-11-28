import { useState } from "react";
import { authLoginResellerFetcher } from "@tm-wear/app/api/fetcher/auth";
import { AuthParamsType, AuthResponseType } from "@tm-wear/app/api/types/auth";
import { FaLock } from "react-icons/fa";
import useAuthStore from "@tm-wear/app/store/zustand/auth/useAuth";
import styles from "./Login.module.scss";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const initLoginState = { username: "", password: "" };

function LoginScreen() {
  const navigate = useNavigate();
  const { user, createAuth } = useAuthStore();
  const [searchParams] = useSearchParams();
  const getLastPage = searchParams.get("lastPage");

  const [form, setForm] = useState<AuthParamsType>(initLoginState);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: AuthResponseType = await authLoginResellerFetcher(form);
      createAuth({
        user: response.data,
        token: response.accessToken,
        expiresAt: response.expiresAt,
      });
      navigate(getLastPage || "/", {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return user ? (
    <Navigate to={getLastPage || "/"} replace />
  ) : (
    <div className={styles.login}>
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://assets.themonograf.com/web-assets/logo2-medium.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onLogin} method="POST">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Username"
                value={form.username}
                onChange={(event) =>
                  setForm((prevState) => ({
                    ...prevState,
                    username: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                value={form.password}
                onChange={(event) =>
                  setForm((prevState) => ({
                    ...prevState,
                    password: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-indigo-500 group-hover:text-indigo-400" />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;

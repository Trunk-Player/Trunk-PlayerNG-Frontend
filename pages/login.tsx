import Head from "next/head";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import LogoImage from "components/sidebar/LogoImage";
import classNames from "utils/classNames";
import { useAppDispatch, useAppSelector } from "state/store/hooks";
import { useRouter } from "next/router";
import {
  loginUser,
  selectAuthenticationError,
  selectIsAuthenticated,
  selectIsAuthenticationLoading,
} from "state/slices/authenticationSlice";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthLoading = useAppSelector(selectIsAuthenticationLoading);
  const authError = useAppSelector(selectAuthenticationError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { ref: regEmailRef, ...regEmailRest } = register("email", {
    required: { value: true, message: "Email address is required" },
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: "Invalid email address",
    },
  });

  const { ref: regPasswordRef, ...regPasswordRest } = register("password", {
    required: { value: true, message: "Password is required" },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      await dispatch(loginUser({ email, password }));
    } catch (ex: any) {
      alert(`An error occurred while trying to login. Error: ${ex.message}`);
    }
  });

  useEffect(() => {
    const htmlTag = document.querySelector("html");
    htmlTag?.classList.remove("bg-gray-100");
    htmlTag?.classList.add("bg-gray-50");
    emailRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (!isAuthLoading) {
      if (!authError && isAuthenticated) {
        router.replace("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthLoading]);
  return (
    <>
      <Head>
        <title>Login - Trunk-Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <LogoImage className="mx-auto h-48 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login to Trunk-Player
            </h2>
          </div>
          <div className="mt-8">
            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...regEmailRest}
                    name="email"
                    type="email"
                    className={classNames(
                      "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm",
                      errors.email ? "border-red-600" : ""
                    )}
                    ref={(e) => {
                      regEmailRef(e);
                      emailRef.current = e;
                    }}
                    tabIndex={1}
                    value="test@test.com"
                  />
                  {errors.email && (
                    <p className="text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    {...regPasswordRest}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className={classNames(
                      "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm",
                      errors.password ? "border-red-600" : ""
                    )}
                    ref={(e) => {
                      regPasswordRef(e);
                      passwordRef.current = e;
                    }}
                    tabIndex={2}
                    value="abcabcabc123"
                  />
                  {errors.password && (
                    <p className="text-red-600">{errors.password.message}</p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  tabIndex={4}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

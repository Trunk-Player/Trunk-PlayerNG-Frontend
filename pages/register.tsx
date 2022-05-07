import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import LogoImage from "components/layouts/mainLayout/sidebar/LogoImage";
import classNames from "utils/classNames";
import Axios from "utils/axios";
import { LoginResponse } from "types/api/custom/LoginResponse";
import { useRouter } from "next/router";
import { useAppSelector } from "state/store/hooks";
import {
  selectAuthenticationError,
  selectIsAuthenticated,
  selectIsAuthenticationLoading,
} from "state/slices/authenticationSlice";
import LoadingDotsSpinner from "components/controls/LoadingDotsSpinner";

interface FormData {
  email: string;
  password: string;
  confirmpassword: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthLoading = useAppSelector(selectIsAuthenticationLoading);
  const authError = useAppSelector(selectAuthenticationError);
  const [submitLoading, setSubmitLoading] = useState(false);

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

  const onSubmit = handleSubmit(
    async ({ email, password, confirmpassword }) => {
      setSubmitLoading(true);

      try {
        const results = await Axios.post<LoginResponse>("/registration/", {
          email,
          password1: password,
          password2: confirmpassword,
        });

        console.log(results);
        //dispatch(handleTokenRefresh(results.data));
        //dispatch(setCurrentUser(results.data.user));
        router.replace("/");
      } catch (ex: any) {
        alert(
          `An error occurred while trying to register this account. Error: ${ex.message}`
        );
      }

      setSubmitLoading(false);
    }
  );

  const onLogin = () => {
    router.push("/login");
  };

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
        <title>Register - Trunk-Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <LogoImage className="mx-auto h-48 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register a New Account
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
                  />
                  {errors.password && (
                    <p className="text-red-600">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("confirmpassword", {
                      required: {
                        value: true,
                        message: "You must confirm the password",
                      },
                      validate: (value) =>
                        value === passwordRef?.current?.value ||
                        "The passwords do not match.",
                    })}
                    type="password"
                    autoComplete="current-password"
                    required
                    className={classNames(
                      "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm",
                      errors.password ? "border-red-600" : ""
                    )}
                    tabIndex={3}
                  />
                  {errors.confirmpassword && (
                    <p className="text-red-600">
                      {errors.confirmpassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-evenly">
                <button
                  className="w-full flex justify-center mx-1 py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  tabIndex={5}
                  onClick={onLogin}
                >
                  Back to Login
                </button>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  tabIndex={4}
                >
                  Register
                </button>
              </div>
              <div className="flex justify-center min-h-[100px]">
                {submitLoading && (
                  <div>
                    <LoadingDotsSpinner />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

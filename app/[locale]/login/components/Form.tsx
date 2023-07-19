"use client";

import { classNames } from "@/utils/classNames";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FormEvent, useRef, useState } from "react";
import LoadingDotsSpinner from "./LoadingDotsSpinner";
import { useRouter } from "next/navigation";

const Form = ({ callbackUrl }: { callbackUrl?: string }) => {
  const t = useTranslations("loginPage");
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({
    email: undefined,
    password: undefined,
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formErrors: typeof errors = {};

      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      if (!email) {
        formErrors.email = t("emailRequired");
      } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        formErrors.email = t("emailInvalid");
      }

      if (!password) {
        formErrors.password = t("passwordRequired");
      }

      if (formErrors.email || formErrors.password) {
        setErrors(formErrors);
        return;
      }

      setErrors({});

      setLoading(true);

      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: callbackUrl ?? "/",
      });

      setLoading(false);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const onRegister = () => {
    router.push("/register");
  };

  return (
    <form
      className="space-y-6"
      onSubmit={onSubmit}
      suppressHydrationWarning={true}
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {t("emailAddress")}
        </label>
        <div className="mt-1">
          <input
            name="email"
            type="email"
            className={classNames(
              "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm",
              errors.email ? "border-red-600" : ""
            )}
            ref={emailRef}
            tabIndex={1}
            defaultValue="test@test.com"
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          {t("password")}
        </label>
        <div className="mt-1">
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            className={classNames(
              "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm",
              errors.password ? "border-red-600" : ""
            )}
            ref={passwordRef}
            tabIndex={2}
            defaultValue="abcabcabc123"
          />
          {errors.password && <p className="text-red-600">{errors.password}</p>}
        </div>
      </div>
      <div className="flex justify-evenly">
        <button
          type="button"
          className="w-full flex justify-center mx-1 py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          tabIndex={5}
          onClick={onRegister}
        >
          {t("register")}
        </button>
        <button
          type="submit"
          className="w-full flex justify-center mx-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          tabIndex={4}
        >
          {t("login")}
        </button>
      </div>
      <div className="flex justify-center min-h-[100px]">
        {loading && (
          <div>
            <LoadingDotsSpinner />
          </div>
        )}
      </div>
    </form>
  );
};
export default Form;

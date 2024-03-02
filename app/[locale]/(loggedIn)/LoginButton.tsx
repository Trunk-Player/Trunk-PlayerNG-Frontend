"use client";

import { signIn } from "next-auth/react";

// const LoginButton = ({ session }: { session?: Session | null }) => {
const LoginButton = () => {
  const handleLogin = () => {
    signIn();
  };

  return (
    <button
      type="button"
      style={{ marginRight: 10 }}
      onClick={handleLogin}
    >
      Login
    </button>
  );
};

export default LoginButton;

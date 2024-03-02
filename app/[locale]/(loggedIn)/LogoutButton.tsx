"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      type="button"
      style={{ marginRight: 10 }}
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
};

export default LogoutButton;

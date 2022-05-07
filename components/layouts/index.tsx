import { ReactNode } from "react";
import * as authentication from "lib/auth/authentication";

import Sidebar from "components/layouts/mainLayout/sidebar";
import Topbar from "components/layouts/mainLayout/topbar";
import classNames from "utils/classNames";

export interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isLoggedIn = authentication.isLoggedIn();

  return (
    <>
      <div className="min-h-full">
        {isLoggedIn && (
          <Sidebar showMobileSidebar={true} showDesktopSidebar={true} />
        )}
        <div
          className={classNames(
            isLoggedIn
              ? "lg:pl-64"
              : "w-screen h-screen justify-center align-middle",
            "flex flex-col flex-1"
          )}
        >
          {isLoggedIn && <Topbar />}
          {children}
        </div>
      </div>
    </>
  );
};

export { MainLayout };

import { ReactNode } from "react";
import * as authentication from "lib/auth/authentication";
import EnvBadge from "components/EnvBadge";
import LogoImage from "./mainLayout/sidebar/LogoImage";
import LogoText from "./mainLayout/sidebar/LogoText";
import Navigation from "./mainLayout/sidebar/Navigation";
import LogoContainer from "./mainLayout/sidebar/LogoContainer";
import { useAppDispatch } from "state/store/hooks";
import { setMobileNavbarOpen } from "state/slices/layoutSlice";

import Topbar from "components/layouts/mainLayout/topbar";
import classNames from "utils/classNames";
import SidebarMobile from "./mainLayout/sidebar/SidebarMobile";
import SidebarDesktop from "./mainLayout/sidebar/SidebarDesktop";
import OpenSidebarButton from "./mainLayout/topbar/OpenSidebarButton";
import Search from "./mainLayout/topbar/Search";
import SearchBar from "./mainLayout/topbar/SearchBar";
import SearchBarItemContainer from "./mainLayout/topbar/SearchBarItemContainer";
import NotificationButton from "./mainLayout/topbar/items/NotificationButton";
import ProfileDropdown from "./mainLayout/topbar/items/ProfileDropdown";

export interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = authentication.isLoggedIn();

  const SidebarContents = () => (
    <>
      <LogoContainer>
        <LogoImage className="h-10 w-auto" />
        <LogoText color="white" />
        <EnvBadge />
      </LogoContainer>
      <Navigation />
    </>
  );

  const setSidebarOpen = (value: boolean) => {
    dispatch(setMobileNavbarOpen(value));
  };

  return (
    <>
      <div className="min-h-full">
        {isLoggedIn && (
          <>
            <SidebarMobile>
              <SidebarContents />
            </SidebarMobile>
            <SidebarDesktop>
              <SidebarContents />
            </SidebarDesktop>
          </>
        )}
        <div
          className={classNames(
            isLoggedIn
              ? "lg:pl-64"
              : "w-screen h-screen justify-center align-middle",
            "flex flex-col flex-1"
          )}
        >
          {isLoggedIn && (
            <Topbar>
              <OpenSidebarButton
                onClick={() => {
                  setSidebarOpen(true);
                }}
              />
              <SearchBar>
                <Search />
                <SearchBarItemContainer>
                  <NotificationButton />
                  <ProfileDropdown />
                </SearchBarItemContainer>
              </SearchBar>
            </Topbar>
          )}
          {children}
        </div>
      </div>
    </>
  );
};

export { MainLayout };

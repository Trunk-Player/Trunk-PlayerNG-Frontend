import SidebarMobile from "./layoutComponents/sidebar/SidebarMobile";
import SidebarDesktop from "./layoutComponents/sidebar/SidebarDesktop";
import SidebarContents from "./layoutComponents/sidebar/SidebarContents";
import Topbar from "./layoutComponents/topbar/Topbar";
import OpenSidebarButton from "./layoutComponents/topbar/OpenSidebarButton";
import SearchBar from "./layoutComponents/topbar/SearchBar";
import Search from "./layoutComponents/topbar/Search";
import SearchBarItemContainer from "./layoutComponents/topbar/SearchBarItemContainer";
import NotificationButton from "./layoutComponents/topbar/NotificationButton";
import ProfileDropdown from "./layoutComponents/topbar/ProfileDropdown";
import AppNotificationsContainer from "./layoutComponents/notifications/AppNotificationsContainer";
import { NextAuthProvider } from "./providers";

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <div className="min-h-full">
        <nav>
          <SidebarMobile>
            <SidebarContents />
          </SidebarMobile>
          <SidebarDesktop>
            <SidebarContents />
          </SidebarDesktop>
        </nav>
        <div className="lg:pl-64 flex flex-col flex-1">
          <header>
            <Topbar>
              <OpenSidebarButton />
              <SearchBar>
                <Search />
                <SearchBarItemContainer>
                  <NotificationButton />
                  <ProfileDropdown />
                </SearchBarItemContainer>
              </SearchBar>
            </Topbar>
          </header>
          <main>
            <AppNotificationsContainer />
            {children}
          </main>
        </div>
      </div>
    </NextAuthProvider>
  );
}

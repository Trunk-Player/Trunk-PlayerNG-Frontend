import OpenSidebarButton from "./OpenSidebarButton";
import { setMobileNavbarOpen } from "state/slices/layoutSlice";
import { useAppDispatch } from "state/store/hooks";

import Search from "./Search";
import SearchBar from "./SearchBar";
import SearchBarItemContainer from "./SearchBarItemContainer";
import NotificationButton from "./items/NotificationButton";
import ProfileDropdown from "./items/ProfileDropdown";

interface TopbarProps {
  hasMobileNavbar?: boolean;
}

const Topbar = ({ hasMobileNavbar = true }: TopbarProps) => {
  const dispatch = useAppDispatch();

  const setSidebarOpen = (value: boolean) => {
    dispatch(setMobileNavbarOpen(value));
  };

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
      {hasMobileNavbar && (
        <OpenSidebarButton
          onClick={() => {
            setSidebarOpen(true);
          }}
        />
      )}
      <SearchBar>
        <Search />
        <SearchBarItemContainer>
          <NotificationButton />
          <ProfileDropdown />
        </SearchBarItemContainer>
      </SearchBar>
    </div>
  );
};

export default Topbar;

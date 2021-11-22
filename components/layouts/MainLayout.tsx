import { ReactNode } from "react";
import Sidebar from "components/sidebar";
import Topbar from "components/topbar";

/* This layout requires updating your template:
  
           ```
           <html class="h-full bg-gray-100">
           <body class="h-full">
           ```
*/

export interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div className="min-h-full">
        <Sidebar showMobileSidebar={true} showDesktopSidebar={true} />
        <div className="lg:pl-64 flex flex-col flex-1">
          <Topbar />
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;

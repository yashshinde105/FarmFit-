import { ReactNode } from "react";
import Navbar from "./Navbar";
import Navbarmini from "./Navbar_mini";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbarmini />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
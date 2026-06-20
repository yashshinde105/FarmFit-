import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomeNavbar from "./HomeNavbar";

interface LayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <HomeNavbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
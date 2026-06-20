import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Navbarmini from "./Navbar_mini";

interface LayoutProps {
  children: ReactNode;
}

const Layoutnew = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbarmini />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layoutnew;
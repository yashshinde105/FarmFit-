"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from '@/assets/logo.png';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return localStorage.getItem("isLoggedIn") === "true";
});

  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Dashboard", path: "/dashboard" },
    { name:"Upload Image", path:"/Upload"}
  ];


 const isActive = (path: string) => {
  if (path === "/") {
    return location.pathname === "/";
  }
  return location.pathname.startsWith(path);
};

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const LoggedIn = () =>{
    navigate('/login');
  }
  // inside Navbar component

const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  setIsLoggedIn(false);
  navigate("/logged-out"); // optional: redirect to home after logout
};


  return (
    <nav className="fixed left-1/2 -translate-x-1/2 z-50 w-max sm:w-auto mb-6 sm:pt-6">
      <div className="flex items-center justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
  to="/"
  className="fixed top-4 flex left-[-42vh] items-center space-x-2 group z-50 backdrop-blur-md bg-white/100  rounded-lg shadow-lg"
>
  <div className="p-2 rounded-lg tr ansition-smooth">
    <img src={logo} alt="FarmFIT Logo" className="h-12 w-auto object-contain" />
  </div>
</Link>

        {/* Desktop Nav */}
<div className="hidden md:flex items-center gap-2 bg-white border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg w-full ml-4 mr-4 text-white">
  {navItems.map((item) => {
    const isTabActive = isActive(item.path);
    return (
      <Link
        key={item.name}
        to={item.path}
        onClick={() => setActiveTab(item.name)}
        className={cn(
          "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
          "text-black hover:text-primary whitespace-nowrap" ,
          isTabActive && "bg-muted text-primary"
        )}
      >
        <span>{item.name}</span>
      </Link>
    );
  })}

  {isLoggedIn ? (
    <Button onClick={handleLogout} variant="hero" size="sm" >
      Logout
    </Button>
  ) : (
    <Button onClick={LoggedIn} variant="hero" size="sm">
      Login/Signup
    </Button>
  )}
</div>


        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-lg mt-2 shadow-lg border border-border">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => {
                setIsOpen(false);
                setActiveTab(item.name);
              }}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-smooth",
                isActive(item.path)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2">
            {!isLoggedIn && (
            <div className="pt-2">
              <Button onClick={LoggedIn} variant="hero" size="sm" className="w-full">
                Login
              </Button>
            </div>
          )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;

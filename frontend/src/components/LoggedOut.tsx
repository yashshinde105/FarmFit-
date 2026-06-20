"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const LogoutConfirm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleLogout = () => {
    // Remove login flag
    localStorage.removeItem("isLoggedIn");

    // Show toast
    toast({
      title: "Logged Out",
      description: "You have successfully logged out.",
      variant: "destructive",
    });

    // Navigate home after a short delay to let toast show
    setTimeout(() => {
      navigate("/");
      window.location.reload(); // Refresh navbar
    }, 800);
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 text-center max-w-md w-full relative overflow-hidden"
      >
        {/* Decorative top-right circle */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-emerald-300 dark:bg-emerald-700 rounded-full opacity-30 blur-3xl"></div>

        {/* Icon */}
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-20 w-20 text-red-500 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight">
          Confirm Logout
        </h1>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-10 text-lg">
          Are you sure you want to log out? You will need to log in again to access your dashboard.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="px-8 py-3 text-lg rounded-full shadow-xl font-semibold transition-all duration-300"
            >
              Yes, Log Out
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="px-8 py-3 text-lg rounded-full shadow-xl font-semibold transition-all duration-300"
            >
              Cancel
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LogoutConfirm;

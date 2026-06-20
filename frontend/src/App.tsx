import { Toaster } from "@/components/ui/toaster";
import React, { Suspense, lazy } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import DashboardLayout from "@/components/DashboardLayout";
import AccountCreated from "./components/AccountCreated";
import Layout from "@/components/Layout";
import Layoutnew from "@/components/Layout_new";
import Upper from "./components/Upper";
import Index from "./pages/Index";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoggedOut from "./components/LoggedOut";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound";
import PageWrapper from "./components/PageWrapper";
import HomeLayout from "./components/HomeLayout";

// Lazy load heavy components
const CropHealth = lazy(() => import("./pages/CropHealth"));
const LiveAlerts = lazy(() => import("./pages/LiveAlerts"));
const Weather = lazy(() => import("./pages/Weather"));
const EnvironmentalConditions = lazy(() => import("./components/EnvironmentalConditions"));
const Indexcopy = lazy(() => import("./pages/Indexcopy"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse text-center">
      <div className="text-lg text-muted-foreground">Loading...</div>
    </div>
  </div>
);

// QueryClient configuration optimized for performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<HomeLayout><PageWrapper><Index /></PageWrapper></HomeLayout>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/account-created" element={<PageWrapper><AccountCreated /></PageWrapper>} />
        <Route path="/logged-out" element={<PageWrapper><LoggedOut /></PageWrapper>} />

        {/* Standard Layout Routes */}
        <Route path="/upload" element={<Layout><Upload /></Layout>} />
        <Route path="/about" element={<Layout><PageWrapper><About /></PageWrapper></Layout>} />
        <Route path="/contact" element={<Layout><PageWrapper><Contact /></PageWrapper></Layout>} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Layoutnew><DashboardLayout><Dashboard /></DashboardLayout></Layoutnew>} />
        
        {/* Lazy loaded heavy routes */}
        <Route 
          path="/crop-health" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Layoutnew><DashboardLayout><CropHealth /></DashboardLayout></Layoutnew>
            </Suspense>
          } 
        />
        <Route 
          path="/live-alerts" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Layoutnew><DashboardLayout><LiveAlerts /></DashboardLayout></Layoutnew>
            </Suspense>
          } 
        />
        <Route 
          path="/weather" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Layoutnew><DashboardLayout><Indexcopy /></DashboardLayout></Layoutnew>
            </Suspense>
          } 
        />
        <Route 
          path="/EnvironmentalConditions" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Layoutnew><DashboardLayout><EnvironmentalConditions /></DashboardLayout></Layoutnew>
            </Suspense>
          } 
        />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

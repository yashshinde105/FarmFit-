import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    open: false,
  },
  build: {
    // Optimize chunk size and splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": ["@radix-ui/react-accordion", "@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-navigation-menu", "@radix-ui/react-popover", "@radix-ui/react-select", "@radix-ui/react-tabs"],
          "vendor-forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          "vendor-animations": ["framer-motion", "embla-carousel-react"],
          "vendor-utils": ["axios", "date-fns", "clsx", "tailwind-merge", "class-variance-authority"],
        },
      },
    },
    // Minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: mode === "production",
      },
    },
    // Optimize CSS
    cssCodeSplit: true,
    reportCompressedSize: true,
    // Target modern browsers
    target: ["es2020"],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Performance hints
  ssr: {
    external: ["framer-motion"],
  },
}));

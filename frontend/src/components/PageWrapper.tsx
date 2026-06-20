import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function PageWrapper({
  children,
  macOpen = false,
}: {
  children: ReactNode;
  macOpen?: boolean;
}) {
  return (
    <motion.div
      initial={
        macOpen
          ? { scale: 0.95, opacity: 0, filter: "blur(8px)" }
          : { opacity: 0, y: 20 }
      }
      animate={
        macOpen
          ? {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              boxShadow: "0 10px 35px rgba(0,0,0,0.1)",
            }
          : { opacity: 1, y: 0 }
      }
      exit={
        macOpen
          ? { scale: 0.97, opacity: 0, filter: "blur(6px)" }
          : { opacity: 0, y: 10 }
      }
      transition={
        macOpen
          ? {
              duration: 0.45,   // smoother, not jerky
              ease: [0.16, 1, 0.3, 1], // Apple-like smooth ease
            }
          : {
              duration: 0.25,
              ease: "easeOut",
            }
      }
      style={{
        transformOrigin: "center center",
        perspective: 1200,
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

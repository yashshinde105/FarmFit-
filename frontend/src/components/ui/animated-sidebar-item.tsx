import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedSidebarItemProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

const AnimatedSidebarItem = ({
  to,
  icon: Icon,
  children,
  isActive = false,
  className,
  onClick,
  ...props
}: AnimatedSidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-smooth relative',
        isActive
          ? 'text-primary bg-primary/10'
          : 'text-muted-foreground hover:text-primary hover:bg-primary/5',
        className
      )}
      onClick={onClick}
      {...props}
    >
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="h-4 w-4" />
      </motion.div>
      <span>{children}</span>
      {isActive && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"
          layoutId="sidebar-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

export { AnimatedSidebarItem };
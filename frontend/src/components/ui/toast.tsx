import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  `
    group pointer-events-auto relative flex w-full items-center justify-between space-x-4 
    overflow-hidden rounded-xl border p-6 pr-8
    shadow-lg transition-all duration-300 ease-out
    backdrop-blur-md
    transform-gpu
    hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl
    before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:rounded-l-xl
    data-[swipe=cancel]:translate-x-0
    data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]
    data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
    data-[swipe=move]:transition-none
    data-[state=open]:animate-in data-[state=open]:scale-in-90
    data-[state=closed]:animate-out data-[state=closed]:scale-out-90
    data-[swipe=end]:animate-out
    data-[state=closed]:fade-out-80
    data-[state=closed]:slide-out-to-right-full
    data-[state=open]:slide-in-from-top-full
    data-[state=open]:sm:slide-in-from-bottom-full
  `,
  {
    variants: {
      variant: {
        default: `
          border-transparent
          bg-gradient-to-r from-white/80 via-white/60 to-white/80
          text-foreground
          dark:from-gray-800/90 dark:via-gray-800/70 dark:to-gray-800/90
          dark:text-gray-50
          hover:bg-gradient-to-r hover:from-white/90 hover:via-white/70 hover:to-white/90
          before:bg-blue-500
        `,
        destructive: `
          border-red-400/50
          bg-gradient-to-r from-red-50/90 via-red-50/70 to-red-50/90
          text-red-700
          dark:bg-gradient-to-r dark:from-red-900/80 dark:via-red-900/60 dark:to-red-900/80
          dark:text-red-400
          hover:bg-gradient-to-r hover:from-red-50/95 hover:via-red-50/80 hover:to-red-50/95
          before:bg-red-600
        `,
        success: `
          border-green-400/50
          bg-gradient-to-r from-green-50/90 via-green-50/70 to-green-50/90
          text-green-700
          dark:bg-gradient-to-r dark:from-green-900/80 dark:via-green-900/60 dark:to-green-900/80
          dark:text-green-400
          hover:bg-gradient-to-r hover:from-green-50/95 hover:via-green-50/80 hover:to-green-50/95
          before:bg-green-500
        `,
        warning: `
          border-yellow-400/50
          bg-gradient-to-r from-yellow-50/90 via-yellow-50/70 to-yellow-50/90
          text-yellow-700
          dark:bg-gradient-to-r dark:from-yellow-900/80 dark:via-yellow-900/60 dark:to-yellow-900/80
          dark:text-yellow-400
          hover:bg-gradient-to-r hover:from-yellow-50/95 hover:via-yellow-50/80 hover:to-yellow-50/95
          before:bg-yellow-500
        `,
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
);




const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />;
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};

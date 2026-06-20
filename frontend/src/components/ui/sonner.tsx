import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: `
            group 
            relative 
            flex 
            items-center 
            justify-between 
            w-full max-w-xs 
            p-4 
            rounded-xl 
            border 
            shadow-xl 
            transition-all 
            border-transparent 
            bg-gradient-to-r from-white/80 via-white/60 to-white/80 
            dark:from-gray-800/90 dark:via-gray-800/70 dark:to-gray-800/90 
            text-foreground dark:text-gray-50
            backdrop-blur-md
          `,
          description: "text-sm text-muted-foreground",
          actionButton: `
            inline-flex 
            h-8 items-center justify-center 
            rounded-lg border border-primary 
            bg-primary text-primary-foreground 
            hover:bg-primary/90 hover:scale-105 
            transition-all
          `,
          cancelButton: `
            inline-flex 
            h-8 items-center justify-center 
            rounded-lg border border-muted 
            bg-muted text-muted-foreground 
            hover:bg-muted/80 hover:scale-105 
            transition-all
          `,
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };

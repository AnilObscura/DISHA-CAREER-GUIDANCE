// src/components/ui/signin.tsx

import { forwardRef, useState } from "react";
import { LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils.ts";
import { useAuth } from "@/components/providers/auth";
import { Button } from "@/components/ui/button.tsx";

export const SignInButton = forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { isAuthenticated, removeUser, isLoading } = useAuth();

    const handleClick = async () => {
      if (isAuthenticated) {
        await removeUser();
        toast.success("Signed out successfully!");
      } else {
        // Navigate to login page
        window.location.href = "/login";
      }
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        disabled={isLoading}
        className={cn(className)}
        {...props}
      >
        {isAuthenticated ? (
          <>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </>
        )}
      </Button>
    );
  },
);

SignInButton.displayName = "SignInButton";

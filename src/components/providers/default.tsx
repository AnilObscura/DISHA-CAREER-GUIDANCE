import { ConvexProvider } from "convex/react";
import { ThemeProvider } from "next-themes";
import { convex } from "@/lib/convex.ts";
import { Toaster } from "@/components/ui/sonner.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { AuthProvider } from "@/components/providers/auth.tsx";

export function DefaultProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <ConvexProvider client={convex}>
          <AuthProvider>
            <Toaster />
            {children}
          </AuthProvider>
        </ConvexProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
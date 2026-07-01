import { createContext, useContext, type ReactNode, useCallback } from "react";
import { useAuth as useCustomAuth } from "@/hooks/use-auth";

type AuthContextProps = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any | null;
  signin: (email: string, passcode: string) => Promise<void>;
  removeUser: () => void;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useCustomAuth();

  const signin = useCallback(
    async (email: string, passcode: string) => {
      await auth.signinRedirect(email, passcode);
    },
    [auth]
  );

  const signout = useCallback(() => {
    auth.removeUser();
  }, [auth]);

  const value: AuthContextProps = {
    isLoading: auth.isLoading,
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    signin,
    removeUser: auth.removeUser,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

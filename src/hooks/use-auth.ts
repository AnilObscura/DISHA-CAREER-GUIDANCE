import { useState, useEffect, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const DUMMY_USER = {
  _id: "dummy-user-id",
  name: "Ashwani Rathore",
  avatar: "https://i.pravatar.cc/150?img=3",
  createdAt: Date.now(),
};

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const convexUser = useQuery(api.users.getCurrentUser, isAuthenticated ? undefined : "skip");

  useEffect(() => {
    // On mount, check if user is already authenticated
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("currentUser");

    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // Always set loading to false after checking
  }, []); // Run only on mount

  const user = useMemo(() => {
    if (!isAuthenticated) return null;
    // Priority: convexUser > stored currentUser > DUMMY_USER
    return convexUser || currentUser || DUMMY_USER;
  }, [isAuthenticated, convexUser, currentUser]);

  const signinRedirect = async (email: string, passcode: string) => {
    setIsLoading(true);
    try {
      // Check against stored users in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find((u: any) => u.email === email && u.password === passcode);

      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (foundUser) {
        setIsAuthenticated(true);
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        localStorage.setItem("isAuthenticated", "true"); // Persist auth state
        setIsLoading(false);
        return Promise.resolve();
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const removeUser = () => {
    setIsAuthenticated(false);
    setIsLoading(false);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAuthenticated"); // Clear persisted auth state
    // Redirect to home page after logout
    window.location.href = "/";
  };

  return {
    isLoading,
    isAuthenticated,
    user,
    signinRedirect,
    removeUser,
  };
}

export function useUser({ shouldRedirect = false } = {}) {
  const auth = useAuth();
  // Redirect logic can be handled within components that use this hook if needed
  return auth;
}

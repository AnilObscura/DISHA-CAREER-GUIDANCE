import { useState, useEffect, useCallback } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export function useMockAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signinRedirect = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Mock user data
      const mockUser: User = {
        id: "123",
        name: "Mock User",
        email: "mockuser@example.com",
        avatar: "https://i.pravatar.cc/150?img=3",
      };
      setUser(mockUser);
    } catch (err) {
      setError(new Error("Failed to sign in"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser(null);
    } catch (err) {
      setError(new Error("Failed to sign out"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    signinRedirect,
    removeUser,
  };
}

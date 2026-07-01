import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { useAuth } from "@/hooks/use-auth.ts";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signinRedirect } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signinRedirect(email, passcode);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Passcode"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          className="mb-6 w-full p-2 border border-gray-300 rounded"
          required
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-600">Sign up</a>
        </p>
      </form>
    </div>
  );
}

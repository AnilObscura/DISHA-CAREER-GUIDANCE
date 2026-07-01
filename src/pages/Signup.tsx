import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    currentClass: "",
    location: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }

    // Store in localStorage as JSON
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const newUser = {
      id: Date.now().toString(),
      ...formData,
      createdAt: Date.now(),
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Account created successfully! Please login.");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          name="currentClass"
          placeholder="Current Class"
          value={formData.currentClass}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
      </p>
    </div>
  );
}

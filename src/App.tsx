// src/App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import Layout from "@/components/Layout.tsx";
import Index from "./pages/Index.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Assessment from "./pages/Assessment.tsx";
import Colleges from "./pages/Colleges.tsx";
import Careers from "./pages/Careers.tsx";
import Resources from "./pages/Resources.tsx";
import Profile from "./pages/Profile.tsx";
import Chatbot from "./pages/Chatbot.tsx"; // Import the new page
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chatbot" element={<Chatbot />} /> {/* Add the route */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}
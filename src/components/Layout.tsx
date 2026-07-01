// src/components/Layout.tsx
import { Link, Outlet } from "react-router-dom";
import { GraduationCap, MessageSquare, Home, LogOut } from "lucide-react"; // Import new icon
import { Button } from "@/components/ui/button.tsx";
import { useAuth } from "@/hooks/use-auth";

export default function Layout() {
    const { isAuthenticated, removeUser } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-110">
                        <GraduationCap className="h-8 w-8 text-blue-600" />
                        <Link to="/" className="text-xl font-bold text-gray-900 ">
                            Disha
                        </Link>
                    </div>
                
                    <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
                        {/* ... your existing nav links ... */}
                        <Link to="/colleges" className="relative group hover:text-blue-600 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all after:duration-200 group-hover:after:w-full">Colleges</Link>
                        <Link to="/careers" className="relative group hover:text-blue-600 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all after:duration-200 group-hover:after:w-full">Careers</Link>
                        <Link to="/resources" className="relative group hover:text-blue-600 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all after:duration-200 group-hover:after:w-full">Resources</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <>
                          <Button variant="outline" size="sm" asChild>
                            <Link to="/chatbot">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              AI Mentor
                            </Link>
                          </Button>
                          {isAuthenticated ? (
                            <>
                              <Button variant="outline" size="sm" asChild>
                                <Link to="/dashboard" className="flex items-center gap-1">
                                  <Home className="h-4 w-4" />
                                  Dashboard
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" onClick={removeUser}>
                                <LogOut className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button asChild>
                              <Link to="/login">Sign In</Link>
                            </Button>
                          )}
                        </>
                    </div>
                </div>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

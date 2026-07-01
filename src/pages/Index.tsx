import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap, MapPin, Users, Target, Calendar, Home } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { useAuth } from "@/components/providers/auth.tsx";

export default function Index() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="bg-blue-50 py-32"> {/* taller vertical padding */}
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-16">

          {/* Left Side Content */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Disha : Your Digital Career  & Education Advisor
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Make informed academic decisions with personalized guidance, aptitude
              assessments, and comprehensive information about government colleges
              and career paths.
            </p>
            <div className="mt-10 flex space-x-4">
              {isAuthenticated ? (
                <Link to="/dashboard" className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
              ) : (
                <Link to="/login">
                  <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
                    Sign In
                  </button>
                </Link>
              )}
              <Link to="/colleges">
                <button className="px-6 py-3 bg-white border rounded-lg hover:bg-gray-100">
                  Explore Colleges
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="flex justify-center">
            <img
              src="growth.jpg"
              alt="Career Guidance"
              className="max-w-xl w-full h-auto rounded-lg shadow-lg"
            />
          </div>

        </div>
      </section>






      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Academic Success
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our comprehensive platform helps students make informed decisions about their educational journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer border border-gray-200 transition-all transform hover:-translate hover:border-blue-500 hover:shadow-lg">
            <CardHeader>
              <Target className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Decide your Goal</CardTitle>
              <CardDescription>
                Take comprehensive quizzes to discover your strengths, interests, and ideal career paths
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="p-0 h-auto" asChild>
                <Link to="/assessment">
                  Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer border border-gray-200 transition-all transform hover:-translate hover:border-green-500 hover:shadow-lg">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Career Path Mapping</CardTitle>
              <CardDescription>
                Explore detailed career options, salary prospects, and growth opportunities for each degree
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="p-0 h-auto" asChild>
                <Link to="/careers">
                  Explore Careers <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer border border-gray-200 transition-all transform hover:-translate hover:border-purple-500 hover:shadow-lg">
            <CardHeader>
              <MapPin className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Government Colleges</CardTitle>
              <CardDescription>
                Find nearby government colleges with course details, eligibility, and facilities information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="p-0 h-auto" asChild>
                <Link to="/colleges">
                  Find Colleges <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer border border-gray-200 transition-all transform hover:-translate hover:border-orange-500 hover:shadow-lg">
            <CardHeader>
              <Calendar className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle>Important Dates</CardTitle>
              <CardDescription>
                Never miss admission deadlines, scholarship applications, or entrance exam dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="p-0 h-auto" asChild>
                <Link to="/dashboard">
                  View Timeline <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer border border-gray-200 transition-all transform hover:-translate hover:border-red-500 hover:shadow-lg">
            <CardHeader>
              <Users className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle>Study Resources</CardTitle>
              <CardDescription>
                Access e-books, practice materials, and scholarship information tailored to your interests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="p-0 h-auto" asChild>
                <Link to="/resources">
                  Browse Resources <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer border border-gray-200 transition-all transform hover:-translate hover:border-indigo-500 hover:shadow-lg">
            <CardHeader>
              <GraduationCap className="h-12 w-12 text-indigo-600 mb-4" />
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Get AI-powered recommendations based on your profile, location, and career goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="p-0 h-auto" asChild>
                <Link to="/profile">
                  Setup Profile <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>







      {/* Impact Stats */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Making a Real Difference</h2>
            <p className="text-gray-600 text-lg">
              Empowering students to make informed decisions about their educational future
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-2 text-center justify-items-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-1">1000+</div>
              <div className="text-gray-600">Students Guided</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-1">100+</div>
              <div className="text-gray-600">Government Colleges</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-1">50+</div>
              <div className="text-gray-600">Career Paths</div>
            </div>
            {/* <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <span className="font-bold">Disha</span>
              </div>
              <p className="text-gray-400">
                Empowering students with personalized career guidance and educational opportunities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/assessment" className="block text-gray-400 hover:text-white">Assessment</Link>
                <Link to="/colleges" className="block text-gray-400 hover:text-white">Colleges</Link>
                <Link to="/careers" className="block text-gray-400 hover:text-white">Careers</Link>
                <Link to="/resources" className="block text-gray-400 hover:text-white">Resources</Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white">Contact Us</a>
                <a href="#" className="block text-gray-400 hover:text-white">Privacy Policy</a>
                <a href="#" className="block text-gray-400 hover:text-white">Terms of Service</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <p className="text-gray-400">
                Follow us for updates on new features and educational opportunities.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Disha. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
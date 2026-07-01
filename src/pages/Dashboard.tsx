import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Target, 
  BookOpen, 
  MapPin, 
  Bell, 
  TrendingUp,
  Clock,
  Star,
  ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useAuth } from "@/components/providers/auth.tsx";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";

export default function Dashboard() {
  const { user, isLoading: userLoading } = useAuth();

  // Ensure user name is displayed from logged in user data
  const [currentTime, setCurrentTime] = useState(new Date());

  // Sample data - in real app, this would come from the backend
  const notifications = useQuery(api.notifications.getRecent, { limit: 5 }) || [];
  const userProgress = useQuery(api.users.getUserProgress) || null;
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid lg:grid-cols-3 gap-6">
              <Skeleton className="h-48 col-span-2" />
              <Skeleton className="h-48" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getGreeting()}, {user?.name || "Student"}!
              </h1>
              <p className="text-gray-600">Ready to continue your educational journey?</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-2">
                <Clock className="h-3 w-3" />
                {currentTime.toLocaleTimeString()}
              </Badge>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Link to="/assessment" className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Take Assessment</p>
                    <p className="text-sm text-gray-600">Find your path</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Link to="/colleges" className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Find Colleges</p>
                    <p className="text-sm text-gray-600">Near you</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Link to="/careers" className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Explore Careers</p>
                    <p className="text-sm text-gray-600">Future paths</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Link to="/resources" className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">Study Resources</p>
                    <p className="text-sm text-gray-600">Learn more</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Your Progress
                </CardTitle>
                <CardDescription>
                  Track your journey towards educational success
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Profile Completion</span>
                    <span className="text-sm text-gray-600">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✓ Profile setup</li>
                        <li>✓ Interest survey</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium">Pending</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>○ Aptitude assessment</li>
                        <li>○ College selection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>
                  Based on your profile and interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">Complete Aptitude Assessment</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Discover your strengths and get personalized stream recommendations
                        </p>
                        <Badge variant="secondary" className="text-xs">High Priority</Badge>
                      </div>
                      <Button size="sm" asChild>
                        <Link to="/assessment">Start</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">Explore B.Sc. Computer Science</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          High demand career with excellent growth prospects
                        </p>
                        <Badge variant="outline" className="text-xs">Trending</Badge>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link to="/careers">View</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">Government College Near You</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          ABC Government College - 5km away, B.Com available
                        </p>
                        <Badge variant="outline" className="text-xs">Nearby</Badge>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link to="/colleges">Explore</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Important Dates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <p className="font-medium text-sm">College Admissions</p>
                    <p className="text-xs text-gray-600">Deadline: Mar 15, 2024</p>
                    <Badge variant="destructive" className="text-xs mt-1">3 days left</Badge>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="font-medium text-sm">Scholarship Applications</p>
                    <p className="text-xs text-gray-600">Deadline: Apr 1, 2024</p>
                    <Badge variant="secondary" className="text-xs mt-1">19 days left</Badge>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-medium text-sm">Entrance Exam Registration</p>
                    <p className="text-xs text-gray-600">Opens: Apr 15, 2024</p>
                    <Badge variant="outline" className="text-xs mt-1">Coming soon</Badge>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full mt-4" asChild>
                  <Link to="/timeline">View All Dates</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-purple-500" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">New college added</p>
                    <p className="text-blue-700">XYZ Government College in your area</p>
                    <p className="text-xs text-blue-600 mt-1">2 hours ago</p>
                  </div>
                  
                  <div className="text-sm p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-900">Assessment completed</p>
                    <p className="text-green-700">Your interest profile is ready!</p>
                    <p className="text-xs text-green-600 mt-1">1 day ago</p>
                  </div>
                  
                  <div className="text-sm p-3 bg-orange-50 rounded-lg">
                    <p className="font-medium text-orange-900">Reminder</p>
                    <p className="text-orange-700">Complete your profile for better recommendations</p>
                    <p className="text-xs text-orange-600 mt-1">2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Colleges Explored</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Careers Viewed</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Resources Downloaded</span>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Days Active</span>
                    <span className="font-semibold">15</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
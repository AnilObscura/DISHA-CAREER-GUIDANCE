import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Alert, AlertDescription } from "@/components/ui/alert.tsx";
import { Bot, ArrowRight, Search, TrendingUp, BookOpen, MapPin, Target, Users, MessageSquare, Zap } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function AIBot() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  // Fetch data for insights
  const careerPaths = useQuery(api.careers.get) || [];
  const notifications = useQuery(api.notifications.getRecent, { limit: 5 }) || [];
  const userProgress = useQuery(api.users.getUserProgress) || null;

  const pages = [
    { name: 'Dashboard', path: '/dashboard', icon: TrendingUp, description: 'View your personalized dashboard' },
    { name: 'Assessment', path: '/assessment', icon: Target, description: 'Take career assessment tests' },
    { name: 'Careers', path: '/careers', icon: Users, description: 'Explore career paths and opportunities' },
    { name: 'Colleges', path: '/colleges', icon: MapPin, description: 'Find colleges and universities' },
    { name: 'Resources', path: '/resources', icon: BookOpen, description: 'Access study materials and resources' },
    { name: 'Profile', path: '/profile', icon: Users, description: 'Manage your profile and settings' },
  ];

  const handleQuery = () => {
    if (!query.trim()) return;

    // Simple AI-like responses based on keywords
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('dashboard') || lowerQuery.includes('home')) {
      setResponse('Redirecting to your personalized dashboard...');
      setTimeout(() => navigate('/dashboard'), 1000);
    } else if (lowerQuery.includes('assessment') || lowerQuery.includes('test')) {
      setResponse('Taking you to the assessment page to evaluate your career interests...');
      setTimeout(() => navigate('/assessment'), 1000);
    } else if (lowerQuery.includes('career') || lowerQuery.includes('job')) {
      setResponse('Exploring career opportunities for you...');
      setTimeout(() => navigate('/careers'), 1000);
    } else if (lowerQuery.includes('college') || lowerQuery.includes('university')) {
      setResponse('Finding the best colleges for your future...');
      setTimeout(() => navigate('/colleges'), 1000);
    } else if (lowerQuery.includes('resource') || lowerQuery.includes('study')) {
      setResponse('Accessing educational resources...');
      setTimeout(() => navigate('/resources'), 1000);
    } else if (lowerQuery.includes('profile') || lowerQuery.includes('settings')) {
      setResponse('Managing your profile settings...');
      setTimeout(() => navigate('/profile'), 1000);
    } else {
      setResponse('I can help you navigate to: Dashboard, Assessment, Careers, Colleges, Resources, or Profile. What would you like to do?');
    }
  };

  const getDataInsights = () => {
    const insights = [];

    if (careerPaths.length > 0) {
      insights.push(`You have ${careerPaths.length} career paths available`);
    }

    if (notifications.length > 0) {
      insights.push(`${notifications.length} recent notifications`);
    }

    if (userProgress) {
      insights.push(`Assessment completed with scores available`);
    }

    return insights;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Bot className="h-8 w-8 text-blue-600" />
                AI Assistant
              </h1>
              <p className="text-gray-600 mt-2">
                Your intelligent guide to navigate the platform and get data insights
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-3 py-1">
                <Zap className="h-4 w-4 mr-1" />
                AI Powered
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Chat Interface */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-500" />
                  Ask AI Assistant
                </CardTitle>
                <CardDescription>
                  Type your query or ask me to navigate to any section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., 'Take me to dashboard' or 'Show career options'"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
                  />
                  <Button onClick={handleQuery}>
                    <Search className="h-4 w-4 mr-1" />
                    Ask
                  </Button>
                </div>

                {response && (
                  <Alert>
                    <Bot className="h-4 w-4" />
                    <AlertDescription>{response}</AlertDescription>
                  </Alert>
                )}

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <Button variant="outline" onClick={() => navigate('/dashboard')} className="justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Go to Dashboard
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/assessment')} className="justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Start Assessment
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/careers')} className="justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Explore Careers
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/colleges')} className="justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    Find Colleges
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Insights */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Data Insights</CardTitle>
                <CardDescription>
                  Real-time data extracted from your profile and platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getDataInsights().map((insight, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">{insight}</span>
                    </div>
                  ))}
                  {careerPaths.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Popular Career Paths:</h4>
                      <div className="flex flex-wrap gap-2">
                        {careerPaths.slice(0, 5).map((career, index) => (
                          <Badge key={index} variant="outline">
                            {career.courseName}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Navigation</CardTitle>
                <CardDescription>
                  Direct access to all platform sections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pages.map((page) => (
                    <Link key={page.name} to={page.path}>
                      <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <page.icon className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">{page.name}</p>
                            <p className="text-xs text-gray-600">{page.description}</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification, index) => (
                    <div key={index} className="text-sm p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-gray-600">{notification.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(notification.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-sm text-gray-500">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

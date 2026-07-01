import { useState, useEffect } from "react";
import {
  User,
  Settings,
  BookOpen,
  Award,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Edit,
  Save,
  X,
  Target,
  TrendingUp,
  Star,
  CheckCircle
} from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { useAuth } from "@/components/providers/auth.tsx";

// Mock user data - in real app, this would come from the backend
const mockUserData = {
  personalInfo: {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 9876543210",
    age: 17,
    gender: "Female",
    currentClass: "12th Grade",
    location: "Mumbai, Maharashtra",
    interests: ["Technology", "Mathematics", "Science"],
    bio: "Aspiring computer science student passionate about coding and problem-solving."
  },
  academicInfo: {
    school: "Delhi Public School, Mumbai",
    stream: "Science",
    subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science", "English"],
    percentage: 85.6,
    preferredStreams: ["Science", "Technology"]
  },
  assessments: [
    {
      type: "Aptitude Assessment",
      completedDate: "2024-03-10",
      score: 92,
      recommendedStreams: ["Science", "Technology"]
    },
    {
      type: "Interest Survey",
      completedDate: "2024-03-08",
      score: 88,
      recommendedStreams: ["Science", "Commerce"]
    }
  ],
  bookmarkedColleges: [
    { name: "IIT Delhi", stream: "Computer Science", location: "Delhi" },
    { name: "Mumbai University", stream: "Science", location: "Mumbai" },
    { name: "Government College of Arts", stream: "Arts", location: "Mumbai" }
  ],
  achievements: [
    { title: "Profile Completion", description: "Completed 90% of profile", date: "2024-03-12" },
    { title: "Assessment Master", description: "Completed all assessments", date: "2024-03-10" },
    { title: "College Explorer", description: "Viewed 15+ college profiles", date: "2024-03-08" }
  ],
  activityStats: {
    collegesViewed: 18,
    careersExplored: 12,
    resourcesDownloaded: 8,
    assessmentsTaken: 2,
    daysActive: 15
  }
};

export default function Profile() {
  // Fetch user profile data from backend
  const { user: userProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form data with user profile or default values
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    age: number | undefined;
    gender: string;
    currentClass: string;
    location: string;
    interests: string[];
    bio: string;
    school: string;
    stream: string;
    subjects: string[];
    percentage: number | undefined;
    preferredStreams: string[];
  }>({
    name: "",
    email: "",
    phone: "",
    age: undefined,
    gender: "",
    currentClass: "",
    location: "",
    interests: [],
    bio: "",
    school: "",
    stream: "",
    subjects: [],
    percentage: undefined,
    preferredStreams: []
  });

  // Update form data when user profile is loaded
  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        age: userProfile.age,
        gender: userProfile.gender || "",
        currentClass: userProfile.currentClass || "",
        location: userProfile.location || "",
        interests: userProfile.interests || [],
        bio: userProfile.bio || "",
        school: userProfile.school || "",
        stream: userProfile.stream || "",
        subjects: userProfile.subjects || [],
        percentage: userProfile.percentage,
        preferredStreams: userProfile.preferredStreams || []
      });
    }
  }, [userProfile]);

  const handleSave = () => {
    // For now, just exit edit mode without saving
    // In a real app, this would save to a backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        age: userProfile.age,
        gender: userProfile.gender || "",
        currentClass: userProfile.currentClass || "",
        location: userProfile.location || "",
        interests: userProfile.interests || [],
        bio: userProfile.bio || "",
        school: userProfile.school || "",
        stream: userProfile.stream || "",
        subjects: userProfile.subjects || [],
        percentage: userProfile.percentage,
        preferredStreams: userProfile.preferredStreams || []
      });
    }
    setIsEditing(false);
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    const fields = [
      formData.name,
      formData.email,
      formData.age,
      formData.gender,
      formData.currentClass,
      formData.location,
      formData.bio,
      formData.school,
      formData.stream,
      formData.percentage
    ];
    const filledFields = fields.filter(field =>
      field !== "" && field !== undefined && field !== null
    ).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
            >
              {isEditing ? (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
            
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="academic">Academic Info</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Manage your personal details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Profile Picture and Basic Info */}
                    <div className="flex items-start gap-6">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarFallback className="text-2xl">
                            {(formData.name || "U").charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button variant="outline" size="sm">
                            Change Photo
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              disabled={!isEditing}
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              disabled={!isEditing}
                            />
                          </div>
                          <div>
                            <Label htmlFor="age">Age</Label>
                            <Input
                              id="age"
                              type="number"
                              value={formData.age}
                              onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                              disabled={!isEditing}
                            />
                          </div>
                          <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Select 
                              value={formData.gender} 
                              onValueChange={(value) => setFormData({...formData, gender: value})}
                              disabled={!isEditing}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="class">Current Class</Label>
                          <Select 
                            value={formData.currentClass} 
                            onValueChange={(value) => setFormData({...formData, currentClass: value})}
                            disabled={!isEditing}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10th Grade">10th Grade</SelectItem>
                              <SelectItem value="11th Grade">11th Grade</SelectItem>
                              <SelectItem value="12th Grade">12th Grade</SelectItem>
                              <SelectItem value="Graduate">Graduate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => setFormData({...formData, bio: e.target.value})}
                          disabled={!isEditing}
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Interests</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.interests.map((interest, index) => (
                            <Badge key={index} variant="secondary">
                              {interest}
                              {isEditing && (
                                <button 
                                  className="ml-2 text-red-500 hover:text-red-700"
                                  onClick={() => {
                                    const newInterests = formData.interests.filter((_, i) => i !== index);
                                    setFormData({...formData, interests: newInterests});
                                  }}
                                >
                                  ×
                                </button>
                              )}
                            </Badge>
                          ))}
                          {isEditing && (
                            <Button variant="outline" size="sm">
                              + Add Interest
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-4">
                        <Button onClick={handleSave}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Profile Completion */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      Profile Completion
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{profileCompletion}%</div>
                        <p className="text-sm text-gray-600">Complete</p>
                      </div>
                      <Progress value={profileCompletion} className="h-2" />
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Basic information added</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Academic details completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-gray-300 rounded-full"></div>
                          <span className="text-gray-500">Assessment pending</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      Activity Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Colleges Viewed</span>
                        <span className="font-semibold">{mockUserData.activityStats.collegesViewed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Careers Explored</span>
                        <span className="font-semibold">{mockUserData.activityStats.careersExplored}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Resources Downloaded</span>
                        <span className="font-semibold">{mockUserData.activityStats.resourcesDownloaded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Days Active</span>
                        <span className="font-semibold">{mockUserData.activityStats.daysActive}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Academic Information Tab */}
          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Academic Information
                </CardTitle>
                <CardDescription>
                  Your educational background and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Current School/College</Label>
                      <Input value={mockUserData.academicInfo.school} disabled />
                    </div>
                    <div>
                      <Label>Stream</Label>
                      <Input value={mockUserData.academicInfo.stream} disabled />
                    </div>
                    <div>
                      <Label>Current Percentage</Label>
                      <Input value={`${mockUserData.academicInfo.percentage}%`} disabled />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Subjects</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {mockUserData.academicInfo.subjects.map((subject, index) => (
                          <Badge key={index} variant="outline">{subject}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Preferred Streams for Higher Education</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {mockUserData.academicInfo.preferredStreams.map((stream, index) => (
                          <Badge key={index} variant="secondary">{stream}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Assessments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Assessment History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUserData.assessments.map((assessment, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{assessment.type}</h4>
                          <Badge variant="secondary">{assessment.score}%</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Completed on {new Date(assessment.completedDate).toLocaleDateString()}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs text-gray-500">Recommended streams:</span>
                          {assessment.recommendedStreams.map((stream, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{stream}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUserData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Award className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Bookmarked Colleges
                </CardTitle>
                <CardDescription>
                  Colleges you've saved for future reference
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockUserData.bookmarkedColleges.map((college, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                      <h4 className="font-medium mb-2">{college.name}</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-3 w-3" />
                          <span>{college.stream}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          <span>{college.location}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
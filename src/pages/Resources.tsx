import { useState } from "react";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Download, 
  Search, 
  Filter,
  Star,
  Eye,
  Clock,
  Award,
  Play,
  ExternalLink,
  Bookmark
} from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Label } from "@/components/ui/label.tsx";

// Mock resources data
const resources = [
  {
    id: "1",
    title: "Complete Mathematics for Class 12",
    description: "Comprehensive guide covering all mathematics topics for 12th grade with solved examples and practice problems.",
    type: "ebook",
    category: "Science",
    subject: "Mathematics",
    difficulty: "intermediate",
    downloadCount: 1245,
    rating: 4.6,
    size: "15 MB",
    pages: 420,
    author: "Dr. R.K. Sharma",
    language: "English",
    tags: ["calculus", "algebra", "geometry", "trigonometry"],
    isBookmarked: false
  },
  {
    id: "2",
    title: "Business Studies Fundamentals",
    description: "Essential concepts of business studies including management principles, marketing, and entrepreneurship.",
    type: "ebook",
    category: "Commerce",
    subject: "Business Studies",
    difficulty: "beginner",
    downloadCount: 892,
    rating: 4.3,
    size: "12 MB",
    pages: 320,
    author: "Prof. A. Gupta",
    language: "English",
    tags: ["management", "marketing", "business", "entrepreneurship"],
    isBookmarked: true
  },
  {
    id: "3",
    title: "Introduction to Computer Programming",
    description: "Learn programming basics with Python including data structures, algorithms, and problem-solving techniques.",
    type: "video",
    category: "Science",
    subject: "Computer Science",
    difficulty: "beginner",
    downloadCount: 2156,
    rating: 4.8,
    duration: "8 hours",
    instructor: "Dr. Priya Verma",
    language: "Hindi/English",
    tags: ["programming", "python", "algorithms", "coding"],
    isBookmarked: false
  },
  {
    id: "4",
    title: "Indian History & Culture",
    description: "Comprehensive coverage of Indian history from ancient times to modern era with cultural insights.",
    type: "ebook",
    category: "Arts",
    subject: "History",
    difficulty: "intermediate",
    downloadCount: 734,
    rating: 4.4,
    size: "18 MB",
    pages: 520,
    author: "Prof. S. Krishnan",
    language: "English",
    tags: ["ancient history", "medieval", "modern history", "culture"],
    isBookmarked: false
  },
  {
    id: "5",
    title: "Graphic Design Masterclass",
    description: "Learn professional graphic design techniques using industry-standard software and design principles.",
    type: "video",
    category: "Vocational",
    subject: "Graphic Design",
    difficulty: "advanced",
    downloadCount: 1567,
    rating: 4.7,
    duration: "12 hours",
    instructor: "Ravi Kumar",
    language: "Hindi",
    tags: ["photoshop", "illustrator", "design", "creativity"],
    isBookmarked: true
  },
  {
    id: "6",
    title: "Economics Practice Papers",
    description: "Collection of previous year questions and mock tests for economics with detailed solutions.",
    type: "practice_test",
    category: "Commerce",
    subject: "Economics",
    difficulty: "intermediate",
    downloadCount: 923,
    rating: 4.2,
    questionCount: 200,
    testCount: 15,
    author: "Economics Experts Team",
    language: "English",
    tags: ["practice", "mock test", "previous papers", "solutions"],
    isBookmarked: false
  }
];

const categories = ["All", "Science", "Commerce", "Arts", "Vocational"];
const types = ["All", "ebook", "video", "article", "practice_test"];
const difficulties = ["All", "beginner", "intermediate", "advanced"];
const languages = ["All", "English", "Hindi", "Hindi/English"];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    const matchesType = selectedType === "All" || resource.type === selectedType;
    const matchesDifficulty = selectedDifficulty === "All" || resource.difficulty === selectedDifficulty;
    const matchesLanguage = selectedLanguage === "All" || resource.language === selectedLanguage;

    return matchesSearch && matchesCategory && matchesType && matchesDifficulty && matchesLanguage;
  }).sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.downloadCount - a.downloadCount;
      case "rating":
        return b.rating - a.rating;
      case "title":
        return a.title.localeCompare(b.title);
      case "recent":
        return b.id.localeCompare(a.id); // Simple recency simulation
      default:
        return 0;
    }
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ebook":
        return <BookOpen className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "article":
        return <FileText className="h-4 w-4" />;
      case "practice_test":
        return <Award className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ebook":
        return "E-Book";
      case "video":
        return "Video Course";
      case "article":
        return "Article";
      case "practice_test":
        return "Practice Test";
      default:
        return type;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleBookmark = (resourceId: string) => {
    // In a real app, this would update the backend
    console.log(`Toggle bookmark for resource ${resourceId}`);
  };

  const ResourceCard = ({ resource }: { resource: typeof resources[0] }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getTypeIcon(resource.type)}
              <Badge variant="outline" className="text-xs">
                {getTypeLabel(resource.type)}
              </Badge>
              <Badge className={getDifficultyColor(resource.difficulty)}>
                {resource.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-lg mb-2">{resource.title}</CardTitle>
            <CardDescription className="mb-3">
              {resource.description}
            </CardDescription>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{resource.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                <span>{resource.downloadCount.toLocaleString()}</span>
              </div>
              {resource.type === "video" && resource.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{resource.duration}</span>
                </div>
              )}
              {resource.type === "ebook" && resource.pages && (
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  <span>{resource.pages} pages</span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleBookmark(resource.id)}
          >
            <Bookmark 
              className={`h-4 w-4 ${resource.isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} 
            />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Subject:</span>
              <p className="font-medium">{resource.subject}</p>
            </div>
            <div>
              <span className="text-gray-500">Language:</span>
              <p className="font-medium">{resource.language}</p>
            </div>
            {resource.type === "ebook" && (
              <>
                <div>
                  <span className="text-gray-500">Author:</span>
                  <p className="font-medium">{resource.author}</p>
                </div>
                <div>
                  <span className="text-gray-500">Size:</span>
                  <p className="font-medium">{resource.size}</p>
                </div>
              </>
            )}
            {resource.type === "video" && (
              <>
                <div>
                  <span className="text-gray-500">Instructor:</span>
                  <p className="font-medium">{resource.instructor}</p>
                </div>
                <div>
                  <span className="text-gray-500">Duration:</span>
                  <p className="font-medium">{resource.duration}</p>
                </div>
              </>
            )}
            {resource.type === "practice_test" && (
              <>
                <div>
                  <span className="text-gray-500">Questions:</span>
                  <p className="font-medium">{resource.questionCount}</p>
                </div>
                <div>
                  <span className="text-gray-500">Tests:</span>
                  <p className="font-medium">{resource.testCount}</p>
                </div>
              </>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {resource.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {resource.type === "video" ? (
              <Button className="flex-1">
                <Play className="mr-2 h-4 w-4" />
                Watch Now
              </Button>
            ) : (
              <Button className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            )}
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Study Resources
          </h1>
          <p className="text-gray-600">
            Access free e-books, video courses, practice tests, and study materials for all streams
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>
                        {type === "All" ? "All Types" : getTypeLabel(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Difficulty</Label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty === "All" ? "All Levels" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(language => (
                      <SelectItem key={language} value={language}>{language}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                    <SelectItem value="recent">Recently Added</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Categories */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <BookOpen className="h-8 w-8 mx-auto text-blue-600 mb-3" />
              <h3 className="font-semibold mb-1">E-Books</h3>
              <p className="text-sm text-gray-600">
                {resources.filter(r => r.type === 'ebook').length} books available
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Video className="h-8 w-8 mx-auto text-green-600 mb-3" />
              <h3 className="font-semibold mb-1">Video Courses</h3>
              <p className="text-sm text-gray-600">
                {resources.filter(r => r.type === 'video').length} courses available
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Award className="h-8 w-8 mx-auto text-purple-600 mb-3" />
              <h3 className="font-semibold mb-1">Practice Tests</h3>
              <p className="text-sm text-gray-600">
                {resources.filter(r => r.type === 'practice_test').length} tests available
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <FileText className="h-8 w-8 mx-auto text-orange-600 mb-3" />
              <h3 className="font-semibold mb-1">Articles</h3>
              <p className="text-sm text-gray-600">
                {resources.filter(r => r.type === 'article').length} articles available
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredResources.length} Resources Found
            </h2>
            <p className="text-gray-600">
              Free study materials for your academic success
            </p>
          </div>
        </div>

        {/* Resource Cards */}
        {filteredResources.length === 0 ? (
          <Card className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to find more study materials
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedType("All");
                setSelectedDifficulty("All");
                setSelectedLanguage("All");
              }}
            >
              Clear Filters
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredResources.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline">
              Load More Resources
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
// src/pages/Careers.tsx

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { useNavigate } from "react-router-dom";
import { api } from "@/convex/_generated/api";
import {
  TrendingUp,
  BookOpen,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Search,
  Filter,
  Building2,
  Target,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Clock,
  Award,
  Users,
  Zap,
  MapPin
} from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Reusable Filter Group Component
function FilterGroup({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
          <Label>{title}</Label>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-2 space-y-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

// Career Card Component (remains the same)
function CareerCard({ career, onNavigateToColleges }: { career: any, onNavigateToColleges: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDemandColor = (demand: string) => {
    switch (demand?.toLowerCase()) {
      case "high": return "text-green-600 bg-green-50 border-green-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getDemandText = (demand: string) => {
    switch (demand?.toLowerCase()) {
      case "high": return "High Demand";
      case "medium": return "Moderate Demand";
      case "low": return "Low Demand";
      default: return "N/A";
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-xl">{career.courseName}</CardTitle>
                  <Badge variant="outline" className="ml-2">{career.stream}</Badge>
                  <Badge className={getDemandColor(career.industryDemand)}>
                    {getDemandText(career.industryDemand)}
                  </Badge>
                </div>
                <CardDescription className="text-base">{career.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2 pl-4">
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
               <div className="space-y-2">
                 <div className="flex items-center gap-2">
                   <Target className="h-4 w-4 text-blue-600" />
                   <h4 className="font-semibold text-sm text-gray-700">Category</h4>
                 </div>
                 <p className="text-sm text-gray-600">{career.stream || "Not specified"}</p>
               </div>
               <div className="space-y-2">
                 <div className="flex items-center gap-2">
                   <Clock className="h-4 w-4 text-purple-600" />
                   <h4 className="font-semibold text-sm text-gray-700">Duration</h4>
                 </div>
                 <p className="text-sm text-gray-600">{career.duration || "N/A"}</p>
               </div>
               <div className="space-y-2 col-span-1 md:col-span-2">
                 <div className="flex items-center gap-2">
                   <Briefcase className="h-4 w-4 text-orange-600" />
                   <h4 className="font-semibold text-sm text-gray-700">Possible Professions</h4>
                 </div>
                 <div className="space-y-1">
                   {career.careerOptions?.slice(0, 3).map((option: any, index: number) => (
                     <p key={index} className="text-sm text-gray-600">• {option.title}</p>
                   )) || <p className="text-sm text-gray-600">Not specified</p>}
                 </div>
               </div>
             </div>
             <div className="mt-8 space-y-6">
               <div className="border-t pt-6">
                 <div className="flex items-center gap-2 mb-3">
                   <Award className="h-4 w-4 text-indigo-600" />
                   <h4 className="font-semibold text-gray-700">Eligibility</h4>
                 </div>
                 <p className="text-sm text-gray-600">{career.eligibilityDisplay || "Not specified"}</p>
               </div>
               <div className="border-t pt-6">
                 <div className="flex items-center gap-2 mb-3">
                   <Zap className="h-4 w-4 text-yellow-600" />
                   <h4 className="font-semibold text-gray-700">Skills Required</h4>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {career.skillsRequired?.map((skill: string, index: number) => (
                     <Badge key={index} variant="secondary" className="text-xs">
                       {skill}
                     </Badge>
                   ))}
                 </div>
               </div>
               <div className="border-t pt-6">
                 <div className="flex items-center gap-2 mb-3">
                   <TrendingUp className="h-4 w-4 text-green-600" />
                   <h4 className="font-semibold text-gray-700">Career Prospects</h4>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {career.careerOptions?.map((option: any, index: number) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-sm">{option.title}</p>
                      <p className="text-xs text-gray-600">{option.description}</p>
                      <p className="text-sm font-medium mt-2 text-green-700">{option.averageSalary}</p>
                    </div>
                  ))}
                 </div>
               </div>
               <div className="border-t pt-6 flex justify-end">
                 <Button className="gap-2" onClick={onNavigateToColleges}>
                   <MapPin className="h-4 w-4" />
                   Find Related Colleges
                   <ArrowRight className="h-4 w-4" />
                 </Button>
               </div>
             </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

export default function Careers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStream, setSelectedStream] = useState("All");
  const [selectedEligibility, setSelectedEligibility] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedDemands, setSelectedDemands] = useState<string[]>([]);

  const careerPaths = useQuery(api.careers.get);

  const filterOptions = useMemo(() => {
    if (!careerPaths) return { streams: [], eligibility: [], durations: [] };
    const streams = [...new Set(careerPaths.map(c => c.stream).filter(Boolean))].sort();
    const eligibility = [...new Set(careerPaths.map(c => c.eligibilityFilter).filter(Boolean))].sort();
    const durations = [...new Set(careerPaths.map(c => c.duration).filter(Boolean))].sort((a, b) => parseFloat(a) - parseFloat(b));
    return { streams, eligibility, durations };
  }, [careerPaths]);

  const filteredCareers = useMemo(() => {
    if (!careerPaths) return [];

    return careerPaths.filter(career => {
      // Search filter - more flexible matching
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        (career.courseName && career.courseName.toLowerCase().includes(searchLower)) ||
        (career.description && career.description.toLowerCase().includes(searchLower)) ||
        career.careerOptions?.some(option =>
          (option.title && option.title.toLowerCase().includes(searchLower)) ||
          (option.description && option.description.toLowerCase().includes(searchLower))
        );

      // Stream filter
      const matchesStream = selectedStream === "All" ||
        (career.stream && career.stream.toLowerCase() === selectedStream.toLowerCase());

      // Eligibility filter - more flexible matching
      const matchesEligibility = selectedEligibility.length === 0 ||
        selectedEligibility.some(sel => {
          const selLower = sel.toLowerCase();
          return (
            (career.eligibilityFilter && career.eligibilityFilter.toLowerCase().includes(selLower)) ||
            (career.eligibility && career.eligibility.toLowerCase().includes(selLower)) ||
            (career.eligibilityDisplay && career.eligibilityDisplay.toLowerCase().includes(selLower))
          );
        });

      // Duration filter - handle different formats
      const matchesDuration = selectedDurations.length === 0 ||
        selectedDurations.some(sel =>
          (career.duration && career.duration.toLowerCase().includes(sel.toLowerCase())) ||
          career.duration === sel
        );

      // Demand filter
      const matchesDemand = selectedDemands.length === 0 ||
        selectedDemands.some(sel =>
          career.industryDemand && career.industryDemand.toLowerCase() === sel.toLowerCase()
        );

      return matchesSearch && matchesStream && matchesEligibility && matchesDuration && matchesDemand;
    });
  }, [careerPaths, searchQuery, selectedStream, selectedEligibility, selectedDurations, selectedDemands]);
  
  const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, checked: boolean | string, value: string) => {
    setter(prev => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter(item => item !== value);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Career Path Explorer 🧭
          </h1>
          <p className="text-gray-600">
            Discover detailed career information, salary prospects, and growth opportunities.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5" /> Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search Courses</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="e.g., Data Science, MBBS..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stream">Domain</Label>
                  <Select value={selectedStream} onValueChange={setSelectedStream}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Domains</SelectItem>
                      {filterOptions.streams.map(stream => (
                        <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <FilterGroup title="Eligibility">
                  {filterOptions.eligibility.map(option => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox id={option} checked={selectedEligibility.includes(option)} onCheckedChange={(c) => handleCheckboxChange(setSelectedEligibility, c, option)} />
                      <Label htmlFor={option} className="text-sm font-normal">{option}</Label>
                    </div>
                  ))}
                </FilterGroup>

                <FilterGroup title="Course Duration">
                  {filterOptions.durations.map(option => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox id={option} checked={selectedDurations.includes(option)} onCheckedChange={(c) => handleCheckboxChange(setSelectedDurations, c, option)} />
                      <Label htmlFor={option} className="text-sm font-normal">{option}</Label>
                    </div>
                  ))}
                </FilterGroup>

                <FilterGroup title="Industry Demand">
                  {[{value: 'high', label: 'High'}, {value: 'medium', label: 'Medium'}, {value: 'low', label: 'Low'}].map(option => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox id={option.value} checked={selectedDemands.includes(option.value)} onCheckedChange={(c) => handleCheckboxChange(setSelectedDemands, c, option.value)} />
                      <Label htmlFor={option.value} className="text-sm font-normal">{option.label}</Label>
                    </div>
                  ))}
                </FilterGroup>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedStream("All");
                    setSelectedEligibility([]);
                    setSelectedDurations([]);
                    setSelectedDemands([]);
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Career Cards List */}
          <main className="lg:col-span-3">
             <div className="mb-6">
               <h2 className="text-xl font-semibold text-gray-900 mb-2">
                 Showing {filteredCareers?.length ?? 0} Career Paths
               </h2>
             </div>
            <div className="space-y-4">
              {!careerPaths ? (
                Array.from({length: 5}).map((_, i) => <Skeleton key={i} className="h-48 w-full" />)
              ) : (
                filteredCareers?.map(career => (
                  <CareerCard 
                    key={career._id} 
                    career={career} 
                    onNavigateToColleges={() => {
                       navigate(`/colleges?stream=${career.stream || ''}&course=${career.courseName || ''}`);
                    }}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
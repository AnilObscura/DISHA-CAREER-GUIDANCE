// src/pages/Assessment.tsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Target,
  Brain,
  Heart,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/components/providers/auth";

import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";

// ... Keep your Question type and questions arrays (aptitudeQuestions, etc.) ...
type AssessmentType = "aptitude" | "interest" | "personality";

interface Question {
  id: string;
  question: string;
  options: string[];
  category: string;
}

const aptitudeQuestions: Question[] = [
  {
    id: "apt_1",
    question: "Which subject do you find most engaging?",
    options: ["Mathematics and Physics", "Economics and Business", "History and Literature", "Art and Design"],
    category: "subject_preference"
  },
  {
    id: "apt_2",
    question: "How do you prefer to solve problems?",
    options: ["Using logical analysis and formulas", "Through research and data", "By understanding people's perspectives", "Through creative and visual approaches"],
    category: "problem_solving"
  },
  {
    id: "apt_3",
    question: "What type of activities energize you the most?",
    options: ["Building or experimenting with things", "Analyzing trends and numbers", "Writing and communicating", "Creating and designing"],
    category: "activities"
  },
  {
    id: "apt_4",
    question: "In group projects, you typically:",
    options: ["Focus on technical execution", "Handle planning and coordination", "Manage communication and presentation", "Lead creative brainstorming"],
    category: "teamwork"
  },
  {
    id: "apt_5",
    question: "What career environment appeals to you most?",
    options: ["Labs and technical facilities", "Corporate offices and meetings", "Libraries and research centers", "Studios and creative spaces"],
    category: "environment"
  }
];

const interestQuestions: Question[] = [
  {
    id: "int_1",
    question: "What type of books or content do you enjoy most?",
    options: ["Science and technology articles", "Business and finance news", "Social studies and philosophy", "Arts and culture magazines"],
    category: "content_preference"
  },
  {
    id: "int_2",
    question: "Which extracurricular activity would you choose?",
    options: ["Science club or coding", "Debate team or business club", "Student government or volunteering", "Drama club or art society"],
    category: "extracurricular"
  },
  {
    id: "int_3",
    question: "What motivates you most in learning?",
    options: ["Understanding how things work", "Learning about market trends", "Exploring human behavior", "Expressing creativity"],
    category: "motivation"
  },
  {
    id: "int_4",
    question: "Which field's latest developments excite you?",
    options: ["AI and robotics", "Startups and entrepreneurship", "Social movements and policy", "Digital art and media"],
    category: "field_interest"
  },
  {
    id: "int_5",
    question: "What type of impact do you want to make?",
    options: ["Technological innovation", "Economic growth", "Social change", "Cultural influence"],
    category: "impact_goal"
  }
];

const personalityQuestions: Question[] = [
  {
    id: "per_1",
    question: "How do you approach new challenges?",
    options: ["Break them down systematically", "Research best practices first", "Seek input from others", "Trust my intuition"],
    category: "approach"
  },
  {
    id: "per_2",
    question: "In social situations, you tend to:",
    options: ["Listen and observe", "Lead discussions", "Help others connect", "Share creative ideas"],
    category: "social_style"
  },
  {
    id: "per_3",
    question: "Your ideal work style is:",
    options: ["Independent with clear objectives", "Collaborative with defined roles", "Team-based with flexibility", "Creative with artistic freedom"],
    category: "work_style"
  },
  {
    id: "per_4",
    question: "What stresses you most?",
    options: ["Unclear technical requirements", "Uncertain market conditions", "Interpersonal conflicts", "Lack of creative freedom"],
    category: "stress_factors"
  },
  {
    id: "per_5",
    question: "How do you make important decisions?",
    options: ["Based on data and logic", "Considering risks and benefits", "Thinking about impact on others", "Following my passion"],
    category: "decision_making"
  }
];


export default function Assessment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<Record<string, number> | null>(null);

  // UPDATED: Use the Convex mutation
  const submit = useMutation(api.assessments.saveAssessment);

  const getCurrentQuestions = () => {
    // ... (this function remains the same)
      switch (selectedAssessment) {
      case "aptitude": return aptitudeQuestions;
      case "interest": return interestQuestions;
      case "personality": return personalityQuestions;
      default: return [];
    }
  };

  const questions = getCurrentQuestions();
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / (questions.length || 1)) * 100;

  const handleAnswerSelect = (value: string) => {
    if (currentQuestion) {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // UPDATED: Call the backend mutation
  const completeAssessment = async () => {
    try {
      // Calculate scores based on answers
      const scores: { science: number; commerce: number; arts: number; vocational: number; } = { science: 0, commerce: 0, arts: 0, vocational: 0 };

      Object.values(answers).forEach((answer: string) => {
        if (answer.includes("Mathematics") || answer.includes("technical") || answer.includes("Labs") ||
            answer.includes("Science") || answer.includes("data and logic") || answer.includes("AI")) {
          scores.science += 1;
        }
        if (answer.includes("Economics") || answer.includes("Business") || answer.includes("research") ||
            answer.includes("Corporate") || answer.includes("market") || answer.includes("entrepreneurship")) {
          scores.commerce += 1;
        }
        if (answer.includes("History") || answer.includes("Literature") || answer.includes("communication") ||
            answer.includes("social") || answer.includes("philosophy") || answer.includes("others")) {
          scores.arts += 1;
        }
        if (answer.includes("Art") || answer.includes("Design") || answer.includes("creative") ||
            answer.includes("Studios") || answer.includes("culture") || answer.includes("passion")) {
          scores.vocational += 1;
        }
      });

      // Normalize scores to percentages
      const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
      if (total > 0) {
        (Object.keys(scores) as Array<keyof typeof scores>).forEach(key => {
          scores[key] = Math.round((scores[key] / total) * 100);
        });
      }

      const recommendedStreams = Object.entries(scores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([stream]) => stream);

      // Format questions
      const questions = Object.entries(answers).map(([questionId, answer]) => ({ questionId, answer }));

      const result = await submit({
        userId: user?._id || "",
        type: selectedAssessment!,
        questions,
        scores,
        recommendedStreams,
      });

      if (result) {
        setResults(result.scores);
        setIsCompleted(true);
      }
    } catch (error) {
      console.error("Failed to submit assessment:", error);
    }
  };
  
  // REMOVED: calculateScores function is no longer needed here.

  const getRecommendedStreams = () => {
    if (!results) return [];
    return Object.entries(results)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([stream, score]) => ({ stream, score }));
  };

  const resetAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setResults(null);
  };
  
  // The rest of your JSX remains the same. No changes needed for rendering.
  if (!selectedAssessment) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Discover Your Perfect Path
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Take our comprehensive assessments to understand your strengths, interests, 
                and personality traits for personalized career guidance.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-200"
                onClick={() => setSelectedAssessment("aptitude")}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Aptitude Assessment</CardTitle>
                  <CardDescription>
                    Discover your natural strengths and abilities across different academic areas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>5-7 minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BarChart3 className="h-4 w-4" />
                      <span>Stream recommendations</span>
                    </div>
                  </div>
                  <Badge variant="secondary">Most Popular</Badge>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-200"
                onClick={() => setSelectedAssessment("interest")}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Interest Survey</CardTitle>
                  <CardDescription>
                    Explore what subjects and activities genuinely excite and motivate you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>3-5 minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BarChart3 className="h-4 w-4" />
                      <span>Career interests</span>
                    </div>
                  </div>
                  <Badge variant="outline">Quick Start</Badge>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-purple-200"
                onClick={() => setSelectedAssessment("personality")}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Personality Profile</CardTitle>
                  <CardDescription>
                    Understand your work style, preferences, and ideal learning environment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>4-6 minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BarChart3 className="h-4 w-4" />
                      <span>Work style insights</span>
                    </div>
                  </div>
                  <Badge variant="outline">In-depth</Badge>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                For best results, we recommend taking all three assessments
              </p>
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    const recommendedStreams = getRecommendedStreams();
    
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Assessment Complete!
              </h1>
              <p className="text-gray-600">
                Here are your personalized results and recommendations
              </p>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Stream Compatibility</CardTitle>
                <CardDescription>
                  Based on your {selectedAssessment} assessment responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results && Object.entries(results).map(([stream, score]) => (
                    <div key={stream} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium capitalize">{stream}</span>
                        <span className="text-sm text-gray-600">{score}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Recommended Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedStreams.map(({ stream, score }, index) => (
                    <div key={stream} className="p-4 border rounded-lg bg-blue-50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold capitalize text-blue-900">
                          #{index + 1} {stream}
                        </h3>
                        <Badge variant="secondary">{score}% match</Badge>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">
                        {stream === 'science' && "Perfect for students interested in technology, research, and analytical thinking."}
                        {stream === 'commerce' && "Ideal for those passionate about business, economics, and entrepreneurship."}
                        {stream === 'arts' && "Great for students who love literature, history, and social sciences."}
                        {stream === 'vocational' && "Excellent for creative minds interested in practical skills and artistic expression."}
                      </p>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/careers?stream=${stream}`}>
                          Explore {stream} careers
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetAssessment} variant="outline">
                Take Another Assessment
              </Button>
              <Button onClick={() => navigate("/colleges")}>
                Find Colleges
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 capitalize">
                {selectedAssessment} Assessment
              </h1>
              <Badge variant="outline">
                Question {currentQuestionIndex + 1} of {questions.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          {currentQuestion && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {currentQuestion.question}
                </CardTitle>
                <CardDescription>
                  Select the option that best describes you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[currentQuestion.id] || ""}
 g                 onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={option} id={`${currentQuestion.id}-${index}`} />
                      <Label htmlFor={`${currentQuestion.id}-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!currentQuestion || !answers[currentQuestion.id]}
            >
              {currentQuestionIndex === questions.length - 1 ? "Complete" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Progress Info */}
          <div className="text-center mt-6 text-sm text-gray-600">
            <p>
              {Math.round(progress)}% complete • Estimated time remaining: {Math.max(1, questions.length - currentQuestionIndex - 1)} minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
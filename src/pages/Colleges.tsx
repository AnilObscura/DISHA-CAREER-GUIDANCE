import { useState, useMemo } from "react";
import {
  MapPin,
  Search,
  Star,
  BookOpen,
  Wifi,
  Building,
  Phone,
  Mail,
  Globe,
  ChevronRight,
  Heart,
  ExternalLink,
  FlaskConical,
  Hospital,
  Trophy,
  Landmark,
  Coffee,
  Microscope,
  Presentation,
  Laptop
} from "lucide-react";



import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";



// Mock data - in real app, this would come from the backend
const mockColleges = [
  {
    "id": "1",
    "name": "University of Kashmir",
    "location": "Srinagar",
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "type": "Government (State)",
    "establishedYear": 1948,
    "affiliation": "N/A",
    "courses": [
      {
        "name": "B.A. English Literature",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG: 150-200",
        "fees": "₹7,400-15,600"
      },
      {
        "name": "B.A. History",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG: 150-200",
        "fees": "₹7,400-15,600"
      },
      {
        "name": "B.A. Political Science",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG: 150-200",
        "fees": "₹7,400-15,600"
      },
      {
        "name": "B.A. Psychology",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG: 150-200",
        "fees": "₹7,400-15,600"
      },
      {
        "name": "B.A. Sociology",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG: 150-200",
        "fees": "₹7,400-15,600"
      },
      {
        "name": "B.A. Islamic Studies",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG: 150-200",
        "fees": "₹7,400-15,600"
      },
      {
        "name": "B.A. Kashmiri",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG: 150-200",
        "fees": "₹7,400-15,600"
      },
      {
        "name": "B.A. Urdu",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG: 150-200",
        "fees": "₹7,400-15,600"
      },
      {
        "name": "B.A. Arabic",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG: 150-200",
        "fees": "₹7,400-15,600"
      },
      {
        "name": "B.A. Persian",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG: 150-200",
        "fees": "₹7,400-15,600"
      },
      {
        "name": "B.Sc. Physics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "CUET UG: 160-210",
        "fees": "₹8,300-15,600"
      },
      {
        "name": "B.Sc. Chemistry",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "CUET UG: 160-210",
        "fees": "₹8,300-15,600"
      },
      {
        "name": "B.Sc. Mathematics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "CUET UG: 160-210",
        "fees": "₹8,300-15,600"
      },
      {
        "name": "B.Sc. Botany",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCB (45%)",
        "cutoff": "CUET UG: 160-210",
        "fees": "₹8,300-15,600"
      },
      {
        "name": "B.Sc. Zoology",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCB (45%)",
        "cutoff": "CUET UG: 160-210",
        "fees": "₹8,300-15,600"
      },
      {
        "name": "B.Sc. Geography",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 (45%)",
        "cutoff": "CUET UG: 160-210",
        "fees": "₹8,300-15,600"
      },
      {
        "name": "B.Sc. Geology",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "CUET UG: 160-210",
        "fees": "₹8,300-15,600"
      },
      {
        "name": "B.Sc. Electronics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "CUET UG: 160-210",
        "fees": "₹8,300-15,600"
      },
      {
        "name": "B.Sc. Computer Applications",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 (45%)",
        "cutoff": "CUET UG: 160-210",
        "fees": "₹8,300-15,600"
      },
      {
        "name": "B.Sc. Nano-Technology",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "CUET UG: 160-210",
        "fees": "₹8,300-15,600"
      },
      {
        "name": "B.Sc. Home Science",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 (45%)",
        "cutoff": "CUET UG: 160-210",
        "fees": "₹8,300-15,600"
      },
      {
        "name": "B.Com",
        "stream": "Commerce",
        "duration": "3 Years",
        "eligibility": "10+2 (45%)",
        "cutoff": "CUET UG: 155-205",
        "fees": "₹8,300-15,600"
      },
      {
        "name": "B.Tech Electronics & Communication",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "JEE Main: 50,000-80,000",
        "fees": "₹40,600-1.8L"
      }
    ],


    "facilities": ["Central Library", "Hostel (Boys/Girls)", "Sports Complex", "Medical Center", "Cafeteria", "Auditorium", "WiFi", "Labs", "Research Centers"],

    "contact": {
      "phone": "+91-194-2272041, +91-194-2272041",
      "email": "info@kashmiruniversity.net",
      "website": "https://www.kashmiruniversity.net",
      "address": "University of Kashmir, Hazratbal, Srinagar, Jammu and Kashmir 190006"
    },
    "rating": 3.7
  },

  {
    "id": "2",
    "name": "University of Jammu",
    "location": "Jammu",
    "city": "Jammu",
    "state": "Jammu and Kashmir",
    "type": "Government (State)",
    "establishedYear": 1969,
    "affiliation": "N/A",
    "courses": [
      {
        "name": "B.A. English",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,000-16,000"
      },
      {
        "name": "B.A. Hindi",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,000-16,000"
      },
      {
        "name": "B.A. History",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,000-16,000"
      },
      {
        "name": "B.A. Political Science",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,000-16,000"
      },
      {
        "name": "B.A. Economics",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,000-16,000"
      },
      {
        "name": "B.A. Geography",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,000-16,000"
      },
      {
        "name": "B.A. Dogri",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,000-16,000"
      },
      {
        "name": "B.A. Punjabi",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,000-16,000"
      },
      {
        "name": "B.A. Sanskrit",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (40%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,000-16,000"
      },
      {
        "name": "B.Sc. Physics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,500-16,000"
      },
      {
        "name": "B.Sc. Chemistry",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,500-16,000"
      },
      {
        "name": "B.Sc. Mathematics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,500-16,000"
      },
      {
        "name": "B.Sc. Botany",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCB (45%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,500-16,000"
      },
      {
        "name": "B.Sc. Zoology",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCB (45%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,500-16,000"
      },
      {
        "name": "B.Sc. Geology",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,500-16,000"
      },
      {
        "name": "B.Sc. Statistics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,500-16,000"
      },
      {
        "name": "B.Sc. Environmental Sciences",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 (45%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,500-16,000"
      },
      {
        "name": "B.Sc. Bio-Technology",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCB (45%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,500-16,000"
      },
      {
        "name": "B.Sc. Microbiology",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCB (45%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,500-16,000"
      },
      {
        "name": "B.Com",
        "stream": "Commerce",
        "duration": "3 Years",
        "eligibility": "10+2 (45%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,500-16,000"
      },
      {
        "name": "B.Com (Honours)",
        "stream": "Commerce",
        "duration": "3 Years",
        "eligibility": "10+2 (45%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹8,500-16,000"
      },
      {
        "name": "BCA",
        "stream": "Computer Applications",
        "duration": "3 Years",
        "eligibility": "10+2 (45%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹25,000-35,000"
      },
      {
        "name": "BBA",
        "stream": "Management",
        "duration": "3 Years",
        "eligibility": "10+2 (45%)",
        "cutoff": "CUET UG/Merit",
        "fees": "₹25,000-35,000"
      },
      {
        "name": "B.Tech Computer Science & Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "JEE Main/JKCET",
        "fees": "₹1.8L"
      },
      {
        "name": "B.Tech Information Technology",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "JEE Main/JKCET",
        "fees": "₹1.8L"
      },
      {
        "name": "B.Tech Civil Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "JEE Main/JKCET",
        "fees": "₹1.86L"
      },
      {
        "name": "B.Tech Mechanical Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "JEE Main/JKCET",
        "fees": "₹1.8L"
      },
      {
        "name": "LL.B",
        "stream": "Law",
        "duration": "3 Years",
        "eligibility": "Graduation (45%)",
        "cutoff": "CLAT/University Test",
        "fees": "₹25,000"
      },
      {
        "name": "BA LL.B",
        "stream": "Law",
        "duration": "5 Years",
        "eligibility": "10+2 (45%)",
        "cutoff": "CLAT/University Test",
        "fees": "₹25,000"
      }
    ],
    "facilities": ["Dhanvantri Library", "Multiple Hostels", "Sports Complex", "Medical Center", "Auditorium", "Computer Centers", "Research Labs", "Guest House"],
    "contact": {
      "phone": "0191-2435248, 2435259, 2453544, 2453588",
      "email": "helpdesk@jammuuniversity.ac.in",
      "website": "https://www.jammuuniversity.ac.in",
      "address": "Baba Saheb Ambedkar Road, Jammu, J&K, India - 180006",
    },
    "rating": null,
    "distance": null
  },
  {
    "id": "3",
    "name": "Indian Institute of Technology (IIT) Jammu",
    "location": "Jammu",
    "city": "Jammu",
    "state": "Jammu and Kashmir",
    "type": "Government (Central)",
    "establishedYear": 2016,
    "affiliation": "N/A",
    "courses": [
      {
        "name": "B.Tech Computer Science & Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Advanced: 5,988-18,156",
        "fees": "₹8.3L"
      },
      {
        "name": "B.Tech Chemical Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Advanced: 11,491-14,513",
        "fees": "₹8.3L"
      },
      {
        "name": "B.Tech Mechanical Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Advanced: 9,201-12,989",
        "fees": "₹8.3L"
      },
      {
        "name": "B.Tech Materials Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Advanced: 12,421-14,983",
        "fees": "₹8.3L"
      },
      {
        "name": "B.Tech Electrical Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Advanced: 6,960-9,988",
        "fees": "₹8.3L"
      },
      {
        "name": "B.Tech Civil Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Advanced: 11,504-14,700",
        "fees": "₹8.3L"
      },
      {
        "name": "M.Tech Computer Science & Engineering (Data Science)",
        "stream": "Engineering",
        "duration": "2 Years",
        "eligibility": "B.Tech (60%)",
        "cutoff": "GATE: 300-550",
        "fees": "₹1.03L"
      },
      {
        "name": "M.Tech Computer Science & Engineering (Information Security)",
        "stream": "Engineering",
        "duration": "2 Years",
        "eligibility": "B.Tech (60%)",
        "cutoff": "GATE: 300-550",
        "fees": "₹1.03L"
      },
      {
        "name": "M.Tech Electrical Engineering (Communications)",
        "stream": "Engineering",
        "duration": "2 Years",
        "eligibility": "B.Tech EE (60%)",
        "cutoff": "GATE: 300-550",
        "fees": "₹1.03L"
      },
      {
        "name": "M.Tech Civil Engineering (Tunnel Engineering)",
        "stream": "Engineering",
        "duration": "2 Years",
        "eligibility": "B.Tech CE (60%)",
        "cutoff": "GATE: 300-550",
        "fees": "₹1.03L"
      },
      {
        "name": "M.Sc. Physics",
        "stream": "Science",
        "duration": "2 Years",
        "eligibility": "B.Sc. Physics (60%)",
        "cutoff": "IIT JAM: 714-759",
        "fees": "₹49,300"
      },
      {
        "name": "M.Sc. Chemistry",
        "stream": "Science",
        "duration": "2 Years",
        "eligibility": "B.Sc. Chemistry (60%)",
        "cutoff": "IIT JAM: 714-759",
        "fees": "₹49,300"
      }
    ],
    "facilities": ["400 acres campus", "50+ Labs", "Modern Classrooms", "Library", "Hostels (AC)", "Sports Complex", "Medical Center", "24/7 Wi-Fi", "Instrumentation Facility"]
    ,
    "contact": {
      "phone": "0191-2570633",
      "email": "accounts@iitjammu.ac.in",
      "website": "https://www.iitjammu.ac.in",
      "address": "Jagti, NH-44, PO Nagrota, Jammu - 181221, J&K, India",
    },
    "rating": null,
    "distance": null
  },
  {
    "id": "4",
    "name": "National Institute of Technology (NIT) Srinagar",
    "location": "Srinagar",
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "type": "Government (Central)",
    "establishedYear": 1960,
    "affiliation": "N/A",
    "courses": [
      {
        "name": "B.Tech Computer Science & Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Main: 26,253",
        "fees": "₹6.03L"
      },
      {
        "name": "B.Tech Electronics & Communication",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Main: 36,676",
        "fees": "₹6.03L"
      },
      {
        "name": "B.Tech Information Technology",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Main: 30,958",
        "fees": "₹6.03L"
      },
      {
        "name": "B.Tech Electrical Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Main: 45,495",
        "fees": "₹6.03L"
      },
      {
        "name": "B.Tech Mechanical Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Main: 52,104",
        "fees": "₹6.03L"
      },
      {
        "name": "B.Tech Civil Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Main: 57,541",
        "fees": "₹6.03L"
      },
      {
        "name": "B.Tech Chemical Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Main: 56,504",
        "fees": "₹6.03L"
      },
      {
        "name": "B.Tech Metallurgical & Materials",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Main: 58,665",
        "fees": "₹6.03L"
      },
      {
        "name": "M.Tech Computer Science & Engineering",
        "stream": "Engineering",
        "duration": "2 Years",
        "eligibility": "B.Tech (60%)",
        "cutoff": "GATE: 350-529",
        "fees": "₹1.08L"
      },
      {
        "name": "M.Tech Structural Engineering",
        "stream": "Engineering",
        "duration": "2 Years",
        "eligibility": "B.Tech CE (60%)",
        "cutoff": "GATE: 350-529",
        "fees": "₹1.08L"
      },
      {
        "name": "M.Tech Microelectronics",
        "stream": "Engineering",
        "duration": "2 Years",
        "eligibility": "B.Tech ECE (60%)",
        "cutoff": "GATE: 350-529",
        "fees": "₹1.08L"
      },
      {
        "name": "M.Tech Water Resources Engineering",
        "stream": "Engineering",
        "duration": "2 Years",
        "eligibility": "B.Tech CE (60%)",
        "cutoff": "GATE: 350-529",
        "fees": "₹1.08L"
      },
      {
        "name": "M.Sc. Chemistry",
        "stream": "Science",
        "duration": "2 Years",
        "eligibility": "B.Sc. Chemistry (60%)",
        "cutoff": "IIT JAM",
        "fees": "₹1.2L"
      },
      {
        "name": "M.Sc. Physics",
        "stream": "Science",
        "duration": "2 Years",
        "eligibility": "B.Sc. Physics (60%)",
        "cutoff": "IIT JAM",
        "fees": "₹1.2L"
      },
      {
        "name": "MBA",
        "stream": "Management",
        "duration": "2 Years",
        "eligibility": "Graduation (60%)",
        "cutoff": "CAT",
        "fees": "₹5.4L"
      }
    ],
    "facilities": ["Dal Lake Campus", "Hostel (Boys/Girls)", "Central Library", "Labs", "Sports Complex", "Medical Center", "Guest House", "Shopping Complex", "Gym"]
    ,
    "contact": {
      "phone": "Contact through departments",
      "email": "deanstudentswelfare@nitsri.ac.in",
      "website": "https://nitsri.ac.in",
      "address": "Hazratbal, Srinagar, J&K, India - 190006",
    },
    "rating": null,
    "distance": null
  },
  {
    "id": "5",
    "name": "Shri Mata Vaishno Devi University (SMVDU)",
    "location": "Katra, Reasi",
    "city": "Katra",
    "state": "Jammu and Kashmir",
    "type": "Government (State)",
    "establishedYear": 1999,
    "affiliation": "N/A",
    "courses": [
      {
        "name": "B.Tech Computer Science & Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Main: 53,182-77,606",
        "fees": "₹5.28L"
      },
      {
        "name": "B.Tech Electronics & Communication",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Main: 53,182-87,372",
        "fees": "₹1.41L"
      },
      {
        "name": "B.Tech Mechanical Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Main: 53,182-91,814",
        "fees": "₹1.41L"
      },
      {
        "name": "B.Tech Electrical Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Main: 60,000-95,000",
        "fees": "₹1.41L"
      },
      {
        "name": "B.Tech Civil Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Main: 65,000-100,000",
        "fees": "₹1.41L"
      },
      {
        "name": "B.Tech Food Technology",
        "stream": "Engineering",
        "duration": "3 Years",
        "eligibility": "10+2 PCB (75%)",
        "cutoff": "CUET UG",
        "fees": "₹3.6L"
      },
      {
        "name": "B.Tech Robotics & AI",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (75%)",
        "cutoff": "JEE Main: 70,000-105,000",
        "fees": "₹1.41L"
      },
      {
        "name": "B.Arch",
        "stream": "Architecture",
        "duration": "5 Years",
        "eligibility": "10+2 PCM (50%)",
        "cutoff": "JEE Main/NATA: 1,200-3,000",
        "fees": "₹5.5L"
      },
      {
        "name": "B.Sc. Physics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (50%)",
        "cutoff": "CUET UG",
        "fees": "₹1.4L-1.6L"
      },
      {
        "name": "B.Sc. Chemistry",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (50%)",
        "cutoff": "CUET UG",
        "fees": "₹1.4L-1.6L"
      },
      {
        "name": "B.Sc. Mathematics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (50%)",
        "cutoff": "CUET UG",
        "fees": "₹1.4L-1.6L"
      },
      {
        "name": "B.Sc. Microbiology",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCB (50%)",
        "cutoff": "CUET UG",
        "fees": "₹1.4L-1.6L"
      },
      {
        "name": "BBA",
        "stream": "Management",
        "duration": "3 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹2.5L"
      },
      {
        "name": "B.A. English",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (45%)",
        "cutoff": "CUET UG",
        "fees": "₹1.4L-1.8L"
      },
      {
        "name": "B.A. Economics",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (45%)",
        "cutoff": "CUET UG",
        "fees": "₹1.4L-1.8L"
      },
      {
        "name": "Integrated M.Sc. Physics",
        "stream": "Science",
        "duration": "5 Years",
        "eligibility": "10+2 PCM (50%)",
        "cutoff": "CUET UG",
        "fees": "₹2.66L"
      },
      {
        "name": "Integrated M.Sc. Mathematics",
        "stream": "Science",
        "duration": "5 Years",
        "eligibility": "10+2 PCM (50%)",
        "cutoff": "CUET UG",
        "fees": "₹2.66L"
      }
    ],
    "facilities": ["470-acre residential campus", "Modern Labs", "Library", "Hostels", "Sports Complex", "Medical Center", "Cafeteria", "Auditorium", "Wi-Fi", "Research Centers"]
    ,
    "contact": {
      "phone": "01991-285524",
      "email": "info@smvdu.ac.in",
      "website": "https://smvdu.ac.in",
      "address": "Sub Post Office - Kakryal, Katra, Reasi, J&K - 182320",
    },
    "rating": null,
    "distance": null
  },
  {
    "id": "6",
    "name": "Islamic University of Science and Technology (IUST)",
    "location": "Awantipora, Pulwama",
    "city": "Pulwama",
    "state": "Jammu and Kashmir",
    "type": "Government (State)",
    "establishedYear": "N/A",
    "affiliation": "N/A",
    "courses": [
      {
        "name": "B.Tech Computer Science & Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "JEE Main: State Quota",
        "fees": "₹2.48L"
      },
      {
        "name": "B.Tech Civil Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "JEE Main: State Quota",
        "fees": "₹1.8L-2.5L"
      },
      {
        "name": "B.Tech Electrical Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "JEE Main: State Quota",
        "fees": "₹1.8L-2.5L"
      },
      {
        "name": "B.Tech Mechanical Engineering",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "JEE Main: State Quota",
        "fees": "₹1.8L-2.5L"
      },
      {
        "name": "B.Tech Electronics & Communication",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "JEE Main: State Quota",
        "fees": "₹1.8L-2.5L"
      },
      {
        "name": "B.Tech Food Technology",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCB (45%)",
        "cutoff": "CUET UG",
        "fees": "₹1.8L-2.5L"
      },
      {
        "name": "B.Tech Robotics & Automation",
        "stream": "Engineering",
        "duration": "4 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "JEE Main: State Quota",
        "fees": "₹1.8L-2.5L"
      },
      {
        "name": "B.Sc. Physics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "CUET UG",
        "fees": "₹1.2L-2.8L"
      },
      {
        "name": "B.Sc. Chemistry",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "CUET UG",
        "fees": "₹1.2L-2.8L"
      },
      {
        "name": "B.Sc. Mathematics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (45%)",
        "cutoff": "CUET UG",
        "fees": "₹1.2L-2.8L"
      },
      {
        "name": "B.Sc. Environmental Science",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 (45%)",
        "cutoff": "CUET UG",
        "fees": "₹1.2L-2.8L"
      },
      {
        "name": "BBA",
        "stream": "Management",
        "duration": "3 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹2.7L"
      }
    ],
    "facilities": ["Modern Campus", "Engineering Labs", "Library", "Hostels", "Sports Facilities", "Medical Center", "Mosque", "Computer Centers"]
    ,
    "contact": {
      "phone": "01933-247955",
      "email": "info@islamicuniversity.edu.in",
      "website": "https://www.islamicuniversity.edu.in",
      "address": "Awantipora, Pulwama, J&K - 192122",
    },
    "rating": null,
    "distance": null
  },
  {
    "id": "7",
    "name": "Central University of Jammu",
    "location": "Jammu",
    "city": "Jammu",
    "state": "Jammu and Kashmir",
    "type": "Government (Central)",
    "establishedYear": "N/A",
    "affiliation": "N/A",
    "courses": [
      {
        "name": "B.A. English",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.A. Hindi",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.A. Economics",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.Sc. Physics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.Sc. Chemistry",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.Sc. Mathematics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.Sc. Botany",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCB (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.Sc. Zoology",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCB (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "Integrated B.Sc.-M.Sc. Physics",
        "stream": "Science",
        "duration": "5 Years",
        "eligibility": "10+2 PCM (50%)",
        "cutoff": "CUET UG",
        "fees": "₹48,790"
      },
      {
        "name": "Integrated B.Sc.-M.Sc. Chemistry",
        "stream": "Science",
        "duration": "5 Years",
        "eligibility": "10+2 PCM (50%)",
        "cutoff": "CUET UG",
        "fees": "₹48,790"
      },
      {
        "name": "Integrated B.Sc.-M.Sc. Zoology",
        "stream": "Science",
        "duration": "5 Years",
        "eligibility": "10+2 PCB (50%)",
        "cutoff": "CUET UG",
        "fees": "₹1.06L"
      },
      {
        "name": "Integrated B.A.-B.Ed",
        "stream": "Education",
        "duration": "4 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹48,790"
      },
      {
        "name": "MBA",
        "stream": "Management",
        "duration": "2 Years",
        "eligibility": "Graduation (50%)",
        "cutoff": "CAT/CMAT",
        "fees": "₹5.49L"
      }
    ],
    "facilities": ["610-acre campus", "Central Library", "Wi-Fi", "ICT Labs", "Seminar Hall", "Canteen", "Hostels", "Sports Facilities"]
    ,
    "contact": {
      "phone": "01992-269144",
      "email": "info@cujammu.ac.in",
      "website": "https://www.cujammu.ac.in",
      "address": "Rahya-Suchani, Bagla, Samba, J&K - 181143",
    },
    "rating": null,
    "distance": null
  },
  {
    "id": "8",
    "name": "Central University of Kashmir",
    "location": "Srinagar",
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "type": "Government (Central)",
    "establishedYear": "N/A",
    "affiliation": "N/A",
    "courses": [
      {
        "name": "B.A. English Literature",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.A. Geography",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.A. History",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.A. Political Science",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.A. Psychology",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.A. Kashmiri Literature",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.A. Urdu Literature",
        "stream": "Arts",
        "duration": "3 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.Sc. Physics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.Sc. Mathematics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.Sc. Electronics",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 PCM (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.Sc. Computer Applications",
        "stream": "Science",
        "duration": "3 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "B.Com",
        "stream": "Commerce",
        "duration": "3 Years",
        "eligibility": "10+2 (50%)",
        "cutoff": "CUET UG",
        "fees": "₹15,000-25,000"
      },
      {
        "name": "M.A. English",
        "stream": "Arts",
        "duration": "2 Years",
        "eligibility": "Graduation (50%)",
        "cutoff": "CUET PG",
        "fees": "₹20,000-40,000"
      },
      {
        "name": "M.A. Convergent Journalism",
        "stream": "Arts",
        "duration": "2 Years",
        "eligibility": "Graduation (50%)",
        "cutoff": "CUET PG",
        "fees": "₹20,000-40,000"
      },
      {
        "name": "M.Tech Computer Science & Engineering",
        "stream": "Engineering",
        "duration": "2 Years",
        "eligibility": "B.Tech CSE (55%)",
        "cutoff": "GATE",
        "fees": "₹1.69L"
      }
    ],
    "facilities": ["Modern Campus", "Library", "Labs", "Hostels", "Sports Complex", "Medical Center", "Auditorium", "Wi-Fi"]
    ,
    "contact": {
      "phone": "01933-247956",
      "email": "info@cukashmir.ac.in",
      "website": "https://www.cukashmir.ac.in",
      "address": "Nowgam, Srinagar, J&K - 190015",
    },
    "rating": null,
    "distance": null
  },
  {
    "id": "9",
    "name": "All India Institute of Medical Sciences (AIIMS) Jammu, Vijaypur",
    "location": "Vijaypur, Samba",
    "city": "Jammu",
    "state": "Jammu and Kashmir",
    "type": "Government (Central)",
    "establishedYear": 2021,
    "affiliation": "N/A",
    "courses": [
      {
        "name": "MBBS",
        "stream": "Medical",
        "duration": "5.5 Years",
        "eligibility": "10+2 PCB (50%)",
        "cutoff": "NEET UG: 3,389 rank",
        "fees": "₹29,280"
      },
      {
        "name": "B.Sc. (Hons.) Nursing",
        "stream": "Nursing",
        "duration": "4 Years",
        "eligibility": "10+2 PCB (45%)",
        "cutoff": "NEET UG: 1,600 rank",
        "fees": "₹6,365"
      },
      {
        "name": "M.D. General Medicine",
        "stream": "Medical",
        "duration": "3 Years",
        "eligibility": "MBBS (55%)",
        "cutoff": "INI-CET: 518-29,603",
        "fees": "₹5,111"
      },
      {
        "name": "M.D. Pediatrics",
        "stream": "Medical",
        "duration": "3 Years",
        "eligibility": "MBBS (55%)",
        "cutoff": "INI-CET: 518-29,603",
        "fees": "₹5,111"
      },
      {
        "name": "M.D. Anaesthesia",
        "stream": "Medical",
        "duration": "3 Years",
        "eligibility": "MBBS (55%)",
        "cutoff": "INI-CET",
        "fees": "₹5,111"
      },
      {
        "name": "M.S. General Surgery",
        "stream": "Medical",
        "duration": "3 Years",
        "eligibility": "MBBS (55%)",
        "cutoff": "INI-CET",
        "fees": "₹5,111"
      },
      {
        "name": "M.S. Orthopedics",
        "stream": "Medical",
        "duration": "3 Years",
        "eligibility": "MBBS (55%)",
        "cutoff": "INI-CET",
        "fees": "₹5,111"
      },
      {
        "name": "DM Cardiology",
        "stream": "Medical",
        "duration": "3 Years",
        "eligibility": "MD/MS (55%)",
        "cutoff": "INI-CET",
        "fees": "₹5,111"
      },
      {
        "name": "M.Ch. Neurosurgery",
        "stream": "Medical",
        "duration": "3 Years",
        "eligibility": "MD/MS (55%)",
        "cutoff": "INI-CET",
        "fees": "₹5,111"
      }
    ],
    "facilities": ["Medical Facilities", "Modern Labs", "Library", "Hostels", "Research Centers", "Digital Healthcare"]
    ,
    "contact": {
      "phone": "9541928215 (OPD Helpdesk)",
      "email": "website@aiimsjammu.edu.in",
      "website": "https://www.aiimsjammu.edu.in",
      "address": "Bari Kamlia, Vijaypur, Samba, J&K - 184120",
    },
    "rating": null,
    "distance": null
  },

  {
    "id": "10",
    "name": "Indian Institute of Management (IIM) Jammu",
    "location": "Jagti, Jammu",
    "city": "Jammu",
    "state": "Jammu and Kashmir",
    "type": "Government (Central)",
    "establishedYear": 2016,
    "affiliation": "N/A",
    "courses": [
      {
        "name": "MBA General Management",
        "stream": "Management",
        "duration": "2 Years",
        "eligibility": "Graduation (50%)",
        "cutoff": "CAT: 95 percentile",
        "fees": "₹20.88L"
      },
      {
        "name": "MBA Business Analytics",
        "stream": "Management",
        "duration": "2 Years",
        "eligibility": "Graduation (50%)",
        "cutoff": "CAT: 95 percentile",
        "fees": "₹20.94L"
      },
      {
        "name": "Executive MBA",
        "stream": "Management",
        "duration": "2 Years",
        "eligibility": "Graduation + 5 yrs exp",
        "cutoff": "CAT / Work Experience",
        "fees": "₹11.12L"
      },
      {
        "name": "IPM (Integrated BBA+MBA)",
        "stream": "Management",
        "duration": "5 Years",
        "eligibility": "10+2 (60%)",
        "cutoff": "JIPMAT",
        "fees": "₹30.79L"
      },
      {
        "name": "Ph.D. Management",
        "stream": "Research",
        "duration": "3-5 Years",
        "eligibility": "Master's (55%)",
        "cutoff": "Written Test / Interview",
        "fees": "₹1.8L"
      }
    ],
    "facilities": [
      "200-acre permanent campus",
      "Modern Classrooms",
      "Library",
      "Computer Center",
      "Hostels",
      "Sports Complex",
      "Auditorium"
    ],
    "contact": {
      "phone": "0191-2741400 (Main Campus)",
      "email": "admissions@iimj.ac.in",
      "website": "https://www.iimj.ac.in",
      "address": "Jagti, Jammu - 181221, J&K, India"
    },
    "rating": null,
    "distance": null
  }




];

export default function Colleges() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStream, setSelectedStream] = useState("all");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const allStates = [...new Set(mockColleges.map(college => college.state))];
  const allTypes = [...new Set(mockColleges.map(college => college.type))];
  const allStreams = [...new Set(mockColleges.flatMap(college => college.courses.map(course => course.stream)))];
  const allFacilities = [...new Set(mockColleges.flatMap(college => college.facilities))] as string[];

  const filteredColleges = useMemo(() => {
    const filtered = mockColleges.filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === "all" || college.state === selectedState;
      const matchesType = selectedType === "all" ||
        college.type.toLowerCase() === selectedType.toLowerCase() ||
        (selectedType.toLowerCase().includes("government") &&
         college.type.toLowerCase().includes("government")) ||
        (selectedType.toLowerCase().includes("state") &&
         college.type.toLowerCase().includes("state")) ||
        (selectedType.toLowerCase().includes("central") &&
         college.type.toLowerCase().includes("central"));
      const matchesStream = selectedStream === "all" ||
        college.courses.some(course => course.stream === selectedStream);
      const matchesFacilities = selectedFacilities.length === 0 ||
        selectedFacilities.every(facility => college.facilities.includes(facility));

      return matchesSearch && matchesState && matchesType && matchesStream && matchesFacilities;
    });

    // Sort colleges
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          const aRating = a.rating || 0;
          const bRating = b.rating || 0;
          return bRating - aRating;
        case "name":
          return a.name.localeCompare(b.name);
        case "established":
          const aYear = typeof a.establishedYear === 'number' ? a.establishedYear : 0;
          const bYear = typeof b.establishedYear === 'number' ? b.establishedYear : 0;
          return bYear - aYear;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedState, selectedType, selectedStream, selectedFacilities, sortBy]);

  const handleFacilityToggle = (facility: string) => {
    setSelectedFacilities(prev =>
      prev.includes(facility)
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedState("all");
    setSelectedStream("all");
    setSelectedFacilities([]);
    setSortBy("rating");
  };

  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case "library": case "digital library": case "central library": case "dhanvantri library": case "libraries":
        return <BookOpen className="h-4 w-4" />;
      case "hostel": case "boys hostel": case "girls hostel": case "hostel (boys/girls)": case "2 girls hostels": case "8 boys hostels": case "hostels": case "hostels(ac)": case "limited hostels": case "multiple hostels": case "guest house":
        return <Building className="h-4 w-4" />;
      case "wifi": case "24/7 wi-fi": case "wi-fi":
        return <Wifi className="h-4 w-4" />;
      case "computer lab": case "innovation center": case "computer center": case "computer centers": case "computer labs": case "ict labs":
        return <Laptop className="h-4 w-4" />;
      case "labs": case "50+ labs": case "agricultural labs": case "basic labs": case "engineering labs": case "labs": case "modern labs": case "nursing labs": case "research labs": case "central instrumentation facility:":
        return <FlaskConical className="h-4 w-4" />;
      case "medical facilities": case "health center": case "medical center": case "associated hospitals": case "clinical training": case "clinical facilities": case "digital healthcare": case "hospital attached": case "hospital attachment":
      case "medical center": case "medical equipment": case "medical labs": case "medical unit": case "modern medical equipment": case "state-of-art medical facilities": case "super specialty hospital": case "super specialty services":
      case "veterinary hospital": case "cardiology center":
        return <Hospital className="h-4 w-4" />;
      case "sports complex": case "sports facilities": case "gym": case "sports ground":
        return <Trophy className="h-4 w-4" />;
      case "cafeteria": case "food court": case "dining hall": case "canteen": case "mess":
        return <Coffee className="h-4 w-4" />;
      case "research centers": case "research facilities": case "research lab": case "research": case "research farms":
        return <Microscope className="h-4 w-4" />;
      case "auditorium": case "conference hall": case "seminar hall": case "amphitheater": case "auditorium/seminar hall": case "auditorium/conference hall": case "hall": case "conference halls": case "workshops":
        return <Landmark className="h-4 w-4" />;
      case "modern classrooms": case "basic facilities - classrooms":
        return <Presentation className="h-4 w-4" />;
      case "200-acre permanent campus": case "227-acre main campus": case "400 acres campus": case "470-acre residential campus": case "610-acre campus": case "dal lake campus": case "modern campus": case "modern classrooms": case "multiple campuses":
      case "experimental farms": case "shopping complex": case "mosque":
        return <Star className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const CollegeCard = ({ college }: { college: typeof mockColleges[0] }) => {
    const handleOpenWebsite = () => {
      const website = (college.contact as any)?.website;
      if (website) {
        window.open(website.startsWith('http') ? website : `https://${website}`, '_blank', 'noopener,noreferrer');
      } else {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(college.name + ' contact details')}`, '_blank', 'noopener,noreferrer');
      }
    };

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2">{college.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4" />
                {college.location}, {college.city}, {college.state}
              </CardDescription>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Est. {college.establishedYear || 'N/A'}</span>
                <Badge variant="outline">{college.type}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{college.rating || 'N/A'}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="courses">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-3 mt-4">
              {college.courses.slice(0, 2).map((course, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{course.name}</h4>
                    <Badge variant="secondary" className="text-xs">{course.stream}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <span>Duration: {course.duration}</span>
                    <span>Fees: ₹{course.fees.toLocaleString()}/year</span>
                    <span>Eligibility: {course.eligibility}</span>
                    <span>Cutoff: {course.cutoff}%</span>
                  </div>
                </div>
              ))}
              {college.courses.length > 2 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full">
                      View {college.courses.length - 2} more courses
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>All Courses at {college.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      {college.courses.map((course, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold text-lg">{course.name}</h4>
                            <Badge variant="secondary">{course.stream}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Duration:</span> {course.duration}
                            </div>
                            <div>
                              <span className="font-medium">Fees:</span> ₹{course.fees.toLocaleString()}/year
                            </div>
                            <div>
                              <span className="font-medium">Eligibility:</span> {course.eligibility}
                            </div>
                            <div>
                              <span className="font-medium">Cutoff:</span> {course.cutoff}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </TabsContent>

            <TabsContent value="facilities" className="mt-4">
              <div className="grid grid-cols-2 gap-2">
                {college.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    {getFacilityIcon(facility)}
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/*Contact Tab */}

            <TabsContent value="contact" className="space-y-3 mt-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{(college.contact as any)?.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{(college.contact as any)?.email || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  {(college.contact as any)?.website ? (
                    <a
                      href={(college.contact as any).website.startsWith('http') ? (college.contact as any).website : `https://${(college.contact as any).website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {(college.contact as any).website}
                    </a>
                  ) : (
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(college.name + ' contact details')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Search on Google
                    </a>
                  )}
                </div>

              </div>
              <div className="mt-4">
                <Button
                  className="w-full"
                  onClick={handleOpenWebsite}
                >
                  Contact Us
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              className="flex-1 min-w-[120px]"
              onClick={handleOpenWebsite}
            >
              Apply Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="flex-1 min-w-[120px]"
              onClick={handleOpenWebsite}
            >
              View Details
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Government Colleges Directory
          </h1>
          <p className="text-gray-600">
            Find the perfect government college near you with detailed course information and facilities
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Filters</CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label className="text-sm font-medium">Search</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="College name or city..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Separator />

                {/* State Filter */}
                <div>
                  <Label className="text-sm font-medium">State</Label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {allStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Type Filter */}
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {allTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Stream Filter */}
                <div>
                  <Label className="text-sm font-medium">Stream</Label>
                  <Select value={selectedStream} onValueChange={setSelectedStream}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select stream" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Streams</SelectItem>
                      {allStreams.map(stream => (
                        <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Facilities Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Facilities</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {allFacilities.map(facility => (
                      <div key={facility} className="flex items-center space-x-2">
                        <Checkbox
                          id={facility}
                          checked={selectedFacilities.includes(facility)}
                          onCheckedChange={() => handleFacilityToggle(facility)}
                        />
                        <Label htmlFor={facility} className="text-sm">
                          {facility}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {filteredColleges.length} Colleges Found
                </h2>
                <p className="text-gray-600">
                  Showing government colleges matching your criteria
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="established">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>





            {filteredColleges.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="space-y-4">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No colleges found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your filters to see more results
                    </p>
                  </div>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredColleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredColleges.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline">
                  Load More Colleges
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
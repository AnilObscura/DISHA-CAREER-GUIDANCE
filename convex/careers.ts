// convex/careers.ts

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// --- Higher Education Data ---
// This data is now defined separately for better organization.
const higherEducationOptions = {
  "B.Tech in Artificial Intelligence & Data Science": [
    { course: "M.Tech/MS in AI or Data Science", eligibility: "B.Tech Graduate", entranceExams: ["GATE"] },
    { course: "MBA (Tech Management)", eligibility: "B.Tech Graduate", entranceExams: ["CAT", "XAT"] },
  ],
  "B.Sc in Artificial Intelligence & Data Science": [
    { course: "M.Sc in AI/Data Science", eligibility: "B.Sc Graduate", entranceExams: ["University Entrance"] },
    { course: "MBA (Data Analytics)", eligibility: "B.Sc Graduate", entranceExams: ["CAT"] },
  ],
  "B.Tech in Computer Science (Cybersecurity)": [
    { course: "M.Tech/MS in Cybersecurity", eligibility: "B.Tech Graduate", entranceExams: ["GATE"] },
  ],
  "B.Tech in Computer Science (IoT)": [
    { course: "M.Tech/MS in IoT or Embedded Systems", eligibility: "B.Tech Graduate", entranceExams: ["GATE"] },
  ],
  "B.Tech in Computer Science (Blockchain)": [
    { course: "M.Tech/MS in Blockchain or Cryptography", eligibility: "B.Tech Graduate", entranceExams: ["GATE"] },
  ],
  "B.Tech in Computer Science (Cloud Computing)": [
    { course: "M.Tech/MS in Cloud Computing", eligibility: "B.Tech Graduate", entranceExams: ["GATE"] },
  ],
  "B.Sc in Data Analytics": [
    { course: "M.Sc in Data Science", eligibility: "B.Sc Graduate", entranceExams: ["University Entrance"] },
    { course: "MBA (Business Analytics)", eligibility: "B.Sc Graduate", entranceExams: ["CAT"] },
  ],
  "MCA in Artificial Intelligence & Machine Learning": [
    { course: "Ph.D. in AI/ML or Data Science", eligibility: "MCA Graduate", entranceExams: ["University Entrance"] },
  ],
  "BBA (General)": [
    { course: "MBA or PGDM", eligibility: "BBA Graduate", entranceExams: ["CAT", "XAT", "CMAT"] },
    { course: "LLB", eligibility: "BBA Graduate", entranceExams: ["CLAT"] },
  ],
  "MBA (Master of Business Administration)": [
    { course: "DBA (Doctor of Business Administration) or Ph.D.", eligibility: "MBA Graduate", entranceExams: ["University Entrance"] },
  ],
  "CA (Chartered Accountant)": [
    { course: "MBA (Finance/Analytics)", eligibility: "CA Qualified", entranceExams: ["CAT", "GMAT"] },
    { course: "CFA", eligibility: "CA Qualified", entranceExams: [] },
  ],
  "MBBS (Bachelor of Medicine & Bachelor of Surgery)": [
    { course: "MD/MS (Specialization)", eligibility: "MBBS", entranceExams: ["NEET-PG"] },
    { course: "DM/MCh (Super-specialty)", eligibility: "MD/MS", entranceExams: ["NEET-SS"] },
  ],
  "BDS (Bachelor of Dental Surgery)": [
    { course: "MDS (Master of Dental Surgery)", eligibility: "BDS", entranceExams: ["NEET-MDS"] },
  ],
  "B.Pharm (Bachelor of Pharmacy)": [
    { course: "M.Pharm", eligibility: "B.Pharm", entranceExams: ["GPAT"] },
    { course: "MBA (Pharma Management)", eligibility: "B.Pharm", entranceExams: ["CAT", "NMAT"] },
  ],
  "B.Sc Nursing": [
    { course: "M.Sc Nursing", eligibility: "B.Sc Nursing", entranceExams: ["AIIMS M.Sc Nursing Entrance"] },
    { course: "MBA Healthcare", eligibility: "B.Sc Nursing", entranceExams: ["CAT"] },
  ],
  "BPT (Bachelor of Physiotherapy)": [
    { course: "MPT (Master of Physiotherapy)", eligibility: "BPT", entranceExams: ["University Entrance"] },
  ],
  "B.Sc Biotechnology": [
    { course: "M.Sc Biotechnology", eligibility: "B.Sc Biotech", entranceExams: ["IIT-JAM", "CUET-PG"] },
    { course: "M.Tech Biotech", eligibility: "B.Sc Biotech", entranceExams: ["GATE"] },
  ],
  "LLB (Law)": [
      { course: "LLM", eligibility: "LLB Graduate", entranceExams: ["CLAT-PG", "AILET", "LSAT"] }
  ],
  "B.Ed (Bachelor of Education)": [
      { course: "M.Ed (Master of Education)", eligibility: "B.Ed Graduate", entranceExams: ["University Entrance"] }
  ],
  "B.Arch (Bachelor of Architecture)": [
      { course: "M.Arch", eligibility: "B.Arch", entranceExams: ["GATE", "CEED"] }
  ],
  "UPSC (Civil Services Exam)": [], // No direct higher education path listed
};


// --- Main Career Data Array ---
// This array now references the higherEducationOptions constant.
const careerPathsData = [
  {
    courseName: "B.Tech in Artificial Intelligence & Data Science",
    stream: "Engineering",
    duration: "4 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "Class 11-12 with Physics, Mathematics, and Chemistry/Computer Science. Min 50-60%.",
    description: "A career in AI & DS opens doors to cutting-edge fields like machine learning, big data, deep learning, and generative AI. Graduates can work in tech giants, research labs, or AI-driven startups solving real-world problems.",
    careerOptions: [
      { title: "Data Analyst / ML Engineer", description: "Entry-level role analyzing data and building basic machine learning models.", averageSalary: "₹4-7 LPA", growthProspects: "High" },
      { title: "Data Scientist / AI Engineer", description: "Mid-level role developing complex AI models and data-driven solutions.", averageSalary: "₹10-25 LPA", growthProspects: "Excellent" },
      { title: "AI Architect / Research Scientist", description: "Senior role designing large-scale AI systems and leading research initiatives.", averageSalary: "₹30-60 LPA+", growthProspects: "Outstanding" },
    ],
    higherEducation: higherEducationOptions["B.Tech in Artificial Intelligence & Data Science"],
    governmentExams: ["GATE", "DRDO", "ISRO", "NIC"],
    skillsRequired: ["Python", "R", "SQL", "Data Structures", "Machine Learning", "Deep Learning", "NLP", "Problem-solving"],
    industryDemand: "high",
    demand_score: 10,
    risk_score: 2,
  },
  {
    courseName: "B.Sc in Artificial Intelligence & Data Science",
    stream: "Science",
    duration: "3 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "Class 12 with Mathematics (mandatory) + Physics/Computer Science.",
    description: "This 3-year program provides a strong foundation in AI, ML, and data analytics, preparing for roles like data analyst or serving as a stepping stone for an M.Sc or MS.",
    careerOptions: [
      { title: "Data Analyst / AI Programmer", description: "Entry-level role for data analysis and programming AI modules.", averageSalary: "₹3-6 LPA", growthProspects: "Good" },
      { title: "Data Scientist / AI Specialist", description: "Mid-level role for deeper data insights and specialization in AI tools.", averageSalary: "₹8-18 LPA", growthProspects: "Very Good" },
    ],
    higherEducation: higherEducationOptions["B.Sc in Artificial Intelligence & Data Science"],
    governmentExams: ["GATE (for M.Tech)", "UPSC", "PSU recruitments"],
    skillsRequired: ["Python", "R", "SQL", "Statistics", "Machine Learning", "Deep Learning", "Critical thinking"],
    industryDemand: "high",
    demand_score: 9,
    risk_score: 3,
  },
  {
    courseName: "B.Tech in Computer Science (Cybersecurity)",
    stream: "Engineering",
    duration: "4 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "Class 11-12 with Physics, Mathematics, and Chemistry/Computer Science.",
    description: "Cybersecurity is a high-demand tech career focused on protecting organizations from cybercrime and digital threats, making it a future-proof and high-paying field.",
    careerOptions: [
      { title: "Cybersecurity Analyst / SOC Analyst", description: "Entry-level role monitoring for security threats.", averageSalary: "₹4-8 LPA", growthProspects: "Excellent" },
      { title: "Ethical Hacker / Security Consultant", description: "Mid-level role focused on penetration testing and advising companies.", averageSalary: "₹10-25 LPA", growthProspects: "Outstanding" },
      { title: "CISO / Cybersecurity Architect", description: "Senior role responsible for an organization's security strategy.", averageSalary: "₹30-60 LPA+", growthProspects: "Leadership" },
    ],
    higherEducation: higherEducationOptions["B.Tech in Computer Science (Cybersecurity)"],
    governmentExams: ["DRDO", "CERT-IN", "NIC", "Defense Cybersecurity"],
    skillsRequired: ["Networking", "Linux", "Python", "Cryptography", "Ethical Hacking", "Malware Analysis", "Problem-solving"],
    industryDemand: "high",
    demand_score: 10,
    risk_score: 2,
  },
  {
    courseName: "B.Tech in Computer Science (IoT)",
    stream: "Engineering",
    duration: "4 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "Class 11-12 with Physics, Mathematics, and Chemistry/Computer Science/Electronics.",
    description: "A career in IoT connects the physical and digital world through smart devices and connected systems, with applications in smart cities, autonomous vehicles, and industrial automation.",
    careerOptions: [
      { title: "IoT Developer / Embedded Engineer", description: "Entry-level role developing firmware and software for IoT devices.", averageSalary: "₹3.5-7 LPA", growthProspects: "Very Good" },
      { title: "IoT Solutions Architect / Cloud IoT Engineer", description: "Mid-level role designing and implementing large-scale IoT solutions.", averageSalary: "₹10-20 LPA", growthProspects: "Excellent" },
    ],
    higherEducation: higherEducationOptions["B.Tech in Computer Science (IoT)"],
    governmentExams: ["ISRO", "DRDO", "PSUs (after GATE)"],
    skillsRequired: ["Python", "C/C++", "Embedded C", "Arduino", "Raspberry Pi", "Cloud IoT platforms", "Networking"],
    industryDemand: "high",
    demand_score: 9,
    risk_score: 3,
  },
  {
    courseName: "B.Tech in Computer Science (Blockchain)",
    stream: "Engineering",
    duration: "4 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "Class 11-12 with Physics, Mathematics, and Chemistry/Computer Science.",
    description: "This field powers cryptocurrencies, smart contracts, and secure digital transactions. It's a futuristic and high-paying domain with roles like Blockchain Developer and Web3 Architect.",
    careerOptions: [
      { title: "Blockchain Developer / Smart Contract Engineer", description: "Entry-level role developing decentralized applications (DApps) and smart contracts.", averageSalary: "₹5-9 LPA", growthProspects: "Excellent" },
      { title: "Blockchain Architect / Web3 Developer", description: "Mid-level role designing blockchain solutions and building Web3 infrastructure.", averageSalary: "₹12-25 LPA", growthProspects: "Outstanding" },
    ],
    higherEducation: higherEducationOptions["B.Tech in Computer Science (Blockchain)"],
    governmentExams: ["NIC", "RBI", "Digital India projects"],
    skillsRequired: ["Solidity", "Ethereum", "Hyperledger", "Smart Contracts", "Cryptography", "Node.js", "Web3.js"],
    industryDemand: "high",
    demand_score: 9,
    risk_score: 4,
  },
  {
    courseName: "B.Tech in Computer Science (Cloud Computing)",
    stream: "Engineering",
    duration: "4 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "Class 11-12 with Physics, Mathematics, and Chemistry/Computer Science.",
    description: "Cloud computing powers the digital backbone of modern businesses. This is one of the highest-demand and recession-proof careers globally.",
    careerOptions: [
      { title: "Cloud Support Engineer / DevOps Engineer", description: "Entry-level role managing cloud infrastructure and automating deployments.", averageSalary: "₹4-8 LPA", growthProspects: "Excellent" },
      { title: "Cloud Solutions Architect / Cloud Security Engineer", description: "Mid-level role designing secure, scalable cloud architectures.", averageSalary: "₹12-25 LPA", growthProspects: "Outstanding" },
    ],
    higherEducation: higherEducationOptions["B.Tech in Computer Science (Cloud Computing)"],
    governmentExams: ["NIC", "Digital India", "PSUs (via GATE)"],
    skillsRequired: ["Python", "Java", "Linux", "Networking", "Virtualization", "AWS", "Azure", "GCP", "Kubernetes", "Docker"],
    industryDemand: "high",
    demand_score: 10,
    risk_score: 2,
  },
  {
    courseName: "B.Sc in Data Analytics",
    stream: "Science",
    duration: "3 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "Class 12 with Mathematics (mandatory) + Statistics/Computer Science.",
    description: "A 3-year degree preparing students to work with large datasets, statistical models, and business intelligence tools for careers in IT, finance, and e-commerce.",
    careerOptions: [
      { title: "Data Analyst / Business Analyst", description: "Entry-level role focused on analyzing data to provide business insights.", averageSalary: "₹3-6 LPA", growthProspects: "Very Good" },
      { title: "Data Scientist / BI Specialist", description: "Mid-level role involving predictive modeling and creating business intelligence dashboards.", averageSalary: "₹8-15 LPA", growthProspects: "Excellent" },
    ],
    higherEducation: higherEducationOptions["B.Sc in Data Analytics"],
    governmentExams: ["NIC", "PSUs", "RBI", "SEBI"],
    skillsRequired: ["Python", "R", "SQL", "Excel", "Statistics", "Machine Learning basics", "Tableau", "Power BI"],
    industryDemand: "high",
    demand_score: 9,
    risk_score: 3,
  },
  {
    courseName: "MCA in Artificial Intelligence & Machine Learning",
    stream: "Postgraduate",
    duration: "2 years",
    eligibilityFilter: "UG",
    eligibilityDisplay: "BCA, B.Sc (CS/IT), B.Tech (CS/IT), or equivalent degree.",
    description: "A postgraduate specialization for advanced expertise in AI algorithms, neural networks, and deep learning. One of the most future-proof and high-paying careers.",
    careerOptions: [
      { title: "AI Engineer / ML Developer", description: "Entry-level role after MCA focused on developing and deploying AI/ML models.", averageSalary: "₹6-10 LPA", growthProspects: "Excellent" },
      { title: "ML Specialist / AI Architect", description: "Mid-level role designing complex AI systems and specializing in areas like NLP or Computer Vision.", averageSalary: "₹15-30 LPA", growthProspects: "Outstanding" },
    ],
    higherEducation: higherEducationOptions["MCA in Artificial Intelligence & Machine Learning"],
    governmentExams: ["ISRO", "DRDO", "NIC"],
    skillsRequired: ["Python", "R", "C++", "Java", "TensorFlow", "PyTorch", "SQL", "Big Data", "Analytical mindset"],
    industryDemand: "high",
    demand_score: 10,
    risk_score: 2,
  },
  {
    courseName: "BBA (General)",
    stream: "Management",
    duration: "3 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "Class 12 (any stream, commerce preferred).",
    description: "A 3-year management degree that builds a foundation in business administration, finance, HR, and marketing. Ideal for students aiming for MBA or management roles.",
    careerOptions: [
      { title: "Management Trainee / HR Assistant", description: "Entry-level corporate roles in various business functions.", averageSalary: "₹3-5 LPA", growthProspects: "Good" },
      { title: "Project Manager / Operations Manager", description: "Mid-level roles managing teams and business operations.", averageSalary: "₹7-12 LPA", growthProspects: "Very Good" },
    ],
    higherEducation: higherEducationOptions["BBA (General)"],
    governmentExams: ["UPSC", "SSC", "Banking exams"],
    skillsRequired: ["MS Office", "Communication", "Leadership", "Negotiation", "Networking"],
    industryDemand: "medium",
    demand_score: 7,
    risk_score: 5,
  },
  {
    courseName: "MBA (Master of Business Administration)",
    stream: "Postgraduate",
    duration: "2 years",
    eligibilityFilter: "UG",
    eligibilityDisplay: "Graduation (any stream) with 50-60% marks.",
    description: "One of the most powerful career accelerators, opening opportunities in consulting, finance, marketing, and leadership roles across industries.",
    careerOptions: [
      { title: "Management Consultant / Analyst", description: "Roles in top firms providing strategic advice to businesses.", averageSalary: "₹8-25 LPA (India)", growthProspects: "Outstanding" },
      { title: "Manager (Finance/HR/Marketing)", description: "Core management roles within corporations.", averageSalary: "Varies by specialization", growthProspects: "Excellent" },
      { title: "Director / Vice President", description: "Senior leadership roles managing entire business units or functions.", averageSalary: "Can exceed ₹50 LPA", growthProspects: "Executive" },
    ],
    higherEducation: higherEducationOptions["MBA (Master of Business Administration)"],
    governmentExams: ["UPSC", "PSU management roles"],
    skillsRequired: ["Leadership", "Business Strategy", "Financial Analysis", "Public Speaking", "Negotiation", "Data Analytics"],
    industryDemand: "high",
    demand_score: 9,
    risk_score: 3,
  },
  {
    courseName: "CA (Chartered Accountant)",
    stream: "Finance",
    duration: "4.5-5 years",
    eligibilityFilter: "10+2 / UG",
    eligibilityDisplay: "Enroll in CA Foundation after Class 12, or direct entry after Graduation.",
    description: "One of the most respected finance careers in India, focusing on accounting, auditing, taxation, and corporate finance. A tough but highly rewarding qualification.",
    careerOptions: [
      { title: "Audit Associate / Tax Consultant", description: "Entry-level roles in Big 4 firms or CA practices.", averageSalary: "₹6-10 LPA", growthProspects: "Excellent" },
      { title: "Audit Manager / Finance Manager", description: "Mid-level roles managing audit teams or corporate finance departments.", averageSalary: "₹12-25 LPA", growthProspects: "Outstanding" },
      { title: "CFO / Partner in CA Firm", description: "Top-tier leadership roles in corporate finance or as a partner in a firm.", averageSalary: "₹30-70 LPA+", growthProspects: "Executive" },
    ],
    higherEducation: higherEducationOptions["CA (Chartered Accountant)"],
    governmentExams: ["RBI", "SEBI", "CAG", "Indian Revenue Services (via UPSC)"],
    skillsRequired: ["Accounting", "Auditing", "Taxation", "Corporate Finance", "Excel", "Tally", "Analytical thinking"],
    industryDemand: "high",
    demand_score: 9,
    risk_score: 5,
  },
  {
    courseName: "MBBS (Bachelor of Medicine & Bachelor of Surgery)",
    stream: "Medical",
    duration: "5.5 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "Class 12 (PCB stream) with 50%+ marks. Must qualify NEET-UG.",
    description: "The gateway to becoming a doctor, it is one of the most respected and stable careers, offering opportunities in clinical practice, research, and government health services.",
    careerOptions: [
      { title: "Junior Resident", description: "Post-MBBS role in hospitals, providing direct patient care.", averageSalary: "₹6-12 LPA", growthProspects: "Assured" },
      { title: "Specialist Doctor (MD/MS)", description: "A specialized practitioner in fields like Cardiology, Orthopedics after post-graduation.", averageSalary: "₹15-40 LPA+", growthProspects: "Excellent" },
      { title: "Hospital Director / Medical Researcher", description: "Senior administrative or research-focused roles.", averageSalary: "₹50 LPA+", growthProspects: "Leadership" },
    ],
    higherEducation: higherEducationOptions["MBBS (Bachelor of Medicine & Bachelor of Surgery)"],
    governmentExams: ["UPSC CMS", "Armed Forces Medical Services"],
    skillsRequired: ["Anatomy", "Physiology", "Diagnosis", "Surgery", "Pharmacology", "Empathy", "Communication"],
    industryDemand: "high",
    demand_score: 10,
    risk_score: 1,
  },
  {
    courseName: "BDS (Bachelor of Dental Surgery)",
    stream: "Medical",
    duration: "5 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "Class 12 (PCB stream) with 50%+ marks. Must qualify NEET-UG.",
    description: "The second most sought-after medical degree, focusing on oral health, dental surgery, and cosmetic dentistry. Offers stable careers and private practice opportunities.",
    careerOptions: [
      { title: "Associate Dentist", description: "Entry-level dentist working in a clinic or hospital.", averageSalary: "₹3-6 LPA", growthProspects: "Good" },
      { title: "Oral Surgeon / MDS Specialist", description: "Specialized dentist focusing on surgery, orthodontics, or other areas after post-graduation.", averageSalary: "₹8-25 LPA+", growthProspects: "Excellent" },
    ],
    higherEducation: higherEducationOptions["BDS (Bachelor of Dental Surgery)"],
    governmentExams: ["Army Dental Corps", "State Govt. Dentist"],
    skillsRequired: ["Oral Surgery", "Prosthodontics", "Radiology", "Patient Care", "Hand-Eye Coordination"],
    industryDemand: "medium",
    demand_score: 7,
    risk_score: 4,
  },
  {
    courseName: "B.Pharm (Bachelor of Pharmacy)",
    stream: "Medical",
    duration: "4 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "Class 12 (PCB/PCM) with 50%+ marks.",
    description: "A professional degree focused on drug formulation, manufacturing, and patient care. Graduates have strong opportunities in drug companies, hospitals, and research.",
    careerOptions: [
      { title: "Pharmacist / Medical Representative", description: "Dispensing medicines in hospitals/retail or marketing pharmaceutical products.", averageSalary: "₹3-6 LPA", growthProspects: "Stable" },
      { title: "R&D Scientist / Regulatory Manager", description: "Senior roles in drug discovery, clinical trials, and ensuring regulatory compliance.", averageSalary: "₹10-20 LPA", growthProspects: "Very Good" },
    ],
    higherEducation: higherEducationOptions["B.Pharm (Bachelor of Pharmacy)"],
    governmentExams: ["Drug Inspector exams", "Government Pharmacist"],
    skillsRequired: ["Pharmacology", "Pharmaceutical Chemistry", "Drug Safety", "Attention to detail", "Ethics"],
    industryDemand: "high",
    demand_score: 8,
    risk_score: 3,
  },
  {
    courseName: "B.Sc Nursing",
    stream: "Medical",
    duration: "4 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "Class 12 (PCB) with 50%+.",
    description: "A professional course that prepares registered nurses, the backbone of healthcare systems. Rising demand in India and abroad due to global shortages.",
    careerOptions: [
      { title: "Staff Nurse / Nursing Officer", description: "Frontline patient care role in hospitals and clinics.", averageSalary: "₹3-5 LPA", growthProspects: "High" },
      { title: "Nurse Educator / ICU Specialist", description: "Mid-level roles involving teaching or specialized critical care.", averageSalary: "₹8-15 LPA", growthProspects: "Excellent" },
    ],
    higherEducation: higherEducationOptions["B.Sc Nursing"],
    governmentExams: ["AIIMS Nursing Officer", "State Govt. Nurse"],
    skillsRequired: ["Patient care", "Clinical procedures", "Emergency handling", "Empathy", "Teamwork"],
    industryDemand: "high",
    demand_score: 9,
    risk_score: 2,
  },
  {
    courseName: "BPT (Bachelor of Physiotherapy)",
    stream: "Medical",
    duration: "4.5 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "Class 12 (PCB) with 50%+.",
    description: "Program focused on physical therapy, rehabilitation, and exercise science to help patients recover from injuries, paralysis, and post-surgery.",
    careerOptions: [
      { title: "Physiotherapist", description: "Works in hospitals, clinics, or sports teams to provide physical therapy.", averageSalary: "₹3-6 LPA", growthProspects: "Very Good" },
      { title: "Sports Physio / Rehab Specialist", description: "Specialized roles working with athletes or in rehabilitation centers.", averageSalary: "₹10-20 LPA", growthProspects: "Excellent" },
    ],
    higherEducation: higherEducationOptions["BPT (Bachelor of Physiotherapy)"],
    governmentExams: ["Govt. Hospital Physiotherapist"],
    skillsRequired: ["Anatomy", "Biomechanics", "Electrotherapy", "Exercise Therapy", "Patience", "Motivational skills"],
    industryDemand: "high",
    demand_score: 8,
    risk_score: 4,
  },
  {
    courseName: "B.Sc Biotechnology",
    stream: "Science",
    duration: "3 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "Class 12 (PCB or PCMB) with 50-60%.",
    description: "Focuses on the application of biology and technology in genetics, molecular biology, and industrial biotech for careers in pharma, agriculture, and research.",
    careerOptions: [
      { title: "Lab Technician / Research Assistant", description: "Entry-level lab and research support roles.", averageSalary: "₹2.5-5 LPA", growthProspects: "Good" },
      { title: "R&D Scientist / Biotech Manager", description: "Senior roles (usually after M.Sc/PhD) in research and development or management.", averageSalary: "₹8-15 LPA", growthProspects: "Excellent" },
    ],
    higherEducation: higherEducationOptions["B.Sc Biotechnology"],
    governmentExams: ["CSIR-NET", "DBT-JRF", "ICMR"],
    skillsRequired: ["Genetics", "Microbiology", "Molecular Techniques", "PCR", "DNA Sequencing", "Analytical thinking"],
    industryDemand: "medium",
    demand_score: 7,
    risk_score: 5,
  },
    {
    courseName: "LLB (Law)",
    stream: "Law",
    duration: "3 or 5 years",
    eligibilityFilter: "10+2 / UG",
    eligibilityDisplay: "5 years integrated after Class 12, or 3 years after graduation.",
    description: "A career in law opens opportunities as advocates, corporate lawyers, judges, and public prosecutors. With corporate growth, legal professionals are in high demand.",
    careerOptions: [
      { title: "Legal Associate / Junior Advocate", description: "Entry-level role in law firms, assisting senior advocates and conducting legal research.", averageSalary: "₹3-6 LPA", growthProspects: "Good" },
      { title: "Corporate Lawyer / Legal Advisor", description: "Mid-level role in companies, handling contracts, compliance, and legal strategy.", averageSalary: "₹8-20 LPA", growthProspects: "Excellent" },
      { title: "Judge / Law Firm Partner", description: "Senior positions in the judiciary or as a partner in a top law firm.", averageSalary: "₹25-80 LPA+", growthProspects: "Prestigious" }
    ],
    higherEducation: higherEducationOptions["LLB (Law)"],
    governmentExams: ["Judicial Services Exam", "UPSC (with Law optional)"],
    skillsRequired: ["Legal reasoning", "Drafting", "Negotiation", "Public speaking", "Research", "Analytical skills"],
    industryDemand: "high",
    demand_score: 8,
    risk_score: 5,
  },
  {
    courseName: "B.Ed (Bachelor of Education)",
    stream: "Education",
    duration: "2 years",
    eligibilityFilter: "UG",
    eligibilityDisplay: "Graduation in any discipline with 50–55% marks.",
    description: "B.Ed is the gateway for becoming a professional teacher in schools. It prepares students in pedagogy, child psychology, and teaching methodologies.",
    careerOptions: [
      { title: "Primary Teacher / TGT", description: "Teaching in primary or secondary schools.", averageSalary: "₹25k–40k/month", growthProspects: "Stable" },
      { title: "PGT / Head of Department", description: "Teaching senior secondary classes or leading a department.", averageSalary: "₹50k–70k/month", growthProspects: "Good" },
      { title: "Principal / Education Officer", description: "Administrative and leadership roles in the education sector.", averageSalary: "₹80k–1.5 L/month", growthProspects: "Excellent" }
    ],
    higherEducation: higherEducationOptions["B.Ed (Bachelor of Education)"],
    governmentExams: ["CTET", "State TET", "TGT/PGT Exams"],
    skillsRequired: ["Communication", "Patience", "Classroom management", "Subject expertise"],
    industryDemand: "high",
    demand_score: 8,
    risk_score: 2,
  },
  {
    courseName: "B.Arch (Bachelor of Architecture)",
    stream: "Design",
    duration: "5 years",
    eligibilityFilter: "10+2",
    eligibilityDisplay: "10+2 with PCM (minimum 50%).",
    description: "Architecture blends creativity, engineering, and design to plan and build spaces. Architects are in demand in urban planning and sustainable design.",
    careerOptions: [
      { title: "Architect", description: "Designs buildings and structures.", averageSalary: "₹4-7 LPA", growthProspects: "Good" },
      { title: "Urban Planner", description: "Designs layouts for cities and towns.", averageSalary: "₹12-25 LPA+", growthProspects: "Very Good" },
    ],
    higherEducation: higherEducationOptions["B.Arch (Bachelor of Architecture)"],
    governmentExams: ["Govt. Architect positions (CPWD, PWD)"],
    skillsRequired: ["AutoCAD", "Revit", "3D Modeling", "Design Thinking", "Urban Planning"],
    industryDemand: "medium",
    demand_score: 7,
    risk_score: 5,
  },
  {
    courseName: "UPSC (Civil Services Exam)",
    stream: "Government Services",
    duration: "1-3 years (Preparation)",
    eligibilityFilter: "UG",
    eligibilityDisplay: "Graduation in any discipline. Age: 21–32 yrs (general).",
    description: "India’s most prestigious exam leading to IAS, IPS, IFS, IRS roles. Civil servants play key roles in governance, policy-making, and administration.",
    careerOptions: [
      { title: "Assistant Collector / ASP", description: "Entry-level position for IAS/IPS officers.", averageSalary: "₹60k–1.2 L/month", growthProspects: "Excellent" },
      { title: "District Magistrate / SP", description: "Mid-level leadership role with significant administrative responsibility.", averageSalary: "Varies by rank", growthProspects: "High" },
      { title: "Chief Secretary / DGP / Ambassador", description: "Apex positions in state/central government or foreign services.", averageSalary: "₹2.5 L/month+", growthProspects: "Top-tier" }
    ],
    higherEducation: higherEducationOptions["UPSC (Civil Services Exam)"],
    governmentExams: ["UPSC CSE"],
    skillsRequired: ["Analytical thinking", "Decision-making", "Communication", "Leadership", "Writing skills"],
    industryDemand: "high",
    demand_score: 10,
    risk_score: 9,
  },
];


export const seedCareers = mutation({
  handler: async (ctx) => {
    // Clear existing data first
    const existingCareers = await ctx.db.query("careers").collect();
    for (const career of existingCareers) {
      await ctx.db.delete(career._id);
    }

    console.log(`Starting to seed ${careerPathsData.length} careers...`);
    for (const career of careerPathsData) {
      await ctx.db.insert("careers", career as any); // Using 'as any' to match the dynamic structure.
    }
    console.log("Seeded careers successfully.");
    return `Seeded ${careerPathsData.length} careers successfully.`;
  }
});

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("careers").collect();
  }
});
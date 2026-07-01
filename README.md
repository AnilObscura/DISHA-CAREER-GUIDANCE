# 🎓 DISHA - Career Guidance Platform

> **DISHA guides students to the right careers using AI-powered assessments, personalized recommendations, and conversational support.**

---

## Table of Contents
1. [Project Purpose](#project-purpose)
2. [Tech Stack](#tech-stack)
3. [System Architecture & Design](#system-architecture--design)
4. [Project Screenshots](#project-screenshots)
5. [Database Schema & Convex Backend](#database-schema--convex-backend)
6. [AI Integration (Gemini Prompt Engineering)](#ai-integration-gemini-prompt-engineering)
7. [Key Features & Components](#key-features--components)
8. [How to Run Locally](#how-to-run-locally)
9. [License](#license)

---

## Project Purpose

Students face massive confusion when choosing a career path, often lacking accurate, personalized data about courses, colleges, and job prospects. 

**DISHA solves this problem by:**
1. Using **AI-powered assessments** to map a student's interests and skills to specific streams (Science, Commerce, Arts, Vocational).
2. Providing **real-time AI counseling** via a dynamic chatbot (`Gemini 1.5 Flash`).
3. Indexing and filtering **500+ government colleges and 200+ careers**, allowing students to find tailored roadmaps instantly.
4. Delivering an intuitive, gamified dashboard to track their educational progress.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite |
| **UI Components & Styling** | Tailwind CSS, Shadcn UI, Radix UI, Lucide Icons |
| **State Management & Data Fetching** | TanStack Query, React Router v7 |
| **Backend & Database** | Convex (Serverless DB, Realtime sync) |
| **AI Integration** | Gemini 1.5 Flash LLM (Google Generative AI) |
| **Authentication** | Auth0 + Convex Auth (OIDC) |
| **Charts & Analytics** | Recharts |
| **Dev Tools** | Prettier, ESLint, PNPM Workspaces |

---

## System Architecture & Design

DISHA follows a **Serverless Full-Stack Architecture** using Convex as the backbone.

### 1. Frontend Layer (React + Vite)
The UI is built with React and TypeScript, utilizing Vite for ultra-fast builds. It uses **Shadcn UI** for a professional, accessible component library and **React Router** for seamless navigation between the Dashboard, Assessment, Chatbot, and Directory pages.

### 2. Serverless Backend (Convex)
Convex acts as both the **Database Engine (NoSQL)** and the **Backend Server (Functions)**. It enables real-time data sync without managing traditional REST APIs. All mutations, queries, and data validations live inside the `convex/` directory and are called directly from React using `useQuery` and `useMutation`.

### 3. Data Flow & AI Integration
1. **User Input:** User completes an assessment or asks a question in the Chatbot.
2. **Convex Mutations:** The frontend triggers a Convex mutation (e.g., `sendMessage` in `chatbot.ts`).
3. **Background AI Action:** Convex schedules a server-side Action to call the `Gemini 1.5 Flash` API. It passes the context (user's history, available colleges, and career streams) via a carefully engineered system prompt.
4. **Response & Storage:** The AI response is received, formatted, and stored in the `chatbotMessages` table via an internal mutation. The UI updates in real-time via TanStack Query.

---

# 📸 Project Screenshots

Here is a visual walkthrough of the application:

---

## 1️⃣ Student Dashboard

The central hub for students to track their progress, view important admission and deadline dates, and quickly navigate to the platform's core features.

![Student Dashboard](https://github.com/AnilObscura/DISHA-CAREER-GUIDANCE/blob/1a701157db9be35ef732f19b258dc1cb33a00faa/s1.png)

---

## 2️⃣ Government Colleges Directory

A powerful search and filtering interface that enables students to explore government colleges, available courses, eligibility criteria, fee structures, and other important details.

![Government Colleges Directory](https://github.com/AnilObscura/DISHA-CAREER-GUIDANCE/blob/1a701157db9be35ef732f19b258dc1cb33a00faa/s2.png)

---

## 3️⃣ Study Resources Hub

A dedicated learning portal providing free E-books, Video Courses, Practice Tests, and educational resources tailored to students' career goals and academic needs.

![Study Resources Hub](https://github.com/AnilObscura/DISHA-CAREER-GUIDANCE/blob/1a701157db9be35ef732f19b258dc1cb33a00faa/s3.png)

---

## 4️⃣ Detailed Resource View

A comprehensive view of individual learning resources, displaying detailed information, descriptions, and access to study materials for better learning.

![Detailed Resource View](https://github.com/AnilObscura/DISHA-CAREER-GUIDANCE/blob/1a701157db9be35ef732f19b258dc1cb33a00faa/s4.png)

---

## 5️⃣ AI Mentor Chat Interface

An intelligent AI-powered chatbot that provides personalized career guidance, answers student queries, and offers context-aware recommendations using Google's Gemini AI.

![AI Mentor Chat Interface](https://github.com/AnilObscura/DISHA-CAREER-GUIDANCE/blob/1a701157db9be35ef732f19b258dc1cb33a00faa/s5.png)

---

## Database Schema & Convex Backend

The application uses **Convex's document-based database** with strictly typed schemas.

### Core Tables (`convex/schema.ts`)

- **`users`**: Stores student profiles (Name, Email, Location, Stream, Subjects, Interests).
- **`assessments`**: Stores quiz results, scoring specific interests (Science, Commerce, Arts, Vocational), and recommended streams.
- **`colleges`**: A massive repository of colleges with multi-location indexing. Contains nested arrays for `courses`, `facilities`, and `contact` information.
- **`careers`**: Details career paths (Stream, Eligibility, Salary, Job Growth, Skills Required). Utilizes indexed `demand_score` and `risk_score` for intelligent sorting.
- **`chatbotMessages`**: Maintains conversation history for the AI Mentor. Indexed by `userId` for fast context retrieval.
- **`notifications` & `bookmarks` & `userProgress`**: Supporting tables for UI functionalities like deadlines, saved colleges, and student milestones.

---

## AI Integration (Gemini Prompt Engineering)

A key innovation in DISHA is the AI Mentor (`convex/gemini.ts`). It is not just a standard wrapper; it utilizes **Context Injection**.

### How it works:
1. The backend fetches the student's **recent chat history** (last 10 messages).
2. It fetches a **live list of Colleges and Career Streams** from the database.
3. It constructs a **dynamic System Prompt**:
4. This prompt, combined with the user's query, is sent to `gemini-1.5-flash-latest`.
5. The AI response is **asynchronously saved** to the database, ensuring the chat UI updates seamlessly without blocking the user.

---

## Key Features & Components

### 1. 🧠 AI-Powered Career Assessment
- Students take a comprehensive multi-dimensional quiz.
- Scoring logic evaluates aptitudes across 4 streams: Science, Commerce, Arts, and Vocational.
- Dynamically recommends the best-fit stream and suggests related careers and colleges.

### 2. 🤖 AI Mentor Chatbot
- Real-time conversational interface powered by Google's Gemini LLM.
- Provides personalized roadmap suggestions based on the student's profile data.
- Context-aware responses tailored specifically to the educational landscape of Jammu & Kashmir.

### 3. 🏛️ Government Colleges Directory
- Advanced filtering by State, City, Stream, and Facilities.
- Detailed college profiles including eligibility, cutoff scores, fees, and course structures.
- Pagination powered by Convex's built-in `paginationOptsValidator`.

### 4. 📊 User Dashboard
- Visualizes "Profile Completion" progress using a progress bar.
- Displays "Important Dates" (Admissions, Scholarships, Exams) via the `notifications` table.
- Integrated `Recharts` to show future career growth and skill analytics.

### 5. 📚 Study Resources Hub
- Curated resources including E-Books, Video Courses, and Practice Tests.
- Filterable by Category, Difficulty, Language, and Type.

---

# 🚀 How to Run Locally

Follow these steps to set up the **DISHA Career Guidance Platform** on your local machine.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/AnilObscura/DISHA-CAREER-GUIDANCE.git
cd DISHA-CAREER-GUIDANCE
```

---

## 2️⃣ Install Dependencies

Using **PNPM** (Recommended):

```bash
pnpm install
```

Or using **NPM**:

```bash
npm install
```

---

## 3️⃣ Set Up the Convex Backend

Start the Convex development server:

```bash
npx convex dev
```

If prompted:

- Log in to your **Convex** account.
- Create a new deployment.
- Copy the generated deployment URL.

---

## 4️⃣ Configure Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
VITE_CONVEX_URL=your_convex_deployment_url
GEMINI_API_KEY=your_google_gemini_api_key
```

> **Note:** You can obtain a Gemini API key from **Google AI Studio**.

---

## 5️⃣ Seed the Database (Optional)

Populate the database with sample **Colleges** and **Careers** data by either:

- Running the required mutation from the **Convex Dashboard**, or
- Executing your custom seed script.

---

## 6️⃣ Start the Development Server

Using **PNPM**:

```bash
pnpm dev
```

Or using **NPM**:

```bash
npm run dev
```

---

## 7️⃣ Open the Application

Open your browser and visit:

```text
http://localhost:5173
```

The **DISHA Career Guidance Platform** should now be running successfully on your local machine.

## License
This project is open-source under the MIT License.

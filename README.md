# Research Intelligence Platform — Frontend

Frontend for the **Research Intelligence Platform**, a research-focused web application for managing academic papers, uploading and processing PDFs, asking grounded AI questions, and interacting with an AI research assistant.

The frontend is built with **React, TypeScript, Vite, React Router, and Tailwind CSS** and communicates with the FastAPI backend through authenticated REST API requests.

---

# Features

* User registration
* User login
* JWT authentication
* Protected application routes
* Dashboard
* Paper library
* Paper search
* Category filtering
* Publication-year filtering
* Paper sorting
* Pagination
* Create research paper
* PDF upload
* PDF replacement
* PDF download
* PDF deletion
* PDF processing status
* Paper workspace
* AI-powered paper questions
* Grounded RAG answers
* Retrieved source display
* Paper summarization
* Paper analysis
* Related research recommendations
* Conversational AI Assistant
* Account and profile information
* Loading states
* Error handling
* Responsive SaaS-style interface

---

# Technology Stack

| Technology   | Purpose                           |
| ------------ | --------------------------------- |
| React        | UI development                    |
| TypeScript   | Type-safe frontend development    |
| Vite         | Development server and build tool |
| React Router | Client-side routing               |
| Tailwind CSS | Styling and responsive UI         |
| Fetch API    | Backend communication             |
| FastAPI      | Backend API                       |
| PostgreSQL   | Backend database                  |
| LangGraph    | Backend research agent            |

---

# Project Structure

```text
src/
│
├── api/
│   ├── client.ts
│   ├── auth.ts
│   ├── papers.ts
│   ├── documents.ts
│   └── conversations.ts
│
├── components/
│   ├── Sidebar.tsx
│   └── PaperCard.tsx
│
├── layouts/
│   └── AppLayout.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Papers.tsx
│   ├── CreatePaper.tsx
│   ├── PaperWorkspace.tsx
│   ├── Assistant.tsx
│   └── Account.tsx
│
├── router/
│   └── index.tsx
│
├── App.tsx
├── index.css
└── main.tsx
```

---

# Application Architecture

The frontend follows a simple separation between:

```text
Pages
  ↓
API Functions
  ↓
API Client
  ↓
FastAPI Backend
```

For example:

```text
PaperWorkspace
      ↓
askPaper()
      ↓
apiClient()
      ↓
FastAPI
      ↓
RAGService
      ↓
Response
      ↓
PaperWorkspace
```

This keeps backend communication separate from UI components.

---

# Routing

React Router manages the application's routes.

Main routes include:

```text
/
├── /login
├── /register
│
└── Application
    ├── /dashboard
    ├── /papers
    ├── /papers/create
    ├── /papers/:paperId
    ├── /assistant
    └── /account
```

The main application pages are displayed inside `AppLayout`.

---

# Application Layout

The authenticated application uses a shared layout:

```text
AppLayout
│
├── Sidebar
│
└── Main Content
      │
      └── Current Route
```

The sidebar provides navigation to:

```text
Dashboard
Papers
AI Assistant
Account
```

The layout uses a fixed desktop sidebar and a responsive main content area.

---

# Authentication

Authentication is handled through the backend JWT API.

Login flow:

```text
Login Page
    ↓
POST /auth/login
    ↓
Access Token
    ↓
localStorage
    ↓
Authenticated API Requests
```

The access token is stored as:

```text
access_token
```

API requests that require authentication include:

```http
Authorization: Bearer <token>
```

---

# API Client

The central API client is:

```text
src/api/client.ts
```

Its responsibility is to:

* Build API requests
* Attach authentication tokens
* Set request headers
* Send requests to FastAPI
* Handle HTTP errors
* Parse JSON responses

The frontend API base URL currently points to:

```text
http://localhost:8000
```

---

# Authentication API

The authentication API is implemented in:

```text
src/api/auth.ts
```

Available operations include:

```text
login()
register()
getCurrentUser()
```

The frontend uses `/auth/me` to retrieve the currently authenticated user's information.

The returned user data includes:

```text
id
name
email
is_active
role
created_at
updated_at
```

---

# Dashboard

The Dashboard provides the main entry point into the research workspace.

It acts as a starting point for accessing:

* Research papers
* AI Assistant
* Research workspace
* Account information

---

# Papers Page

The Papers page displays the user's research papers retrieved from the backend.

It supports:

* Search
* Category filtering
* Sorting
* Pagination

The page communicates with:

```text
GET /papers/
```

Query parameters are used for paper discovery.

Example:

```text
search
category
publication_year
sort_by
order
page
limit
```

---

# Paper Cards

Each paper is displayed through the reusable:

```text
src/components/PaperCard.tsx
```

A paper card displays information such as:

* Title
* Authors
* Publication year
* Journal
* Category
* DOI

The card also provides an action to open the paper workspace.

```text
Paper Card
    ↓
Open
    ↓
/papers/{paperId}
```

---

# Create Paper

The Create Paper page allows the user to create a new research paper.

The form collects:

```text
Title
Authors
Abstract
Publication Year
Journal
DOI
Category
PDF
```

The PDF upload is required.

The frontend validates the file before uploading it.

Only PDF files are accepted.

---

# Paper Creation Flow

```text
Create Paper Form
       ↓
POST /papers/
       ↓
Paper Created
       ↓
POST /papers/{paper_id}/document
       ↓
PDF Uploaded
       ↓
Navigate to Paper Workspace
```

This keeps paper creation and document upload as separate backend operations.

---

# Paper Workspace

The Paper Workspace is the main research interface.

It brings together the major paper-related features in one page.

```text
Paper Workspace
│
├── Paper Information
├── Document Management
├── AI Question Answering
├── Sources
├── Summary
├── Analysis
└── Related Research
```

---

# Document Management

The frontend communicates with:

```text
src/api/documents.ts
```

Document operations include:

```text
getPaperDocument()
uploadPaperDocument()
replacePaperDocument()
downloadPaperDocument()
deletePaperDocument()
```

---

# Upload PDF

Users can upload a PDF from the Paper Workspace.

The frontend sends the file using `FormData`.

The request is sent to:

```http
POST /papers/{paper_id}/document
```

The PDF is then processed by the backend.

---

# Replace PDF

Users can replace the current paper document.

Request:

```http
PUT /papers/{paper_id}/document
```

The frontend provides feedback while the document is being replaced:

```text
Replacing...
```

Other document actions are disabled during the operation to prevent conflicting actions.

---

# Download PDF

The frontend supports authenticated PDF downloads.

Request:

```http
GET /papers/{paper_id}/document/download
```

The response is received as a `Blob`.

The frontend creates a temporary browser URL and triggers the download.

Flow:

```text
Download PDF
     ↓
Authenticated API Request
     ↓
Blob
     ↓
Object URL
     ↓
Browser Download
```

---

# Delete PDF

Users can remove the document associated with a paper.

Request:

```http
DELETE /papers/{paper_id}/document
```

The frontend provides loading feedback:

```text
Deleting...
```

Document actions are disabled while deletion is in progress.

---

# Document Processing Status

The frontend displays document processing information returned by the backend.

Possible states include:

```text
pending
processing
completed
failed
```

If processing fails, the backend provides a processing error that can be displayed to the user.

---

# AI Paper Questions

The Paper Workspace allows users to ask questions about the current research paper.

The frontend calls:

```http
POST /papers/{paper_id}/ask
```

The flow is:

```text
User Question
      ↓
PaperWorkspace
      ↓
askPaper()
      ↓
FastAPI
      ↓
RAG Service
      ↓
Retrieved Chunks
      ↓
LLM
      ↓
Answer + Sources
```

---

# Grounded RAG Responses

The frontend displays answers generated from the paper's retrieved content.

For example, when relevant information is found:

```text
Question
   ↓
Relevant document chunks
   ↓
AI-generated answer
   ↓
Sources
```

When no relevant information exists:

```text
I could not find relevant information in this document.
```

The frontend displays this response normally rather than treating it as an application error.

This allows the RAG system to distinguish between:

```text
No relevant information
```

and:

```text
Actual API failure
```

---

# Sources

RAG responses can include retrieved sources.

A source contains information such as:

```text
chunk_id
chunk_index
content
similarity_score
```

The frontend uses these sources to provide evidence associated with the generated answer.

This helps users understand which parts of the research document contributed to the response.

---

# Paper Summary

The Paper Workspace provides a summary feature backed by the FastAPI backend.

The frontend sends the paper information to the backend and displays the generated summary inside the workspace.

The UI provides loading and error states while the summary is being generated.

---

# Paper Analysis

The workspace also provides an analysis feature.

The backend performs the AI analysis and the frontend presents the resulting information in the research workspace.

The UI handles:

```text
Loading
Success
Error
```

states separately.

---

# Related Research

The frontend displays related research papers retrieved through the backend's Semantic Scholar integration.

Flow:

```text
Current Paper
     ↓
Backend
     ↓
Semantic Scholar
     ↓
Recommended Papers
     ↓
Frontend
```

The related research section allows users to discover additional papers connected to their current research.

---

# AI Assistant

The application contains a separate conversational AI Assistant page.

The assistant communicates with the backend conversational API.

```text
Assistant
   ↓
Conversation API
   ↓
LangGraph Research Agent
   ↓
Research Tools
   ↓
Research Data
   ↓
LLM
   ↓
Response
```

The assistant is intended for conversational research interactions rather than only single-question document queries.

---

# Account Page

The Account page displays the authenticated user's real backend information.

It currently displays:

```text
Name
Email
Role
Account ID
Account Status
Joined
Last Updated
```

The page retrieves this information through:

```http
GET /auth/me
```

The page intentionally does not provide editing controls because the current backend does not expose profile-editing endpoints.

---

# Loading States

The frontend provides loading states for asynchronous operations.

Examples include:

```text
Loading...
Asking...
Replacing...
Downloading...
Deleting...
```

Buttons involved in document operations are disabled while another document operation is active.

This prevents duplicate or conflicting requests.

---

# Error Handling

Frontend API operations use error handling around asynchronous requests.

Example pattern:

```tsx
try {
  // API request
} catch (err) {
  setError(
    err instanceof Error
      ? err.message
      : "Something went wrong.",
  );
}
```

Errors are displayed in the relevant page or section rather than silently failing.

---

# Responsive Design

The UI is designed as a responsive research-oriented SaaS interface.

The primary design direction uses:

```text
White cards
Soft gray backgrounds
Blue / indigo accents
Dark slate text
Light borders
Subtle shadows
```

The interface avoids overly decorative or distracting visual elements.

Animations are intentionally subtle and generally use short transitions.

---

# Styling

Tailwind CSS is used throughout the application.

The frontend uses utility classes for:

* Layout
* Spacing
* Typography
* Colors
* Borders
* Responsive behavior
* Hover states
* Transitions
* Loading states

The application follows a consistent visual language across the main pages.

---

# Frontend ↔ Backend Communication

The frontend and backend are separate applications.

```text
React Frontend
localhost:5173
       │
       │ HTTP
       ▼
FastAPI Backend
localhost:8000
       │
       ▼
PostgreSQL
```

The frontend does not directly access PostgreSQL.

All database operations go through the backend API.

---

# API Modules

The frontend API layer is organized by feature.

```text
src/api/
│
├── client.ts
├── auth.ts
├── papers.ts
├── documents.ts
└── conversations.ts
```

### `client.ts`

Central HTTP client.

### `auth.ts`

Authentication and current-user operations.

### `papers.ts`

Paper CRUD, search, RAG, summary, analysis, and recommendations.

### `documents.ts`

PDF upload, retrieval, replacement, download, and deletion.

### `conversations.ts`

Conversational AI Assistant API communication.

---

# Installation

## 1. Clone the repository

```bash
git clone <your-frontend-repository-url>
cd <frontend-repository>
```

---

## 2. Install dependencies

```bash
npm install
```

---

# Development

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

The backend should be running separately:

```text
http://localhost:8000
```

---

# Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

# Linting

Run ESLint with:

```bash
npm run lint
```

---

# Environment Configuration

The current frontend API client uses:

```text
http://localhost:8000
```

for backend requests.

For deployment, the API base URL should be moved to a frontend environment variable rather than remaining hardcoded.

For example:

```env
VITE_API_BASE_URL=https://your-api-domain.com
```

Then the frontend API client can use the configured environment variable.

---

# Authentication Flow

The complete frontend authentication flow is:

```text
Register
   ↓
Login
   ↓
Receive JWT
   ↓
Store access_token
   ↓
Attach Bearer token
   ↓
Protected API requests
   ↓
Authenticated research workspace
```

---

# Complete Research Workflow

A user can interact with the platform through the following workflow:

```text
Login
  ↓
Dashboard
  ↓
Create Paper
  ↓
Enter Paper Information
  ↓
Upload PDF
  ↓
Paper Workspace
  ↓
Document Processing
  ↓
Ask Questions
  ↓
Retrieve Relevant Evidence
  ↓
Generate Grounded Answer
  ↓
View Sources
  ↓
Read Summary / Analysis
  ↓
Explore Related Research
```

For conversational research:

```text
AI Assistant
      ↓
Conversation
      ↓
LangGraph Research Agent
      ↓
Research Tools
      ↓
Grounded Response
```

---

# Design Principles

## Separation of UI and API Logic

Pages focus on UI and user interaction while API modules handle backend communication.

```text
Page
 ↓
API Function
 ↓
API Client
 ↓
Backend
```

---

## Reusable Components

Shared UI elements such as:

```text
Sidebar
PaperCard
AppLayout
```

are implemented as reusable components.

---

## Backend-Driven Data

The frontend does not maintain its own research database.

Paper, document, user, RAG, recommendation, and conversation data are retrieved from the backend.

---

## Grounded Research Experience

The frontend presents the backend's grounded AI responses and retrieved sources rather than treating the LLM as an unrestricted chatbot.

---

# Current Frontend Status

The frontend is currently complete for the implemented project scope.

```text
Frontend
│
├── React + TypeScript             ✓
├── Vite                           ✓
├── Tailwind CSS                   ✓
├── React Router                   ✓
├── Authentication UI              ✓
├── Registration                   ✓
├── Login                          ✓
├── Dashboard                      ✓
├── Papers Library                 ✓
├── Search                         ✓
├── Filtering                      ✓
├── Sorting                        ✓
├── Pagination                     ✓
├── Create Paper                   ✓
├── PDF Upload                     ✓
├── PDF Replacement                ✓
├── PDF Download                   ✓
├── PDF Deletion                   ✓
├── Document Status                ✓
├── Paper Workspace                ✓
├── AI Paper Questions             ✓
├── RAG Sources                    ✓
├── Paper Summary                  ✓
├── Paper Analysis                 ✓
├── Related Research               ✓
├── AI Assistant                   ✓
├── Account Page                   ✓
├── Loading States                 ✓
└── Error Handling                 ✓
```

---

# Project Status

The frontend is connected to the completed FastAPI backend and provides the main user-facing interface for the Research Intelligence Platform.

The current application supports the complete research workflow from paper creation and PDF management to grounded AI research, source retrieval, paper analysis, recommendations, and conversational assistance.

The next stage for the frontend is primarily **production preparation and deployment**, including environment-based API configuration, production builds, deployment configuration, and final UI polish.

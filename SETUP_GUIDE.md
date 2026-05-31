# AI-Powered HR Recruitment System - Setup Guide

## Overview

This is a complete frontend solution for an AI-powered HR recruitment system with two main portals:

1. **Applicant Portal** - Where candidates submit applications with their resume
2. **HR Dashboard** - Where HR teams review and manage shortlisted candidates

## System Architecture

### Key Features

- **Applicant Portal** (`/apply`)
  - Collect basic information (name, email, phone)
  - Upload resume (PDF or Word document)
  - Instant AI evaluation with match scoring
  - Immediate feedback on application status

- **HR Dashboard** (`/hr`)
  - View all applications
  - Filter by acceptance status (Accepted/Rejected)
  - See AI evaluation details and reasoning
  - Access extracted resume text
  - View match scores and key strengths/gaps
  - Detailed applicant profiles with contact information

- **Landing Page** (`/`)
  - Overview of the system
  - Links to both portals
  - Information about how the system works

## Technical Stack

- **Framework**: Next.js 16 with App Router
- **UI Components**: shadcn/ui with Radix UI
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **Document Processing**:
  - PDF extraction: pdfjs-dist
  - Word document extraction: mammoth
- **AI Integration**: Vercel AI SDK with OpenAI
- **State Management**: React hooks + localStorage

## Setup Instructions

### 1. Install Dependencies

All dependencies are already installed. The project includes:
- pdfjs-dist - For PDF text extraction
- mammoth - For Word document text extraction
- ai - Vercel AI SDK for generative AI
- @ai-sdk/openai - OpenAI provider for AI SDK

### 2. Configure OpenAI API

The system uses OpenAI's GPT-4 Turbo model for candidate evaluation. You have two options:

**Option A: Use Vercel AI Gateway (Recommended - Zero Config)**
- The app is configured to use OpenAI through Vercel AI Gateway
- No additional configuration needed if you have access to Vercel AI Gateway

**Option B: Use OpenAI API Key Directly**
Edit `lib/aiMatcher.ts` and add your OpenAI API key:

```typescript
// Set OPENAI_API_KEY environment variable before running
import { openai } from "@ai-sdk/openai";

const model = openai("gpt-4-turbo", {
  apiKey: process.env.OPENAI_API_KEY,
});
```

### 3. Customize Job Requirements

Edit `lib/jobRequirements.ts` to match your job position:

```typescript
export const JOB_REQUIREMENTS = {
  title: "Your Job Title",
  requiredSkills: ["Skill1", "Skill2", "Skill3"],
  requiredExperience: "X+ years",
  requiredEducation: "Your requirement",
  niceToHave: ["Optional skill 1", "Optional skill 2"],
  evaluationCriteria: "Your custom evaluation prompt"
};
```

### 4. Start the Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

### 5. Access the Portals

- **Applicant Portal**: `http://localhost:3000/apply`
- **HR Dashboard**: `http://localhost:3000/hr`
- **Landing Page**: `http://localhost:3000`

## File Structure

```
app/
├── page.tsx                 # Landing page
├── layout.tsx              # Root layout
├── apply/
│   ├── page.tsx           # Applicant form page (server)
│   └── ApplyPageClient.tsx # Client component
└── hr/
    ├── page.tsx           # HR dashboard page (server)
    └── HRDashboardPageClient.tsx # Client component

components/
├── ApplicationForm.tsx      # Applicant form with validation
├── ApplicationSuccess.tsx   # Success/failure feedback
├── HRDashboard.tsx         # HR dashboard with stats
└── ApplicationDetails.tsx   # Detailed application view

lib/
├── types.ts                # TypeScript interfaces
├── jobRequirements.ts      # Job spec and requirements
├── documentExtractor.ts    # PDF/Word text extraction
├── aiMatcher.ts           # AI evaluation logic
└── applicationStorage.ts   # localStorage management
```

## How It Works

### Application Flow

1. **Applicant submits application**
   - User fills name, email, phone
   - Uploads resume (PDF or Word)
   - Form validates inputs

2. **Document processing**
   - Resume text is extracted using pdfjs-dist or mammoth
   - Raw text is prepared for AI evaluation

3. **AI evaluation**
   - GPT-4 evaluates candidate against job requirements
   - Generates match score (0-100)
   - Identifies key strengths and gaps
   - Provides detailed reasoning

4. **Application saved**
   - Application stored in browser localStorage
   - Applicant sees evaluation result
   - Option to submit another application

5. **HR review**
   - HR opens dashboard to see all applications
   - Can filter by Accepted/Rejected status
   - Click to view detailed application profiles
   - See extracted resume text and AI reasoning

### Data Storage

Applications are stored in **browser localStorage** under the key `hr_applications`. This means:

- Data persists across browser sessions (on the same device)
- Each browser/device has its own applications list
- Clearing browser data will delete all applications

For production, you would replace localStorage with a backend database like Supabase.

## AI Evaluation Process

The system uses OpenAI's GPT-4 Turbo to evaluate candidates:

1. **Input**: Job requirements + extracted resume text
2. **Processing**: AI analyzes match against requirements
3. **Output**: Structured JSON with:
   - Decision: ACCEPT or REJECT
   - Match Score: 0-100
   - Reasoning: Detailed explanation
   - Key Strengths: List of relevant skills/experience
   - Gaps: Areas needing development

## Customization Guide

### Change Job Title

Edit `lib/jobRequirements.ts`:
```typescript
title: "Your New Job Title"
```

### Modify Evaluation Criteria

Edit the `evaluationCriteria` in `lib/jobRequirements.ts` to change how AI evaluates candidates.

### Adjust Required Skills

Update `requiredSkills` array in `lib/jobRequirements.ts`:
```typescript
requiredSkills: ["JavaScript", "React", "Node.js", ...]
```

### Update Styling

The app uses Tailwind CSS with custom colors. Edit `app/globals.css` to change the color scheme.

## Supported Document Formats

- **PDF** (.pdf)
- **Word** (.doc, .docx)
- **Maximum file size**: 10MB

## Browser Compatibility

The app requires:
- Modern browser with ES6+ support
- localStorage support
- File API support

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### AI Evaluation Fails
- Check OpenAI API key/Vercel AI Gateway access
- Ensure API quota is available
- Check console for error messages

### Document Upload Fails
- Verify file is valid PDF or Word document
- Check file is under 10MB
- Try with a different file format

### Applications Not Saving
- Check if localStorage is enabled in browser
- Try clearing browser cache and reloading
- Open browser console to check for errors

### PDF Text Extraction Issues
- Complex PDFs may not extract perfectly
- Try converting to Word and uploading again
- Check extracted text in HR dashboard to see what was captured

## Next Steps for Production

To deploy this to production:

1. **Add Backend Database**
   - Replace localStorage with Supabase, Firebase, or PostgreSQL
   - Update `lib/applicationStorage.ts` to use database

2. **Add User Authentication**
   - Implement HR portal authentication
   - Only authenticated users can access HR dashboard

3. **Add Email Notifications**
   - Notify candidates of application status
   - Notify HR of new applications

4. **Add File Storage**
   - Store original resume files in cloud storage (Vercel Blob, AWS S3, etc.)
   - Keep references in database

5. **Scale AI Processing**
   - Consider using job queues for heavy processing
   - Add rate limiting to prevent abuse

6. **Add Analytics**
   - Track application funnel metrics
   - Monitor AI evaluation performance

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review console logs for error messages
3. Check that all dependencies are properly installed
4. Verify API keys and environment variables are set

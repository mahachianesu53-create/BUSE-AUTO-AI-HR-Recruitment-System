# AI-Powered HR Recruitment System - Usage Guide

## Quick Start

### For Applicants

1. Go to `http://localhost:3000/apply`
2. Fill in your information:
   - Full Name
   - Email Address
   - Phone Number
3. Upload your resume (PDF or Word document)
4. Click "Submit Application"
5. Wait for AI evaluation (typically 10-30 seconds)
6. See your evaluation result with match score
7. View detailed feedback on strengths and areas for development

### For HR Teams

1. Go to `http://localhost:3000/hr`
2. View the dashboard with statistics:
   - Total applications received
   - Number of accepted candidates
   - Number of rejected candidates
   - Average match score
3. Use tabs to filter by application status:
   - **All**: See all applications
   - **Accepted**: Only candidates who passed AI evaluation
   - **Rejected**: Candidates who didn't meet requirements
4. Click "View Details" on any application to see:
   - Full candidate information
   - AI evaluation reasoning
   - Extracted resume text
   - Key strengths and gaps
   - Job requirements matching

## Using the Applicant Portal

### Application Form

The applicant form includes:
- **Full Name**: Legal name of the applicant
- **Email Address**: Valid email for future communications
- **Phone Number**: Contact phone number
- **Resume Upload**: PDF or Word document (max 10MB)

### Form Validation

The form validates:
- Name must be at least 2 characters
- Email must be valid format
- Phone must be at least 10 characters
- Resume must be PDF or Word
- Resume must be under 10MB

### After Submission

Once submitted, you'll see:
- **Match Score**: Percentage match with job requirements (0-100)
- **Decision**: ACCEPTED or REJECTED
- **Evaluation Notes**: AI's reasoning for the decision
- **Key Strengths**: What the candidate did well
- **Areas for Development**: Skills or experience gaps

### Resubmitting

You can submit another application by clicking "Submit Another Application" button.

## Using the HR Dashboard

### Dashboard Overview

The HR dashboard shows four key metrics:

1. **Total Applications**: Total number of applications received
2. **Accepted**: How many candidates matched the criteria
3. **Rejected**: How many candidates didn't match
4. **Avg Match Score**: Average match score of all candidates

### Application List

Each application card shows:
- Candidate name
- Status badge (Accepted/Rejected in green/red)
- Email address
- Phone number
- Match score percentage
- View Details button

### Filtering Applications

Use the tabs to filter:
- **All**: Shows all applications regardless of status
- **Accepted**: Only shows applications with ACCEPTED status
- **Rejected**: Only shows applications with REJECTED status

### Detailed Application View

Click "View Details" to see:

#### Contact Information
- Email address
- Phone number
- Resume filename

#### AI Evaluation
- **Evaluation Notes**: Full reasoning from AI
- **Key Strengths**: List of positive attributes identified
- **Areas for Development**: Skills/experience gaps

#### Position Requirements
- Required skills (show as badges)
- Required experience
- Required education
- Nice to have skills

#### Extracted Resume Text
- First 500 characters of extracted text
- "View Full Resume" button to see complete text

## AI Evaluation Details

### How AI Evaluates Candidates

The AI evaluator uses GPT-4 Turbo to:

1. **Extract Key Information**
   - Technical skills mentioned
   - Years of experience
   - Education level
   - Relevant projects and achievements

2. **Compare Against Requirements**
   - Check for required skills
   - Verify experience level
   - Assess education background
   - Identify nice-to-have skills

3. **Generate Evaluation**
   - Calculate match score (0-100)
   - Make ACCEPT/REJECT decision
   - List key strengths found
   - Identify gaps or missing skills
   - Provide detailed reasoning

### Understanding Match Scores

- **90-100**: Excellent match, highly qualified
- **75-89**: Strong match, most requirements met
- **60-74**: Good match, meets core requirements
- **40-59**: Partial match, missing some requirements
- **Below 40**: Poor match, significant gaps

### Evaluation Criteria

The evaluation considers:
1. Technical skill alignment
2. Years of experience
3. Educational background
4. Specific technologies/tools mentioned
5. Project experience
6. Problem-solving ability

## Document Processing

### Supported Formats

- **PDF** (.pdf)
  - Text-based PDFs work best
  - Scanned PDFs may have lower accuracy
  - Maximum 10MB

- **Word** (.doc, .docx)
  - Works with all Word formats
  - Preserves formatting and structure
  - Maximum 10MB

### Extraction Process

1. File is uploaded to the browser
2. JavaScript processes the file (client-side)
3. Text is extracted using:
   - pdfjs-dist for PDFs
   - mammoth for Word documents
4. Extracted text is sent to AI evaluator
5. No data leaves your browser until sent to AI

### Troubleshooting Extraction

If extraction has issues:

1. **Blurry PDFs**: Try converting to Word first
2. **Image-based PDFs**: Extract text to Word using online tools
3. **Complex Formatting**: Simple, clean resumes work best
4. **Special Characters**: Unicode is supported

## Managing Applications

### Viewing Application Metrics

The dashboard displays:
- **Real-time counts** of applications
- **Status distribution** (accepted vs rejected)
- **Average performance** metric

### Filtering and Searching

Current filtering options:
- By status (All/Accepted/Rejected)
- Applications are sorted by submission date (newest first)

### Exporting Data

To export applications:
1. Open browser developer tools (F12)
2. Run: `JSON.stringify(JSON.parse(localStorage.getItem('hr_applications')), null, 2)`
3. Copy the output
4. Paste into a text file or JSON viewer

## Customization Examples

### Change Required Skills

Edit `lib/jobRequirements.ts`:

```typescript
export const JOB_REQUIREMENTS = {
  title: "Full Stack Developer",
  requiredSkills: [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "REST API"
  ],
  // ... rest of config
};
```

### Update Experience Requirements

```typescript
requiredExperience: "5+ years of professional development experience"
```

### Customize Evaluation Prompt

```typescript
evaluationCriteria: `You are an AI hiring manager. Evaluate candidates for [Position] role.
Key evaluation points:
1. Technical proficiency
2. Problem-solving approach
3. Team collaboration skills
[... your custom criteria]`
```

## Best Practices

### For Applicants

1. **Ensure Resume Quality**
   - Use clear, readable format
   - List relevant skills and experience
   - Include quantifiable achievements
   - Use standard resume format

2. **Be Accurate**
   - Provide correct contact information
   - List actual skills you possess
   - Accurate years of experience

3. **Choose Relevant Resume**
   - Tailor resume to the position
   - Highlight matching skills prominently
   - Include relevant certifications

### For HR Teams

1. **Review Regularly**
   - Check dashboard frequently for new applications
   - Review both accepted and rejected candidates
   - AI is a tool - review edge cases manually

2. **Verify AI Decisions**
   - Read the extracted resume text
   - Review the AI reasoning
   - Make final hiring decisions independently

3. **Use Multiple Criteria**
   - AI evaluation is one factor
   - Consider cultural fit
   - Verify claims in resume
   - Conduct interviews for final candidates

## Common Issues and Solutions

### "Resume file is required"
- Make sure you've selected a file before clicking submit
- Refresh the page and try again

### "AI evaluation failed"
- Check internet connection
- Verify API key/Gateway access
- Try again in a few moments
- Try with a different resume

### "Resume text not extracting"
- Check if PDF is text-based (not scanned image)
- Try converting to Word and reuploading
- Check console for specific error messages
- Ensure file is not corrupted

### Applications disappear
- Browser cache cleared?
- Check if you're in private/incognito mode
- Try opening in regular browser window
- Check localStorage in developer tools

### Slow evaluation
- Large resumes take longer to process
- Network latency affects speed
- API rate limits may apply
- This is normal - wait for completion

## Advanced Features

### Accessing Raw Data

View stored applications in browser console:

```javascript
// Get all applications
const apps = JSON.parse(localStorage.getItem('hr_applications'));
console.log(apps);

// Get specific application
const app = apps.find(a => a.id === 'app_id');
console.log(app);

// Get all accepted candidates
const accepted = apps.filter(a => a.status === 'ACCEPTED');
console.log(accepted);
```

### Clearing Data

To clear all applications:

```javascript
localStorage.removeItem('hr_applications');
```

## Feedback and Suggestions

Areas for enhancement:
1. Database backend for persistence
2. Email notifications
3. Interview scheduling
4. Document storage
5. Advanced filtering and search
6. Batch processing
7. Analytics dashboard
8. Multi-language support

## FAQ

**Q: Can applicants see the evaluation criteria?**
A: No, only the result. You can customize the landing page to explain the evaluation process.

**Q: Can we adjust AI decisions?**
A: No in current version. Manual review would require database backend.

**Q: How long do applications stay stored?**
A: Until browser cache is cleared or localStorage is manually deleted.

**Q: Can we add more fields to the application?**
A: Yes, edit `ApplicationForm.tsx` and update types in `lib/types.ts`.

**Q: Can we use different job requirements per application?**
A: Current version has one job. For multiple jobs, create different deployments or modify to support multiple requirements.

**Q: Is data secure?**
A: Data is stored locally in browser and processed through API. For production, use encrypted database and secure API endpoints.

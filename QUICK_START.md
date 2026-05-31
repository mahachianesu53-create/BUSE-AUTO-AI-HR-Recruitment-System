# Quick Start Guide

Get the HR recruitment system running in 5 minutes!

## Step 1: Start the Server

The dependencies are already installed. Just start the development server:

```bash
pnpm dev
```

Wait for the output: `ready - started server on 0.0.0.0:3000`

## Step 2: Open in Browser

Open your browser and go to:

- **Landing Page**: http://localhost:3000
- **Applicant Portal**: http://localhost:3000/apply
- **HR Dashboard**: http://localhost:3000/hr

## Step 3: Test the System

### As an Applicant

1. Go to http://localhost:3000/apply
2. Fill in the form:
   - **Name**: John Doe
   - **Email**: john@example.com
   - **Phone**: (555) 123-4567
3. Click "Choose File" and select a resume (PDF or Word)
4. Click "Submit Application"
5. Wait for AI evaluation (10-30 seconds)
6. See your match score and feedback

### As HR

1. Go to http://localhost:3000/hr
2. See the dashboard with statistics
3. View the application you just submitted
4. Click "View Details" to see full profile
5. Review:
   - Extracted resume text
   - AI evaluation reasoning
   - Match score
   - Key strengths identified
   - Areas for development

## Step 4 (Optional): Customize Job Requirements

To customize for your specific job:

1. Open `lib/jobRequirements.ts`
2. Change the `title` field to your job position
3. Update `requiredSkills` array
4. Modify `requiredExperience` text
5. Save the file
6. Changes take effect immediately (Next.js hot reload)

**Example: Change to "Product Manager"**

```typescript
export const JOB_REQUIREMENTS = {
  title: "Product Manager",
  requiredSkills: [
    "Product Strategy",
    "User Research",
    "Data Analysis",
    "Roadmap Planning"
  ],
  requiredExperience: "3+ years of product management",
  // ... rest of configuration
};
```

See [CONFIGURATION_EXAMPLES.md](./CONFIGURATION_EXAMPLES.md) for more examples.

## What's What

### File Upload
- Accepts PDF and Word documents
- Maximum 10MB file size
- Text is extracted client-side
- No data leaves your computer until sent to AI evaluator

### AI Evaluation
- Uses OpenAI's GPT-4 Turbo
- Analyzes resume against job requirements
- Generates match score (0-100)
- Provides reasoning for decision
- Lists strengths and gaps

### Data Storage
- Applications stored in browser localStorage
- No database needed for demo
- Data persists across sessions
- Can be exported as JSON

### HR Dashboard
- Shows all applications received
- Filter by status (Accepted/Rejected)
- View detailed profiles
- Access full resume text
- See match scores

## Common Tasks

### Submit Another Application
1. Go to /apply
2. Click "Submit Another Application" button
3. Fill form with new candidate info
4. Upload resume and submit

### View All Applications
1. Go to /hr
2. Click "All" tab
3. Scroll through list
4. Click any to view details

### See Only Accepted Candidates
1. Go to /hr
2. Click "Accepted" tab
3. View candidates who passed AI screening

### Export Applications as JSON
1. Open browser DevTools (F12)
2. Go to Console tab
3. Run this command:
```javascript
JSON.stringify(JSON.parse(localStorage.getItem('hr_applications')), null, 2)
```
4. Copy and paste into a text editor

### Clear All Applications
1. Open browser DevTools (F12)
2. Go to Console tab
3. Run this command:
```javascript
localStorage.removeItem('hr_applications')
```

## Troubleshooting

### Server Won't Start
```bash
# Make sure you're in the right directory
cd /vercel/share/v0-project

# Kill any existing process
pkill -f "pnpm dev"

# Try starting again
pnpm dev
```

### Port 3000 Already in Use
```bash
# Use a different port
PORT=3001 pnpm dev
```

### Resume Won't Upload
- Check file is PDF or Word (.pdf, .doc, .docx)
- Check file size is less than 10MB
- Try a different file
- Try in an incognito browser window

### AI Evaluation Hangs
- Check internet connection
- Wait longer (can take 30+ seconds for long resumes)
- Try a shorter resume
- Refresh and try again

### Applications Disappear
- Check if you cleared browser cache
- Use a regular browser window (not incognito)
- Check browser console for errors (F12)

## Next Steps

Once comfortable with the system:

1. **Read Full Setup Guide**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. **Learn Usage Details**: [USAGE_GUIDE.md](./USAGE_GUIDE.md)
3. **Explore Configuration Options**: [CONFIGURATION_EXAMPLES.md](./CONFIGURATION_EXAMPLES.md)
4. **Customize Styling**: Edit `app/globals.css`
5. **Add More Fields**: Modify form components

## Architecture Overview

```
Browser                           Internet
┌──────────────────┐             ┌───────────┐
│ Applicant Portal │ ──resume──→ │ OpenAI    │
│                  │             │ GPT-4     │
│ /apply           │ ←─eval───── │ Turbo     │
│                  │             └───────────┘
│ [Form Input]     │
│ [Upload File]    │
│ [AI Evaluation]  │
│                  │
│ localStorage ←──→│ [Stores apps]
└──────────────────┘
        ↓↑
┌──────────────────┐
│ HR Dashboard     │
│                  │
│ /hr              │
│                  │
│ [View Apps]      │
│ [Filter Stats]   │
│ [View Details]   │
└──────────────────┘
```

## Features at a Glance

| Feature | Status | Details |
|---------|--------|---------|
| Applicant Form | ✓ | Name, email, phone |
| Resume Upload | ✓ | PDF and Word files |
| Text Extraction | ✓ | pdfjs-dist & mammoth |
| AI Evaluation | ✓ | GPT-4 Turbo powered |
| Match Scoring | ✓ | 0-100 percentage |
| HR Dashboard | ✓ | All applications view |
| Filtering | ✓ | By accepted/rejected |
| Detail View | ✓ | Full candidate profile |
| Data Persistence | ✓ | localStorage |
| Mobile Responsive | ✓ | Works on all devices |

## Pro Tips

1. **Test with Different Resumes**
   - Technical resumes score differently than non-technical
   - Short vs. long resumes may evaluate differently
   - Try matching and non-matching resumes to see differences

2. **Check Extracted Text**
   - In HR dashboard, view the extracted resume text
   - This is what the AI saw when evaluating
   - OCR quality affects evaluation quality

3. **Adjust Job Requirements**
   - Change requirements to see how evaluations change
   - More specific requirements = lower match scores
   - Broader requirements = higher match scores

4. **Review AI Reasoning**
   - Pay attention to why AI accepted or rejected
   - This helps you understand the matching logic
   - Use this feedback to refine your requirements

## Questions?

- See [README_PROJECT.md](./README_PROJECT.md) for complete documentation
- See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
- See [USAGE_GUIDE.md](./USAGE_GUIDE.md) for detailed usage
- See [CONFIGURATION_EXAMPLES.md](./CONFIGURATION_EXAMPLES.md) for job examples

**You're all set! Enjoy exploring the AI HR recruitment system!**

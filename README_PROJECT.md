# AI-Powered HR Auto-Shortlisting System

An intelligent recruitment platform that leverages AI to automatically evaluate and shortlist job applicants. The system extracts text from resumes, analyzes them against job requirements, and provides HR teams with pre-screened candidates.

## Features

### Applicant Portal
- Easy application form with resume upload (PDF/Word)
- Automatic resume text extraction
- AI-powered instant evaluation
- Real-time match scoring (0-100%)
- Immediate feedback on application status
- Clear visibility into evaluation reasoning

### HR Dashboard
- Comprehensive overview of all applications
- Statistics dashboard with key metrics
- Filter candidates by status (Accepted/Rejected)
- Detailed application profiles with:
  - Full extracted resume text
  - AI evaluation reasoning
  - Match scores
  - Identified strengths
  - Skill gaps
  - Contact information

### AI Evaluation Engine
- GPT-4 Turbo powered evaluation
- Structured assessment of candidate qualifications
- Customizable job requirements
- Smart matching against position needs
- Detailed decision reasoning

## Quick Links

- **Setup Guide**: [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Installation and configuration
- **Usage Guide**: [USAGE_GUIDE.md](./USAGE_GUIDE.md) - How to use the system
- **Configuration Examples**: [CONFIGURATION_EXAMPLES.md](./CONFIGURATION_EXAMPLES.md) - Job role examples
- **Live Demo**: `http://localhost:3000` (after running `pnpm dev`)

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│           HR Recruitment Platform                   │
└─────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
    ┌───▼────┐      ┌───▼────┐     ┌────▼────┐
    │ Landing │      │Applicant│     │  HR     │
    │  Page   │      │ Portal  │     │Dashboard│
    │(/)      │      │(/apply) │     │(/hr)    │
    └─────────┘      └────┬────┘     └────┬────┘
                          │               │
        ┌─────────────────┼───────────────┤
        │                 │               │
    ┌───▼──────────┐  ┌───▼──────────┐  │
    │Resume Upload │  │AI Evaluator  │  │
    │& Extraction  │  │(GPT-4 Turbo) │  │
    │              │  │              │  │
    │• pdfjs-dist  │  │• generateObj │  │
    │• mammoth     │  │• zod schema  │  │
    └──────────────┘  └──────────────┘  │
                                       │
                          ┌────────────▼────────┐
                          │ localStorage        │
                          │ (Application Store) │
                          └─────────────────────┘
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form + Zod validation
- **Document Processing**:
  - PDF: pdfjs-dist
  - Word: mammoth
- **AI Integration**: Vercel AI SDK v6 with OpenAI
- **State Management**: React hooks + localStorage

## File Structure

```
app/
├── page.tsx                          # Landing page
├── layout.tsx                        # Root layout
├── globals.css                       # Global styles
├── apply/                            # Applicant portal
│   ├── page.tsx                     # Server component
│   └── ApplyPageClient.tsx          # Client component
└── hr/                               # HR dashboard
    ├── page.tsx                     # Server component
    └── HRDashboardPageClient.tsx    # Client component

components/
├── ui/                               # shadcn/ui components
├── ApplicationForm.tsx               # Applicant form with validation
├── ApplicationSuccess.tsx            # Success/failure feedback
├── HRDashboard.tsx                   # Dashboard overview and filtering
└── ApplicationDetails.tsx            # Detailed application view

lib/
├── types.ts                          # TypeScript interfaces
├── jobRequirements.ts               # Job spec configuration
├── documentExtractor.ts             # PDF/Word text extraction
├── aiMatcher.ts                     # AI evaluation logic
└── applicationStorage.ts            # localStorage management
```

## Getting Started

### 1. Prerequisites
- Node.js 18+ or 20+
- pnpm (or npm/yarn)
- OpenAI API key (or Vercel AI Gateway access)

### 2. Installation

```bash
# Install dependencies (already done)
pnpm install

# Start development server
pnpm dev

# Open in browser
# http://localhost:3000
```

### 3. First Time Setup

1. **Configure Job Requirements** (optional)
   - Edit `lib/jobRequirements.ts` to customize for your role
   - See [CONFIGURATION_EXAMPLES.md](./CONFIGURATION_EXAMPLES.md) for examples

2. **Set OpenAI API Key** (if not using Vercel AI Gateway)
   - Add `OPENAI_API_KEY` to `.env.local`

3. **Test the System**
   - Go to `/apply` - submit a test application
   - Go to `/hr` - review the application

### 4. Customize for Production

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed production setup steps.

## How It Works

### Application Submission Flow

1. **User Submits Application**
   ```
   Applicant fills form (name, email, phone)
   → Uploads resume (PDF or Word)
   → Form validates all inputs
   ```

2. **Resume Processing**
   ```
   File uploaded to browser
   → Text extracted (client-side)
   → Content prepared for AI
   ```

3. **AI Evaluation**
   ```
   Resume text sent to GPT-4
   → AI evaluates against job requirements
   → Generates match score (0-100)
   → Identifies strengths and gaps
   → Makes ACCEPT/REJECT decision
   ```

4. **Application Saved**
   ```
   Results stored in localStorage
   → Applicant sees feedback
   → HR dashboard updated
   ```

5. **HR Review**
   ```
   HR views dashboard
   → Filters by status
   → Reviews detailed profiles
   → Accesses extracted text
   ```

## Usage Examples

### For Job Applicants

```
1. Visit http://localhost:3000/apply
2. Fill in your information
3. Upload your resume
4. Click "Submit Application"
5. Receive instant evaluation
6. View match score and feedback
```

### For HR Teams

```
1. Visit http://localhost:3000/hr
2. View dashboard statistics
3. Use tabs to filter applications
4. Click "View Details" on candidates of interest
5. Review AI evaluation and extracted resume
6. Make hiring decisions
```

## Customization

### Change Job Requirements

Edit `lib/jobRequirements.ts`:

```typescript
export const JOB_REQUIREMENTS = {
  title: "Your Job Title",
  requiredSkills: ["Skill1", "Skill2"],
  // ... more configuration
};
```

### Adjust Evaluation Criteria

Modify the `evaluationCriteria` string to change how AI evaluates candidates.

### Customize UI

- Colors: Edit `app/globals.css` and Tailwind classes
- Layout: Modify component JSX in `components/`
- Forms: Update validation in `ApplicationForm.tsx`

## Deployment

### To Vercel (Recommended)

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Deploy to Vercel
# Go to https://vercel.com and import repository
```

### To Other Platforms

The app is a standard Next.js 16 application. It can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Render
- Any Node.js hosting

## Environment Variables

### Development (Optional)

```bash
# If using OpenAI API directly (instead of Vercel AI Gateway)
OPENAI_API_KEY=sk_your_key_here
```

### Production (Required for production use)

- OpenAI API key for AI evaluations
- Database connection (if replacing localStorage)
- Email service credentials (for notifications)

## Troubleshooting

### Applications Not Saving

```javascript
// Check localStorage in browser console
localStorage.getItem('hr_applications')

// Clear if needed
localStorage.removeItem('hr_applications')
```

### Resume Extraction Fails

- Verify PDF is text-based (not scanned)
- Try converting to Word format
- Check file size is under 10MB

### AI Evaluation Errors

- Verify OpenAI API key is correct
- Check API quota is available
- Try with different resume format

### Port Already in Use

```bash
# Kill process using port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 pnpm dev
```

## Performance Considerations

- **Document Extraction**: 2-5 seconds for typical resumes
- **AI Evaluation**: 10-30 seconds (depends on resume length)
- **Dashboard Load**: Instant for <1000 applications
- **localStorage Limit**: ~5-10MB per origin (supports ~1000+ applications)

## Security Notes

- **Current Version**: Frontend-only with localStorage
- **For Production**:
  - Move to backend database (Supabase, PostgreSQL, etc.)
  - Implement authentication for HR portal
  - Use secure API endpoints
  - Encrypt sensitive data
  - Add HTTPS enforcement
  - Implement rate limiting

## Future Enhancements

Potential features for production:

1. **Database Integration**
   - Replace localStorage with Supabase/PostgreSQL
   - Better data persistence and backup

2. **Authentication**
   - HR portal user login
   - Role-based access control
   - Admin features

3. **Notifications**
   - Email applicants their status
   - Notify HR of new applications
   - Custom notification templates

4. **File Storage**
   - Store original resumes in cloud
   - Access resume files from HR dashboard
   - Version history

5. **Advanced Features**
   - Multiple job positions
   - Interview scheduling
   - Candidate notes and feedback
   - Bulk operations
   - Advanced filtering and search
   - Analytics dashboard

6. **Integrations**
   - Email service (SendGrid, Mailgun)
   - Calendar (Google Calendar, Outlook)
   - Video interview platform
   - CRM system

7. **Multi-language Support**
   - Support resumes in multiple languages
   - Internationalization (i18n)

## Support & Documentation

- **Setup**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Usage**: See [USAGE_GUIDE.md](./USAGE_GUIDE.md)
- **Configuration**: See [CONFIGURATION_EXAMPLES.md](./CONFIGURATION_EXAMPLES.md)
- **Code Comments**: All components have inline documentation
- **GitHub Issues**: Report bugs and request features

## License

This project is provided as-is for educational and internal use.

## Contributing

To contribute improvements:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Contact & Questions

For questions or support:
- Review the documentation files
- Check browser console for error messages
- Verify all configuration is correct
- Test with different resume formats

---

**Ready to get started?** Follow the [SETUP_GUIDE.md](./SETUP_GUIDE.md) to configure and run your system!

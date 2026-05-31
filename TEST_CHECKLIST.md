# System Test Checklist

Use this checklist to verify all features are working correctly.

## Pre-Test Setup

- [ ] Run `pnpm dev` successfully
- [ ] System running on localhost:3000
- [ ] No console errors on startup
- [ ] Browser DevTools open (F12) for error monitoring

## Landing Page Tests (`/`)

- [ ] Page loads without errors
- [ ] Title "Join Our Team" visible
- [ ] Navigation bar displays correctly
- [ ] "Apply Now" button visible
- [ ] "HR Portal" button visible
- [ ] Two feature cards visible
- [ ] "Start Application" button works
- [ ] "Go to Dashboard" button works
- [ ] How It Works section visible
- [ ] Responsive on mobile (resize browser)

## Applicant Portal Tests (`/apply`)

### Form Display
- [ ] Form loads on /apply
- [ ] All fields visible:
  - [ ] Full Name field
  - [ ] Email Address field
  - [ ] Phone Number field
  - [ ] Resume upload area
- [ ] Form labels are clear
- [ ] Description text visible

### Form Validation
- [ ] Name validation: Try submit with empty name → shows error
- [ ] Email validation: Try invalid email → shows error
- [ ] Phone validation: Try invalid phone → shows error
- [ ] Resume validation: Try submit without resume → shows error
- [ ] File type validation: Try uploading .txt file → shows error
- [ ] File size validation: Large file rejected

### Resume Upload
- [ ] Click upload area → file picker opens
- [ ] Can select PDF file
- [ ] Can select Word file (.docx)
- [ ] Can select Word file (.doc)
- [ ] File name displays after selection
- [ ] Can change file selection

### Form Submission
- [ ] Fill all fields correctly
- [ ] Upload valid resume (PDF)
- [ ] Click "Submit Application"
- [ ] "Extracting resume content..." message appears
- [ ] Spinner displays
- [ ] Wait for completion (10-30 seconds)
- [ ] Form processing completes

### Evaluation Results
- [ ] Success page displays
- [ ] Status badge shows (ACCEPTED or REJECTED)
- [ ] Match score displays (0-100%)
- [ ] Evaluation notes visible
- [ ] Key strengths section displays
- [ ] Areas for development section displays
- [ ] Color coding correct (green for ACCEPTED, red for REJECTED)

### Success Page Actions
- [ ] "Submit Another Application" button works
- [ ] Clicking it returns to blank form
- [ ] Can submit multiple applications

### Error Handling
- [ ] If AI fails, error message displays
- [ ] Can retry after error
- [ ] Error messages are helpful

## HR Dashboard Tests (`/hr`)

### Dashboard Load
- [ ] Dashboard loads on /hr
- [ ] No console errors
- [ ] Layout renders correctly

### Statistics Display
- [ ] Total Applications card visible
- [ ] Total applications count correct
- [ ] Accepted card visible
- [ ] Accepted count correct
- [ ] Rejected card visible
- [ ] Rejected count correct
- [ ] Avg Match Score card visible
- [ ] Average score calculated correctly
- [ ] Cards show proper formatting

### Application Filtering

#### All Tab
- [ ] Click "All" tab
- [ ] Shows all applications
- [ ] Count matches total
- [ ] Each app shows name, email, phone
- [ ] Status badges display correctly
- [ ] Match scores visible
- [ ] "View Details" buttons present

#### Accepted Tab
- [ ] Click "Accepted" tab
- [ ] Shows only ACCEPTED applications
- [ ] Count matches accepted number
- [ ] All shown have ACCEPTED badge
- [ ] Empty message if no accepted apps

#### Rejected Tab
- [ ] Click "Rejected" tab
- [ ] Shows only REJECTED applications
- [ ] Count matches rejected number
- [ ] All shown have REJECTED badge
- [ ] Empty message if no rejected apps

### Application Card Display
- [ ] Candidate name visible
- [ ] Status badge color correct
- [ ] Email address shown
- [ ] Phone number shown
- [ ] Match score prominent
- [ ] Card is clickable
- [ ] Hover effect works

## Application Details Tests

### Navigation
- [ ] Click "View Details" on any application
- [ ] Details page loads
- [ ] "Back to Applications" button visible
- [ ] Click back button → returns to dashboard
- [ ] Correct application loads

### Contact Information Section
- [ ] Email address displays
- [ ] Phone number displays
- [ ] Resume filename shows
- [ ] All information correct

### AI Evaluation Section
- [ ] Evaluation notes visible
- [ ] Notes are from correct app
- [ ] Key strengths list displays
- [ ] Each strength on separate line
- [ ] Areas for development list displays
- [ ] Each gap on separate line

### Job Requirements Section
- [ ] Required skills show as badges
- [ ] Required experience text visible
- [ ] Required education text visible
- [ ] Nice to have skills show as badges
- [ ] Separator visible between sections

### Extracted Resume Text Section
- [ ] "View Full Resume" button visible
- [ ] Preview text shows first 500 chars
- [ ] Can see truncated resume preview
- [ ] Click "View Full Resume"
- [ ] Modal opens with full text
- [ ] Modal shows complete resume
- [ ] Modal close button works
- [ ] Can scroll through long text

### Header Display
- [ ] Back button has icon
- [ ] Candidate name in header
- [ ] Status badge in header
- [ ] Match score prominent
- [ ] Correct header coloring (green/red)

## Integration Tests

### End-to-End Flow
- [ ] Go to /apply
- [ ] Submit complete application
- [ ] See evaluation results
- [ ] Go to /hr
- [ ] See new application in list
- [ ] Click View Details
- [ ] See all application information
- [ ] See extracted resume text
- [ ] See evaluation details
- [ ] Back to dashboard works

### Data Persistence
- [ ] Submit an application
- [ ] Refresh page with F5
- [ ] Application still in dashboard
- [ ] Details still show same info
- [ ] Open in new tab
- [ ] Data persists (localStorage)

### Multiple Applications
- [ ] Submit first application
- [ ] Submit second application
- [ ] Both visible in dashboard
- [ ] Both have different details
- [ ] Filtering works with multiple apps
- [ ] Counts update correctly

## Browser Compatibility

Test in different browsers:

### Chrome
- [ ] All features work
- [ ] No console errors
- [ ] Responsive design works

### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] Responsive design works

### Safari
- [ ] All features work
- [ ] No console errors
- [ ] Responsive design works

### Edge
- [ ] All features work
- [ ] No console errors
- [ ] Responsive design works

## Responsive Design Tests

### Mobile (375px width)
- [ ] Landing page responsive
- [ ] Form stacks vertically
- [ ] Buttons full width
- [ ] Dashboard cards readable
- [ ] Application list scrolls
- [ ] Modal content readable
- [ ] Navigation works

### Tablet (768px width)
- [ ] Layout adjusts appropriately
- [ ] Two-column layout where applicable
- [ ] Cards readable
- [ ] Form usable

### Desktop (1920px width)
- [ ] Full layout displays
- [ ] No excessive whitespace
- [ ] Cards aligned properly
- [ ] Text readable

## Performance Tests

- [ ] Form loads in <2 seconds
- [ ] Dashboard loads in <2 seconds
- [ ] Resume extraction: 2-5 seconds
- [ ] AI evaluation: 10-30 seconds
- [ ] Detail view loads instantly
- [ ] Filtering is instant
- [ ] No lag when scrolling

## Styling & UX Tests

### Colors
- [ ] ACCEPTED = Green (bright)
- [ ] REJECTED = Red (clear)
- [ ] Match score color gradient works
- [ ] Background colors consistent
- [ ] Text contrast accessible

### Typography
- [ ] Headers clearly different from body
- [ ] Body text readable
- [ ] Forms labels clear
- [ ] Error messages red
- [ ] Success messages green

### Layout
- [ ] Proper spacing throughout
- [ ] Alignment consistent
- [ ] Padding/margins consistent
- [ ] Cards visually distinct
- [ ] Sections separated clearly

### Interactions
- [ ] Hover states visible on buttons
- [ ] Buttons have cursor pointer
- [ ] Form fields highlight on focus
- [ ] Dropdowns/modals styled well
- [ ] Icons display correctly

## Accessibility Tests

- [ ] Can tab through form fields
- [ ] Tab order logical
- [ ] Form labels associated with fields
- [ ] Error messages linked to fields
- [ ] Color not only indicator
- [ ] Alt text for images (if any)
- [ ] Good contrast ratios

## Error Scenarios

### Resume Extraction
- [ ] Corrupt PDF → error message
- [ ] Encrypted PDF → error message
- [ ] Large PDF (10+MB) → error message
- [ ] Scanned image PDF → extracts something
- [ ] Empty Word doc → extracts (empty)
- [ ] Complex formatting → extracts text

### Network Issues
- [ ] Slow network → loading indicator
- [ ] Failed API call → error message
- [ ] Timeout → handled gracefully
- [ ] Can retry after failure

### Data Issues
- [ ] Special characters in name → handled
- [ ] Non-ASCII characters → handled
- [ ] Very long resume → processed
- [ ] Very short resume → processed

## Edge Cases

- [ ] Submit same resume twice → both stored
- [ ] Submit with minimum info → works
- [ ] Resume with lots of technical terms → evaluates
- [ ] Resume with missing sections → still evaluates
- [ ] Clear localStorage → fresh start works
- [ ] Phone with + sign → accepted
- [ ] Email with subdomain → accepted

## Test Data

### Sample Resumes to Test
- [ ] Technical resume (software engineer)
- [ ] Non-technical resume (manager, designer)
- [ ] Entry-level resume (few years experience)
- [ ] Senior-level resume (10+ years)
- [ ] Resume with gaps
- [ ] Resume with many skills

### Sample Form Data
- [ ] Standard US phone: (555) 123-4567
- [ ] International phone: +1 555 123 4567
- [ ] With dots email: john.doe@example.com
- [ ] With dash in name: Jean-Pierre
- [ ] Special characters: Müller, José, etc.

## Cleanup After Testing

- [ ] Clear all test data from localStorage
  ```javascript
  localStorage.removeItem('hr_applications')
  ```
- [ ] Close all open modals
- [ ] Return to home page
- [ ] Check for any lingering errors in console
- [ ] Refresh page to ensure clean state

## Test Results Summary

| Category | Status | Notes |
|----------|--------|-------|
| Landing Page | ☐ Pass ☐ Fail | |
| Applicant Form | ☐ Pass ☐ Fail | |
| Form Validation | ☐ Pass ☐ Fail | |
| Resume Upload | ☐ Pass ☐ Fail | |
| AI Evaluation | ☐ Pass ☐ Fail | |
| Success Page | ☐ Pass ☐ Fail | |
| HR Dashboard | ☐ Pass ☐ Fail | |
| Filtering | ☐ Pass ☐ Fail | |
| Details View | ☐ Pass ☐ Fail | |
| Responsive | ☐ Pass ☐ Fail | |
| Performance | ☐ Pass ☐ Fail | |
| Error Handling | ☐ Pass ☐ Fail | |

## Notes

Use this space to document issues found:

```
Date: ________
Issue: ________________________________________
Steps to Reproduce: ___________________________
Expected: ______________________________________
Actual: _________________________________________
Browser: ________________________________________
Resolution: _____________________________________
```

## Sign Off

- [ ] All critical features tested
- [ ] No blocking issues
- [ ] System ready for use
- [ ] Documentation complete

Tested by: ________________  Date: ____________

---

**Ready for production?** See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for deployment instructions.

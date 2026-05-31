# Quick Guide to New Features

## 🎯 What's New

The HR Auto-Shortlisting System now includes **job management**, **application deadlines**, and **email communication** features.

---

## 👨‍💼 For HR Managers

### Step 1: Create a New Job Position

**Path**: Go to `/hr` → Job Positions section

1. Click **"Add New Job Position"** button
2. Fill in the form:
   - **Job Title**: e.g., "Senior Software Engineer"
   - **Job Description**: e.g., "We're looking for an experienced engineer..."
   - **Requirements**: Add each requirement one by one:
     - Click the field, type requirement, click "Add"
     - Examples: "5+ years JavaScript", "React expertise", "Team leadership"
   - **Application Deadline**: Set date and time when applications close
3. Click **"Create Job Position"**
4. Job appears in Active Jobs list immediately

### Step 2: View Submitted Applications

**Path**: Go to `/hr` → Tabs section

- **Accepted**: Shows applicants who passed AI evaluation
- **Rejected**: Shows applicants who didn't match requirements
- Click on any application to see full details

### Step 3: Send Email to Accepted Applicants

**Path**: Go to `/hr` → Click on accepted applicant → Click "Send Email"

1. Modal opens with applicant's email
2. Edit the subject line (default: "Interview Invitation")
3. Edit the message (template provided)
4. Click **"Send Email"**
5. Badge changes to show "Email Sent"
6. Timestamp recorded when email was sent

---

## 👤 For Job Applicants

### Step 1: View Available Positions

**Path**: Go to `/apply`

You'll see:
- **Job Title** at the top
- **Job Description** in the alert box
- **All Requirements** listed with checkmarks
- **Application Deadline** clearly displayed

### Step 2: Check if Deadline Passed

Look at the deadline section:
- **Blue alert** = Position still open, apply now!
- **Red alert with clock icon** = Applications closed, cannot apply

### Step 3: Select Position (if multiple jobs)

If there are multiple open positions:
1. See job cards at the top
2. Click the job you want to apply for
3. Details update below

### Step 4: Submit Application

1. Fill in your details:
   - Full Name
   - Email Address
   - Phone Number
2. Upload your resume (PDF or Word)
3. Click **"Submit Application"**
4. AI evaluates your resume (10-30 seconds)

### Step 5: Check Results

If **ACCEPTED** (✓ Green):
- Message: "Your profile matches our requirements"
- Important: "Please keep checking your emails for interview details!"
- HR will send you an interview invitation email

If **REJECTED** (✗ Red):
- Message: "Your application does not meet our current requirements"
- You can apply for other open positions

---

## 🔑 Key Features Explained

### Job Management
- HR can create multiple job positions
- Each job has its own requirements and deadline
- Jobs are displayed to applicants with full details

### Application Deadlines
- Set when creating a job
- Applicants cannot apply after deadline
- Visual indicator (red) shows when deadline passed

### Email Communication
- HR sends emails to accepted applicants
- System tracks which applicants received emails
- Applicants see clear message to check their emails

### Centered Form
- Application form is centered for better readability
- Works great on mobile and desktop
- Clear spacing and visual hierarchy

---

## 📊 Example Workflow

### Scenario: Hiring a Senior Software Engineer

**Day 1 - HR Manager Creates Job:**
1. Goes to `/hr`
2. Clicks "Add New Job Position"
3. Fills in:
   - Title: "Senior Software Engineer"
   - Description: "Build scalable systems..."
   - Requirements: "JavaScript", "React", "Node.js", "5+ years exp"
   - Deadline: December 20, 2024 at 5:00 PM
4. Job created ✅

**Day 2-15 - Applicants Apply:**
1. Candidates visit `/apply`
2. See job details and requirements
3. Upload their resume
4. AI evaluates (accepts/rejects)
5. See results instantly

**Day 20 - HR Reviews Applicants:**
1. Goes to `/hr`
2. Sees 15 applications (5 accepted, 10 rejected)
3. Reviews each accepted applicant's resume
4. For promising candidates, clicks "Send Email"
5. Sends interview invitation
6. Email status updated

**Day 21 - Applicants Check Email:**
1. Accepted applicants see success page
2. Message tells them to check email
3. They receive interview invitation
4. They schedule interview

---

## ⚙️ Settings & Customization

### Job Requirements Examples

**Software Engineer:**
- 5+ years JavaScript experience
- React expertise
- Node.js backend development
- Microservices architecture
- Team leadership skills

**Product Manager:**
- 3+ years product management
- Data-driven decision making
- Stakeholder management
- Agile/Scrum experience
- Technical product knowledge

**Data Scientist:**
- Python and R proficiency
- Machine learning algorithms
- SQL databases
- Statistical analysis
- 2+ years industry experience

---

## 💡 Tips & Tricks

### For HR:

1. **Set realistic deadlines**: Give applicants enough time (at least 1-2 weeks)
2. **Be specific with requirements**: This helps AI match better
3. **Customize email messages**: Make them personalized and friendly
4. **Review regularly**: Check dashboard daily for new applications
5. **Track email status**: Know who you've contacted and when

### For Applicants:

1. **Check deadline first**: Don't miss the deadline!
2. **Read all requirements**: See if you match before applying
3. **Check your email**: After acceptance, watch for interview invitation
4. **Quality over speed**: Take time to submit complete applications
5. **Multiple applications**: Can apply for different positions

---

## ❓ Frequently Asked Questions

### Q: Can I apply for multiple positions?
**A**: Yes! If there are multiple open jobs, you can select the one you want to apply for. You can only apply once per position.

### Q: What happens if I apply after the deadline?
**A**: You cannot submit your application. The form will be hidden and a message will tell you applications are closed.

### Q: When will I know the result?
**A**: Instantly! AI evaluates your resume immediately (usually 10-30 seconds).

### Q: Will I definitely get an interview if accepted?
**A**: Being accepted means you match the job requirements. HR will contact you if they want to schedule an interview.

### Q: How do I know if HR sent an email?
**A**: Check the success page message and your email inbox. Also look for the "Email Sent" badge on your application (visible to HR).

### Q: Can HR edit a job after creating it?
**A**: Currently, no. HR can create new jobs, but editing is not available yet.

### Q: Is this a real email system?
**A**: The demo shows how it works, but real email integration requires a backend service.

---

## 🚀 Getting Started Right Now

1. **For HR**: Go to `/hr` and create your first job position
2. **For Applicants**: Visit `/apply` and apply for the position
3. **Test the flow**: Submit an application and see the results

---

## Need Help?

- Check the `/hr` dashboard - shows statistics and job management
- Look at job requirements before applying
- Read the success/failure message carefully
- Email button only appears for accepted applicants

---

**Enjoy using the new HR Auto-Shortlisting System! 🎉**

# START HERE - AI HR Recruitment System

Welcome! This is your complete AI-powered HR auto-shortlisting system. Choose your path below:

## 🚀 I Want to Get Started NOW (5 minutes)

**→ Go to [QUICK_START.md](./QUICK_START.md)**

This file will get you up and running immediately with:
- How to start the dev server
- How to test the system
- Quick overview of the two portals
- Common tasks and troubleshooting

**TL;DR:**
```bash
pnpm dev
# Visit http://localhost:3000
```

---

## 📖 I Want to Understand the System First

**→ Go to [README_PROJECT.md](./README_PROJECT.md)**

Complete overview including:
- Feature list
- Architecture diagram
- File structure
- Tech stack explanation
- Getting started guide
- Customization options

---

## 🔧 I Need Detailed Setup Instructions

**→ Go to [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

Comprehensive setup guide covering:
- System overview
- Installation steps
- Configuration instructions
- Customization guide
- Production deployment
- Troubleshooting

---

## 💼 I Need to Know How to Use the System

**→ Go to [USAGE_GUIDE.md](./USAGE_GUIDE.md)**

Detailed user guide for:
- Using the applicant portal
- Using the HR dashboard
- Understanding AI evaluations
- Managing applications
- Advanced features
- FAQ and common issues

---

## ⚙️ I Need to Configure for My Job Position

**→ Go to [CONFIGURATION_EXAMPLES.md](./CONFIGURATION_EXAMPLES.md)**

Real-world examples for:
- Senior Software Engineer (default)
- Product Manager
- Data Scientist
- UX/UI Designer
- DevOps Engineer
- Frontend Developer
- Leadership roles
- Entry-level positions

Plus customization tips for your specific needs.

---

## 📊 Quick System Overview

### What This System Does

```
Applicant             AI Evaluator           HR Dashboard
    ↓                      ↓                       ↓
Submit Resume    →   Extract Text    →   Match Requirements   →   View Results
                      + Evaluate            + Score              + Filter
                                           + Reason              + Review
```

### Two Main Portals

#### 1. Applicant Portal (`/apply`)
- Candidates submit applications
- Upload resume (PDF or Word)
- Get instant AI evaluation
- See match score and feedback

#### 2. HR Dashboard (`/hr`)
- View all applications
- Filter by status (Accepted/Rejected)
- See AI evaluation reasoning
- Access full resume text
- Review candidate details

### How AI Evaluation Works

1. **Extract** - Resume text is extracted from PDF/Word
2. **Evaluate** - GPT-4 Turbo analyzes against job requirements
3. **Score** - Match score calculated (0-100%)
4. **Reason** - AI explains its decision
5. **Store** - Application saved with evaluation

---

## 📁 What's Included

### Code
- ✅ Complete React components
- ✅ AI evaluation system
- ✅ Resume processing
- ✅ Data management
- ✅ Responsive UI

### Documentation
- ✅ Quick Start Guide (5 min setup)
- ✅ Setup Guide (detailed)
- ✅ Usage Guide (how to use)
- ✅ Configuration Examples (job roles)
- ✅ Project README (full overview)
- ✅ Project Summary (what was built)

### Features
- ✅ Applicant portal with form
- ✅ AI-powered evaluation
- ✅ HR dashboard with analytics
- ✅ Application filtering
- ✅ Detailed candidate profiles
- ✅ Resume text extraction
- ✅ Responsive design

---

## 🎯 Common Paths

### I'm a Developer
1. Read [README_PROJECT.md](./README_PROJECT.md) - understand architecture
2. Run [QUICK_START.md](./QUICK_START.md) - get it running
3. Review [SETUP_GUIDE.md](./SETUP_GUIDE.md) - understand configuration
4. Explore the code in `app/`, `components/`, and `lib/`

### I'm an HR Manager
1. Follow [QUICK_START.md](./QUICK_START.md) - get started
2. Read [USAGE_GUIDE.md](./USAGE_GUIDE.md) - learn how to use
3. Customize with [CONFIGURATION_EXAMPLES.md](./CONFIGURATION_EXAMPLES.md)
4. Go to `/hr` to review applications

### I'm Setting Up for Production
1. Understand system with [README_PROJECT.md](./README_PROJECT.md)
2. Follow detailed steps in [SETUP_GUIDE.md](./SETUP_GUIDE.md)
3. See production considerations
4. Deploy with custom configuration

### I'm Trying Specific Role Configuration
1. Check [CONFIGURATION_EXAMPLES.md](./CONFIGURATION_EXAMPLES.md)
2. Find your role (e.g., "Product Manager")
3. Copy the configuration
4. Paste into `lib/jobRequirements.ts`
5. Test with sample resume

---

## ⚡ Quick Commands

```bash
# Start development server
pnpm dev

# Check TypeScript compilation
pnpm tsc --noEmit

# Build for production
pnpm build

# Start production build
pnpm start

# Run linter
pnpm lint
```

## 🌐 Access Portals

Once `pnpm dev` is running:

- **Landing Page**: http://localhost:3000
- **Applicant Portal**: http://localhost:3000/apply
- **HR Dashboard**: http://localhost:3000/hr

---

## ❓ FAQ

**Q: How long does setup take?**
A: 5 minutes to run. See [QUICK_START.md](./QUICK_START.md)

**Q: Do I need a database?**
A: No, it uses browser localStorage for demo. See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for production setup.

**Q: What resume formats are supported?**
A: PDF and Word documents (.pdf, .doc, .docx)

**Q: How is the AI evaluation done?**
A: Using OpenAI's GPT-4 Turbo model. See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for configuration.

**Q: Can I change the job requirements?**
A: Yes! Edit `lib/jobRequirements.ts`. See [CONFIGURATION_EXAMPLES.md](./CONFIGURATION_EXAMPLES.md) for examples.

**Q: How do I deploy this?**
A: See production section in [SETUP_GUIDE.md](./SETUP_GUIDE.md)

**Q: Are applications saved somewhere?**
A: Yes, in browser localStorage. See [USAGE_GUIDE.md](./USAGE_GUIDE.md) for exporting.

---

## 🚦 Your Next Steps

### Option 1: Just Try It (Recommended)
```bash
pnpm dev
# Open http://localhost:3000/apply
# Submit a test application
# Go to http://localhost:3000/hr to see it
```

### Option 2: Understand First
1. Read [README_PROJECT.md](./README_PROJECT.md) (10 minutes)
2. Then follow Option 1

### Option 3: Full Setup
1. Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) (20 minutes)
2. Configure for your job role
3. Deploy to production

---

## 📚 Documentation Map

```
START_HERE.md (you are here)
│
├─ QUICK_START.md ...................... Get running in 5 minutes
│
├─ README_PROJECT.md ................... Complete system overview
│  ├─ Architecture explanation
│  ├─ File structure
│  ├─ Tech stack details
│  └─ Deployment info
│
├─ SETUP_GUIDE.md ...................... Detailed setup instructions
│  ├─ Installation steps
│  ├─ Configuration options
│  ├─ Customization guide
│  └─ Production checklist
│
├─ USAGE_GUIDE.md ...................... How to use the system
│  ├─ Applicant portal instructions
│  ├─ HR dashboard guide
│  ├─ AI evaluation details
│  ├─ Advanced features
│  └─ FAQ
│
├─ CONFIGURATION_EXAMPLES.md ........... Job role examples
│  ├─ Senior Software Engineer (default)
│  ├─ Product Manager
│  ├─ Data Scientist
│  ├─ Designer
│  ├─ DevOps Engineer
│  ├─ Frontend Developer
│  ├─ Leadership roles
│  └─ Entry-level positions
│
└─ PROJECT_SUMMARY.md .................. What was built
   ├─ Feature list
   ├─ File structure
   ├─ Code statistics
   └─ Roadmap
```

---

## 🎓 Learning Path

1. **Beginner** - Just want to use it
   - [QUICK_START.md](./QUICK_START.md) → Run system → [USAGE_GUIDE.md](./USAGE_GUIDE.md)

2. **Intermediate** - Want to customize
   - [README_PROJECT.md](./README_PROJECT.md) → [QUICK_START.md](./QUICK_START.md) → [CONFIGURATION_EXAMPLES.md](./CONFIGURATION_EXAMPLES.md)

3. **Advanced** - Want to deploy/extend
   - [SETUP_GUIDE.md](./SETUP_GUIDE.md) → Explore code → Production deployment

---

## 💡 Pro Tips

1. **For Quick Testing**: Use [QUICK_START.md](./QUICK_START.md)
2. **For Understanding**: Start with [README_PROJECT.md](./README_PROJECT.md)
3. **For Your Job Role**: Go to [CONFIGURATION_EXAMPLES.md](./CONFIGURATION_EXAMPLES.md)
4. **For Troubleshooting**: See [USAGE_GUIDE.md](./USAGE_GUIDE.md) FAQ
5. **For Production**: Follow [SETUP_GUIDE.md](./SETUP_GUIDE.md) completely

---

## 🚀 Ready?

**Choose one and get started:**

1. [QUICK_START.md](./QUICK_START.md) - Start in 5 minutes
2. [README_PROJECT.md](./README_PROJECT.md) - Understand the system
3. [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed configuration

**Or just run:** `pnpm dev` and visit http://localhost:3000

---

**Questions?** Check the documentation files above - they have detailed answers!

**Let's go!** 🎉

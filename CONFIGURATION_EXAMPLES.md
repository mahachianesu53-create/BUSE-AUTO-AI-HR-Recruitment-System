# Configuration Examples

This document provides examples of how to configure the HR system for different job positions and requirements.

## Example 1: Senior Software Engineer (Default)

Default configuration in `lib/jobRequirements.ts`:

```typescript
export const JOB_REQUIREMENTS = {
  title: "Senior Software Engineer",
  requiredSkills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "REST API",
    "Database Design"
  ],
  requiredExperience: "3+ years of software development",
  requiredEducation: "Bachelor's degree in Computer Science or related field",
  niceToHave: [
    "AWS",
    "Docker",
    "CI/CD",
    "Agile",
    "System Design",
    "Machine Learning"
  ],
  evaluationCriteria: `You are an AI recruiter. Evaluate the candidate's resume/CV against these requirements:
1. Does the candidate have the required technical skills?
2. Do they have sufficient experience (3+ years)?
3. Does their background match the role?
4. What is their overall fit score (0-100)?
Provide a structured evaluation with a recommendation (ACCEPT/REJECT) and reasoning.`
};
```

## Example 2: Product Manager

```typescript
export const JOB_REQUIREMENTS = {
  title: "Product Manager",
  requiredSkills: [
    "Product Strategy",
    "User Research",
    "Data Analysis",
    "Cross-functional Leadership",
    "Roadmap Planning",
    "Stakeholder Management"
  ],
  requiredExperience: "4+ years of product management experience",
  requiredEducation: "Bachelor's degree (any field)",
  niceToHave: [
    "SaaS Experience",
    "B2B Background",
    "Analytics Tools (Mixpanel, Amplitude)",
    "SQL Knowledge",
    "Design Thinking",
    "Agile Methodology"
  ],
  evaluationCriteria: `You are an experienced recruiter hiring for a Product Manager role.
Evaluate the candidate based on:
1. Product strategy and planning experience
2. User research and data-driven decision making
3. Experience with cross-functional team leadership
4. Understanding of product lifecycle and metrics
5. Communication and presentation skills
Provide an ACCEPT/REJECT decision with match score 0-100.`
};
```

## Example 3: Data Scientist

```typescript
export const JOB_REQUIREMENTS = {
  title: "Data Scientist",
  requiredSkills: [
    "Python",
    "Machine Learning",
    "Statistics",
    "SQL",
    "Data Visualization",
    "TensorFlow or PyTorch"
  ],
  requiredExperience: "3+ years working with machine learning and data analysis",
  requiredEducation: "Master's degree in Computer Science, Statistics, Mathematics, or related field",
  niceToHave: [
    "Deep Learning",
    "NLP",
    "Computer Vision",
    "Apache Spark",
    "AWS SageMaker",
    "Kaggle Competition",
    "Published Research"
  ],
  evaluationCriteria: `Evaluate candidates for a Data Scientist position.
Key criteria:
1. Strong foundation in statistics and mathematics
2. Proficiency in Python and machine learning frameworks
3. Experience with end-to-end ML projects
4. Understanding of data preprocessing and feature engineering
5. Ability to communicate findings clearly
6. Experience with production ML systems
Provide score 0-100 and ACCEPT/REJECT recommendation.`
};
```

## Example 4: UX/UI Designer

```typescript
export const JOB_REQUIREMENTS = {
  title: "UX/UI Designer",
  requiredSkills: [
    "User Experience Design",
    "Figma or Sketch",
    "Wireframing",
    "Prototyping",
    "User Research",
    "Visual Design"
  ],
  requiredExperience: "3+ years of UX/UI design experience",
  requiredEducation: "Bachelor's degree in Design, HCI, or related field (or equivalent experience)",
  niceToHave: [
    "Design Systems",
    "Accessibility (WCAG)",
    "Frontend Development Knowledge",
    "Motion Design",
    "User Testing",
    "Analytics Interpretation",
    "Microinteractions"
  ],
  evaluationCriteria: `Evaluate UX/UI design candidates based on:
1. Portfolio quality and user-centered thinking
2. Proficiency with design tools (Figma, Sketch, etc.)
3. Understanding of design principles and accessibility
4. User research and testing methodologies
5. Communication and presentation skills
6. Problem-solving approach
Assess match score (0-100) and provide ACCEPT/REJECT.`
};
```

## Example 5: DevOps Engineer

```typescript
export const JOB_REQUIREMENTS = {
  title: "DevOps Engineer",
  requiredSkills: [
    "Kubernetes",
    "Docker",
    "CI/CD Pipelines",
    "Linux/Unix",
    "Cloud Platforms (AWS/GCP/Azure)",
    "Infrastructure as Code"
  ],
  requiredExperience: "4+ years of DevOps or infrastructure engineering",
  requiredEducation: "Bachelor's degree in Computer Science, Engineering, or related field",
  niceToHave: [
    "Terraform",
    "Jenkins or GitLab CI",
    "Monitoring Tools (Prometheus, ELK)",
    "Python/Go Scripting",
    "Microservices Architecture",
    "Security Best Practices",
    "Cost Optimization"
  ],
  evaluationCriteria: `Evaluate DevOps candidates for infrastructure and deployment excellence.
Assessment criteria:
1. Container technology experience (Docker/Kubernetes)
2. CI/CD pipeline design and implementation
3. Cloud platform expertise
4. Infrastructure as Code knowledge
5. Monitoring, logging, and debugging skills
6. Security and compliance understanding
Calculate score 0-100 and ACCEPT/REJECT decision.`
};
```

## Example 6: Frontend Developer

```typescript
export const JOB_REQUIREMENTS = {
  title: "Frontend Developer",
  requiredSkills: [
    "JavaScript",
    "React",
    "HTML/CSS",
    "RESTful APIs",
    "Git",
    "Responsive Design"
  ],
  requiredExperience: "2+ years of professional frontend development",
  requiredEducation: "Bachelor's degree in CS or equivalent experience",
  niceToHave: [
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Testing (Jest, React Testing Library)",
    "Redux or State Management",
    "Performance Optimization",
    "Accessibility (WCAG)",
    "UI/UX Collaboration"
  ],
  evaluationCriteria: `Evaluate frontend developers on:
1. JavaScript and modern framework expertise (React)
2. HTML/CSS and responsive design skills
3. Component development and reusability
4. State management understanding
5. API integration capabilities
6. Performance awareness
7. Testing and debugging skills
Provide score 0-100 and hiring recommendation.`
};
```

## Example 7: Hiring Manager (Leadership Role)

```typescript
export const JOB_REQUIREMENTS = {
  title: "Hiring Manager - Engineering",
  requiredSkills: [
    "Team Leadership",
    "Talent Acquisition",
    "Performance Management",
    "Strategic Planning",
    "Communication",
    "Technical Acumen"
  ],
  requiredExperience: "5+ years of engineering management or leadership experience",
  requiredEducation: "Bachelor's degree (any field)",
  niceToHave: [
    "Executive Coaching Certification",
    "Diverse Hiring Experience",
    "Budget Management",
    "Mentoring Track Record",
    "Cross-functional Collaboration",
    "Organizational Design",
    "Remote Team Leadership"
  ],
  evaluationCriteria: `Evaluate leadership candidates using these criteria:
1. Proven track record of building and scaling teams
2. Experience with recruitment and talent development
3. Leadership philosophy and team culture building
4. Strategic thinking and business acumen
5. Communication and interpersonal skills
6. Handling of challenging situations
7. Vision for team growth and development
Determine fit score (0-100) and ACCEPT/REJECT.`
};
```

## Example 8: Sales Development Representative (Entry-Level)

```typescript
export const JOB_REQUIREMENTS = {
  title: "Sales Development Representative",
  requiredSkills: [
    "Communication",
    "Sales Prospecting",
    "CRM Tools",
    "Persistence",
    "Cold Calling/Outreach",
    "Relationship Building"
  ],
  requiredExperience: "0-1 years in sales or customer-facing role (entry-level position)",
  requiredEducation: "High School Diploma or equivalent",
  niceToHave: [
    "SaaS Sales Experience",
    "Technical Product Knowledge",
    "LinkedIn Sales Navigator",
    "Sales Training Certification",
    "Multilingual Abilities",
    "Prior SDR Experience"
  ],
  evaluationCriteria: `For entry-level SDR candidates, evaluate:
1. Communication skills and professionalism
2. Enthusiasm and coachability
3. Resilience and ability to handle rejection
4. Self-motivation and time management
5. Basic understanding of sales principles
6. Customer service orientation
7. Problem-solving mentality
Score 0-100 and ACCEPT/REJECT for further interviews.`
};
```

## Customization Tips

### For Technical Roles
- Include specific programming languages and frameworks
- Mention databases and infrastructure tools
- Include soft skills like debugging and problem-solving

### For Non-Technical Roles
- Focus on leadership and communication
- Include business acumen and strategic thinking
- Mention domain expertise and industry knowledge

### For Entry-Level Positions
- Lower experience requirements
- Focus on potential and coachability
- Emphasize learning ability over specific experience

### For Senior Positions
- Require substantial years of experience
- Include strategic and leadership components
- Look for mentoring and growth mindset

## Changing Job Requirements

To change the job requirements:

1. Open `lib/jobRequirements.ts`
2. Replace the entire `export const JOB_REQUIREMENTS` object
3. Save the file
4. The changes take effect immediately on next application

No restart needed - Next.js hot-reloads the changes.

## Testing Your Configuration

To test your configuration:

1. Go to the applicant portal `/apply`
2. Submit a test application with your requirements
3. Check the evaluation to ensure it's evaluating correctly
4. Adjust the evaluation criteria if needed

## AI Evaluation Quality Tips

For better AI evaluations:

1. **Be Specific**: List exact skills and tools needed
2. **Include Context**: Explain why each skill is important
3. **Clear Criteria**: Provide clear evaluation guidelines
4. **Examples**: Include what ACCEPT and REJECT look like
5. **Edge Cases**: Mention how to handle borderline candidates

Example with improved criteria:

```typescript
evaluationCriteria: `You are a senior technical recruiter evaluating for a Senior Software Engineer role.
ACCEPTANCE CRITERIA:
- Must have 3+ years professional experience
- Must demonstrate JavaScript/TypeScript expertise
- Must have React experience with real-world projects
- Must show understanding of system design concepts

REJECTION CRITERIA:
- Less than 3 years experience
- No JavaScript/TypeScript shown
- No React experience mentioned
- Junior level despite senior role requirement

EDGE CASES:
- Alternative frameworks (Vue/Angular) can substitute for React if strong
- 2.5 years experience is acceptable if shows senior-level skills

Provide realistic score 0-100 based on actual qualifications.`
```

This ensures more consistent and fair evaluations.

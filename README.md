# Project Proposal

## Authors

* [Raj Patel](r.patel@dal.ca)
* [Rushikumar Patel](rs525735@dal.ca)
* [Nisarg Chudasama](ns458128@dal.ca)
* [Sumit Mansukhlal Savaliya](sm572004@dal.ca)
* [Vivek Alpeshbhai Sonani](viveksonani@dal.ca)
* [Roshni Joshi](rs888392@dal.ca)

## REPOSITORY LINKS

* *Date Created*: 27 FEB 2024
* *Last Modification Date*: 27 FEB 2024
* *GROUP PROJECT URL*: <https://git.cs.dal.ca/roshni/csci-5709-grp-08>
* *Deployed Application*: <https://main--hirex5709.netlify.app/>

## Configuration

Key variables which are used in the startup of the app. 
- `DATABASE_URI`: `MongoDB` url
- `GITHUB_PAT`: Github Personal Access Token
- `FRONTEND_URL`: URL of frontend deployment
- `JWT_SECRET`: JWT Secret Key
- `JWT_VALIDITY`: Validity of JWT Token
- `SMTP_USERNAME`: SMTP Gmail Username
- `SMTP_PASSWORD`: SMTP Gmail Password

## Deployment

The web application is deployed on Netlify and can be accessed via above mentioned URL.


## Built With

* [ReactJS](https://legacy.reactjs.org/docs/getting-started.html/) - Web Framework
* [npm](https://docs.npmjs.com//) - Dependency Management

## Sources Used

### ContactUs.js

*Lines 175-181*

```
<Snackbar
  anchorOrigin={{ vertical, horizontal }}
  open={open}
  onClose={handleClose}
  message="I love snacks"
  key={vertical + horizontal}
/>
```

The above mentioned lines of code were taken from [MUI](https://mui.com/material-ui/react-snackbar/#position) components and modified the properties as per our custom need. 

```
<Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={snakOpen}
              autoHideDuration={1000}
              onClose={handleClose}
              message="Thank you for contacting us! We will get back to you."
            />
```

### Faq.js

*Lines 5-63*
```
const faqCategories = [
  { id: 'application', title: 'Application Process' },
  { id: 'interview_prep', title: 'Interview Prep' },
  { id: 'account_issues', title: 'Account Issues' },
  { id: 'job_postings', title: 'Job Postings' },
  { id: 'salary_benefits', title: 'Salary and Benefits' },
];

const faqQuestions = {
  application: [
    { question: 'How do I apply for a job?', answer: 'You can apply by...' },
    { question: 'What should I include in my application?', answer: 'Ensure to include a cover letter, your resume, and any additional information requested in the job posting.' },
    { question: 'Can I apply for multiple jobs?', answer: 'Yes, you can apply for multiple jobs that match your qualifications and interests.' },
    { question: 'Do I need an account to apply?', answer: 'Yes, you must create an account to apply for jobs and track your application status.' },
    { question: 'How do I know if my application was received?', answer: 'You will receive an email confirmation after submitting your application.' },
    { question: 'What happens after I apply?', answer: 'Your application will be reviewed, and you will be contacted if you are selected for an interview.' },
  ],
  interview_prep: [
    { question: 'How can I prepare for my interview?', answer: 'Research the company, practice your responses to common questions, and prepare a set of questions to ask.' },
    { question: 'What should I wear to the interview?', answer: 'Dress professionally, in attire appropriate for the position you are applying for.' },
    { question: 'What should I bring to the interview?', answer: 'Bring copies of your resume, a list of references, and any work samples relevant to the job.' },
    { question: 'How early should I arrive?', answer: 'Aim to arrive 10-15 minutes early to allow for any unexpected delays.' },
    { question: 'Can I have a virtual interview?', answer: 'Depending on the employer, virtual interviews may be possible. Confirm the interview format in advance.' },
    { question: 'How do I follow up after the interview?', answer: 'Send a thank-you email within 24 hours of the interview, reiterating your interest in the position.' },
  ],
  account_issues: [
    { question: 'I forgot my password. What do I do?', answer: 'Click the "Forgot Password" link on the login page and follow the instructions to reset your password.' },
    { question: 'How do I update my profile information?', answer: 'Log in to your account, navigate to your profile, and update your personal information.' },
    { question: 'Can I delete my account?', answer: 'To delete your account, please contact customer support for assistance.' },
    { question: 'How do I change my email preferences?', answer: 'In your account settings, you can update your email preferences and notification settings.' },
    { question: 'I’m having trouble logging in. What can I do?', answer: 'Ensure your credentials are correct and that you do not have caps lock enabled. If issues persist, contact support.' },
    { question: 'My account was locked. How can I unlock it?', answer: 'Accounts are typically locked after multiple failed login attempts. Wait a few minutes, then try again or reset your password.' },
  ],
  job_postings: [
    { question: 'How often are job postings updated?', answer: 'Job postings are updated daily. Check back regularly for new listings.' },
    { question: 'Can I get notified about new postings?', answer: 'Yes, you can subscribe to job alerts in your account settings to get notified about new postings.' },
    { question: 'Where can I find remote job postings?', answer: 'Use the filter option to narrow down your search to include only remote job opportunities.' },
    { question: 'What types of jobs are available?', answer: 'We offer a wide range of jobs from various industries and at different career levels.' },
    { question: 'Can I save job postings to apply later?', answer: 'Yes, you can save job postings in your account to apply at a more convenient time.' },
    { question: 'How do I know if a job posting is still open?', answer: 'Job postings will remain on the site until the position is filled or the posting expires.' },
  ],
  salary_benefits: [
    { question: 'When will I know about the salary details?', answer: 'Salary details are typically discussed during the interview process or mentioned in the job posting.' },
    { question: 'Does the job offer health insurance?', answer: 'Many of our listed positions offer health insurance, but the benefits vary by employer.' },
    { question: 'What kind of retirement plans are offered?', answer: 'Retirement benefits are specific to the employer. This information is usually provided during the hiring process.' },
    { question: 'Are there options for flexible schedules?', answer: 'Flexible scheduling is becoming more common and may be available depending on the employer and the role.' },
    { question: 'Can I negotiate my salary?', answer: 'Salary negotiation is a part of the job offer process, and you are free to discuss this with your potential employer.' },
    { question: 'Are paid vacations offered?', answer: 'Paid vacation policies vary by employer. Specific details will be outlined in your employment contract or discussed during the interview.' },
  ],

  
};

const Accordion = ({ question, answer, isOpen, onClick }) => (
  <div className={`accordion ${isOpen ? 'open' : ''}`} onClick={onClick}>
    <div className="accordion-question">{question}</div>
    {isOpen && <div className="accordion-answer">{answer}</div>}
  </div>
);
```
*Lines 94-100*

```
 <Accordion
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            isOpen={openQuestion === faq.question}
            onClick={() => handleQuestionClick(faq.question)}
          />

```

The code above was created by adapting the code in Accordion as shown:

## Acknowledgments

* Insights from the demo of the Tutorial - 4 were helpful in quickly creating navigations.
* Custum creative images in the Homepage were generated using Gemini AI.


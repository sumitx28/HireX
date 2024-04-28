// @author Nisarg Chudasama

import React, { useState } from 'react';
import './Faq.css'; 
import Footer from "../footer/Footer";

// Array of FAQ categories with their IDs and titles
const faqCategories = [
  { id: 'application', title: 'Application Process' },
  { id: 'interview_prep', title: 'Interview Prep' },
  { id: 'account_issues', title: 'Account Issues' },
  { id: 'job_postings', title: 'Job Postings' },
  { id: 'salary_benefits', title: 'Salary and Benefits' },
];

// Object containing FAQ questions and answers categorized by faqCategories
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

// Accordion component to display individual FAQ items
const Accordion = ({ question, answer, isOpen, onClick }) => (
  <div className={`accordion ${isOpen ? 'open' : ''}`} onClick={onClick}>
    <div className="accordion-question">{question}</div>
    {isOpen && <div className="accordion-answer">{answer}</div>}
  </div>
);

// FAQ component to display categorized FAQ items
const Faq = () => {
  const [activeCategory, setActiveCategory] = useState('application');
  const [openQuestion, setOpenQuestion] = useState(null);

 // Function to handle category click event  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setOpenQuestion(null); 
  };

// Function to handle question click event  
  const handleQuestionClick = (question) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

// Rendering the FAQ component UI  
  return (
    <div className="faq-container">
      <div className="left-panel">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
        {faqCategories.map((category) => (
          <div
            key={category.id}
            className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.title}
          </div>
        ))}
      </div>
      <div className="right-panel">
        {faqQuestions[activeCategory].map((faq) => (
          <Accordion
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            isOpen={openQuestion === faq.question}
            onClick={() => handleQuestionClick(faq.question)}
          />
        ))}
      </div>
      <Footer />
    </div>
    
  );
};

export default Faq; // Exporting the FAQ component

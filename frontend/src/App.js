import Home from "./components/home/Home";
import Faq from "./components/faq/Faq";
import ContactUs from "./components/contact-us/ContactUs";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import CodeAssessmentForm from "./components/code-assessment/CodeAssessmentForm";
import ProjectEvaluationForm from "./components/project-evaluation/ProjectEvaluationForm";
import InterviewForm from "./components/interview/InterviewForm";
import InterviewSchedule from "./components/interview/InterviewSchedule";
import ProblemTitle from "./components/candidate/job/code-assessment/ProblemTitle/ProblemTitle";
import CodeEditorIndex from "./components/candidate/job/code-assessment/CodeEditor/CodeEditorIndex";
import { ThemeProvider, createTheme } from "@mui/material";
import Footer from "./components/footer/Footer";
import NewJobPost from "./components/recruiter/new-job-post/NewJobPost";
import RecruiterHome from "./components/recruiter/home/RecruiterHome";
import MeetingRoom from "./components/video-interview/CallPage/MeetingRoom";
import VideoInterview from "./components/video-interview/LandingPage/VideoInterview";
import EndCall from "./components/video-interview/EndCallPage/EndCall";
import ProjectEvaluationIndex from "./components/candidate/job/project-evaluation/ProjectEvaluationIndex";
import Login from "./components/authentication/login";
import CandidateSignupPage from "./components/authentication/CandidateSignupPage";
import RecruiterSignupPage from "./components/authentication/RecruiterSignupPage";
import ForgetPasswordPage from "./components/authentication/ForgetPasswordPage";
import ResetPasswordPage from "./components/authentication/ResetPasswordPage";

import JobPage from "./components/job-page/JobPage";
import JobApplicationForm from "./components/jobApplication/JobApplicationForm";
import CandidateStatus from "./components/candidateStatus/CandidateStatus";
import CandidateHome from "./components/candidateHome/CandidateHome";
import CandidateJobDetails from "./components/candidateJobDetails/CandidateJobDetails";
import CandidateAppliedJobs from "./components/candidateAppliedJobs/CandidateAppliedJobs";
import StatusPage from "./components/candidate-status/StatusPage";
import Authentication from "./authUtility/authentication";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003691",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/signup/candidate" element={<CandidateSignupPage />} />
        <Route path="/signup/recruiter" element={<RecruiterSignupPage />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />

        <Route path="/resetpassword/:code" element={<ResetPasswordPage />} />

        <Route path="/faq" element={<Faq />}></Route>
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/codeassessment" element={<Authentication> <CodeAssessmentForm /> </Authentication> } />
        <Route path="/projectevaluation" element={<Authentication> <ProjectEvaluationForm /> </Authentication>} />
        <Route path="/interview" element={<Authentication> <InterviewForm /> </Authentication>} />
        <Route path="/interviewschedule" element={<Authentication> <InterviewSchedule /> </Authentication>} />
        <Route path="/join-call" element={<Authentication> <VideoInterview /> </Authentication>} />
        <Route path="/meeting-room" element={<Authentication><MeetingRoom /></Authentication>} />
        <Route path="/end-call" element={<Authentication><EndCall /></Authentication>} />
        <Route path="/recruiter">
          <Route path="new-job-post" element={<Authentication><NewJobPost /></Authentication>} />
          <Route path="home" element={<Authentication><RecruiterHome /></Authentication>} />
          <Route path="job/:jobId" element={<Authentication><JobPage /></Authentication>} />
          <Route path="job/:jobId/edit" element={<Authentication><NewJobPost /></Authentication>} />
        </Route>
        <Route path="/interviewer">
          <Route path="home" element={<Authentication><RecruiterHome /></Authentication>} />
          <Route path="job/:jobId" element={<Authentication><JobPage /></Authentication>} />
        </Route>
        <Route path="/candidate-status/:jobId" element={<Authentication><StatusPage /></Authentication>} />
        <Route path="/candidate/job/codeProblems" element={<Authentication><ProblemTitle /></Authentication>} />
        <Route
          path="/candidate/job/codeAssessment/codeProblem"
          element={<Authentication><CodeEditorIndex /></Authentication>}
        />
        <Route path="/candidate/home" element={<Authentication><CandidateHome /></Authentication>} />
        <Route path="/candidate/job/:jobId" element={<Authentication><CandidateJobDetails /></Authentication>} />
        <Route path="/candidate/applied-jobs" element={<Authentication><CandidateAppliedJobs /></Authentication>} />
        <Route path="/job-application/:jobId" element={<Authentication><JobApplicationForm /></Authentication>} />
        <Route path="/status/:jobId" element={<Authentication><CandidateStatus /></Authentication>} />
        <Route
          path="/candidate/job/projectEvaluation"
          element={<Authentication><ProjectEvaluationIndex /></Authentication>}
        />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

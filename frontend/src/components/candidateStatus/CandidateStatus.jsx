// @author Nisarg Chudasama

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApplicationStatus } from "../../services/api/jobApis";
import { useNavigate } from "react-router-dom";
import {
  getCodeAssessmentResult,
  postCodeAssessmentResult,
} from "../../services/api/codeAssessmentResultApis";
import { getCodeAssessmentData, getProjectData } from "../../services/api/PreInterviewEvaluationApis";
import { createProjectEvaluationResult, getProjectEvaluationResult } from "../../services/api/projectEvaluationResultApis";
import { useAuth } from "../../authUtility/authprovider";

const CandidateStatus = () => {
  const { jobId } = useParams(); // Retrieving jobId from URL parameters
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState(
    "Loading your application status..."
  );

// State variables to manage various aspects of the application status and assessments
  const [candidateJob, setCandidateJob] = useState();
  const [codeAssessmentData, setCodeAssessmentData] = useState();
  const [codeAssessmentResult, setCodeAssessmentResult] = useState();
  const [codingRoundRequest, setCodingRoundRequest] = useState(false);
  const [projectData, setProjectData] = useState();
  const [prevData, setPrevData] = useState();
  const [validUserName, setValidUserName] = useState();
  const { user } = useAuth();

// Effect hook to fetch application status and related data upon component mount  
  useEffect(() => {
    const fetchStatus = async () => {
      try {
       // Fetching data for code assessment and project evaluation related to the job application 
        getCodeAssessmentData(jobId, setCodeAssessmentData, setPrevData);
        getProjectData(jobId, setProjectData, setPrevData, setValidUserName);

        // Fetching the current status of the candidate's application
        const response = await getApplicationStatus(jobId, user.sub);
        const { approved, candidateJobStatus, selected } = response;
        setCandidateJob(response);

        // Conditional rendering based on application progress and outcomes
        if (approved == false) {
          setStatusMessage(
            "Your application is currently undergoing a thorough initial review. Our team is carefully evaluating your skills and qualifications against our criteria for the position."
          );
        } else if (!candidateJobStatus) {
          setStatusMessage(
            "Thank you for your continued patience. You have successfully completed the initial phase of the application process. We are currently preparing the next steps for you, which will involve a series of evaluations to better understand your skills and potential fit with our team."
          );
        } else {
          const {
            codeCompleted,
            projectCompleted,
            interviewCompleted,
            withdrawn,
          } = candidateJobStatus;
          if (codeCompleted == false) {
            setStatusMessage(
              "Your journey to join our team is advancing to an exciting stage. The next step is to complete the coding challenge, which is designed to assess your technical skills and problem-solving abilities. Please allocate uninterrupted time and a quiet space to focus on this task."
            );
          } else if (projectCompleted == false) {
            setStatusMessage(
              "We are now at a pivotal point in the application process where you can demonstrate your practical expertise and project management skills. It is time to submit the project that you have been working on."
            );
          } else if (interviewCompleted == false) {
            setStatusMessage(
              "You have reached an important milestone and we are pleased with your progress. Currently, you are in the queue for the interview stage, which is the final step before potential selection. This is a chance for you to shine in person and give us a glimpse of the unique value you bring. "
            );
          } else if (selected) {
            setStatusMessage("Congratulations, you are hired!");
          } else if (withdrawn) {
            setStatusMessage(
              "You have withdrawn from the application process."
            );
          } else {
            setStatusMessage("Your application is under final review.");
          }
        }
      } catch (error) {
        console.error("Failed to fetch application status", error);
        setStatusMessage(
          "Failed to load application status. Please try again later."
        );
      }
    };

    fetchStatus();
  }, []); // This effect runs only once upon component mount due to the empty dependency array

  useEffect(() => {
    if (codingRoundRequest) {
      // If a coding round request is made, fetch the code assessment result
      getCodeAssessmentResult(codeAssessmentData.codeAssessmentId, candidateJob.candidateJobId, setCodeAssessmentResult);
    }
  }, [codingRoundRequest]); // This effect depends on the codingRoundRequest state

// Another effect for handling navigation to the coding problems page upon certain conditions 
  useEffect(() => {
    if (codingRoundRequest) {
      const handleRequest = async () => {
        if (codeAssessmentResult) {
          if (codeAssessmentResult.startTime && !codeAssessmentResult.endTime) {
            navigate("/candidate/job/codeProblems", {
              state: { candidateJobId: candidateJob.candidateJobId },
            });
          }
        }
        else {
          await postCodeAssessmentResult(
            codeAssessmentData.codeAssessmentId,
            candidateJob.candidateJobId
          );
          navigate("/candidate/job/codeProblems", {
            state: { candidateJobId: candidateJob.candidateJobId },
          });
        }
      }

      handleRequest();
    }
  }, [codeAssessmentResult]);

 // Function to trigger navigation to the code problems component  
  const navigateToCodeProblems = async () => {
    setCodingRoundRequest(true);
  };

// Function to navigate to the project evaluation page, after ensuring the project evaluation result exists  
  const navigateToProjectEvaluation = async () => {
    const projectEvaluationResult = await getProjectEvaluationResult(candidateJob.candidateJobId);
    if (projectEvaluationResult === null) {
      await createProjectEvaluationResult(candidateJob.candidateJobId);
    }
    navigate("/candidate/job/projectEvaluation", {
      state: { candidateJobId: candidateJob.candidateJobId },
    });
  };

// Styling object for the component  
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
      backgroundColor: "#f7f7f7",
    },
    card: {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      transition: "0.3s",
      borderRadius: "5px",
      width: "60%",
      maxWidth: "800px",
      padding: "40px",
      backgroundColor: "#fff",
      margin: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      fontSize: "16px",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
      width: "auto",
    },
  };

 // Render the component UI  
  return (
    <>
      <style>
        {`
          body, html {
            height: 100%;
            margin: 0;
            background-color: #f7f7f7; /* Set the background color to match the container */
          }
        `}
      </style>
      <div>
        {candidateJob && candidateJob.candidateJobId && codeAssessmentData && (
          <div style={styles.container}>
            <div style={styles.card}>
              <h2>Application Status</h2>
              <p>{statusMessage}</p>
              {codeAssessmentData.codeAssessmentId && statusMessage ===
                "Your journey to join our team is advancing to an exciting stage. The next step is to complete the coding challenge, which is designed to assess your technical skills and problem-solving abilities. Please allocate uninterrupted time and a quiet space to focus on this task." && (
                  <button style={styles.button} onClick={navigateToCodeProblems}>
                    Start Coding Round
                  </button>
                )}
              {statusMessage ===
                "We are now at a pivotal point in the application process where you can demonstrate your practical expertise and project management skills. It is time to submit the project that you have been working on."
                && projectData && projectData.projectId && (
                  <button style={styles.button} onClick={navigateToProjectEvaluation}>
                    Start Project Evaluation Round
                  </button>
                )}
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default CandidateStatus; // Exporting the component for use elsewhere in the applicatio

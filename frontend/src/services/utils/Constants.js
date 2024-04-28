// @author Roshni Joshi (roshni.joshi@dal.ca)

export const SYSTEM_ERROR_MESSAGE = "System exception occured. Please try again";

export const CANDIDATE = "candidate";
export const INTERVIEWER = "interviewer";

export const DEFAULT_CODE_ASSESSMENT = {
  "codeAssessmentId": null,
  "job": {
    "jobId": ""
  },
  "languages": [],
  "duration": "",
  "passPercentage": "",
  "codeProblems": [
    {
      "codeProblemId": "Prob" + Date.now(),
      "problemTitle": "",
      "problemStmt": "",
      "testCases": [
        {
          "testCaseId": "Test" + Date.now(),
          "input": "",
          "output": ""
        }
      ]
    }
  ]
}

export const DEFAULT_PROJECT_EVALUATION = {
  "projectId": null,
  "job": {
    "jobId": ""
  },
  "description": "",
  "additionalRequirements": "",
  "interviewerGithub": ""
}

export const DEFAULT_INTERVIEW = {
  "interviewId": null,
  "interviewer": {
    "userId": ""
  },
  "job": {
    "jobId": ""
  },
  "candidate": {
    "userId": ""
  },
  "startTime": "",
  "endTime": ""
}

export const INTERVIEWER_INTERVIEW_COLUMNS = [
  {
    id: 'job',
    label: 'Job Details',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'candidate',
    label: 'Candidate Details',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'startTime',
    label: 'Start Time',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'endTime',
    label: 'EndTime',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'update',
    label: 'Update',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'delete',
    label: 'Delete',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'join',
    label: '',
    minWidth: 100,
    align: 'center',
  }
];

export const CANDIDATE_INTERVIEW_COLUMNS = [
  {
    id: 'job',
    label: 'Job Details',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'startTime',
    label: 'Start Time',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'endTime',
    label: 'End Time',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'join',
    label: '',
    minWidth: 100,
    align: 'center',
  }
];

export const DEFAULT_CODE_PROBLEM = {
  "codeProblemId": "Prob" + Date.now(),
  "problemStmt": "",
  "testCases": [
    {
      "testCaseId": "Test" + Date.now(),
      "input": "",
      "output": ""
    }
  ]
}

export const DEFAULT_CODE_EXECUTION_RESULT = {
  "compilationError": null,
  "runTimeError": null,
  "allTestPassed": false,
  "testCaseList": [
    {
      "testCaseId": "Test" + Date.now(),
      "input": "",
      "output": "",
      "codeOutput": "",
      "testCasePassed": false
    }
  ],
  "message": "Something went Wrong. Please try again later."
}

export const STUN_SERVERS = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
    }
  ]
};

export const PROMPT_STATE = 'prompt';
export const GREANTED_STATE = 'granted';
export const DENIED_STATE = 'denied';
export const CAMERA = 'camera';
export const MICROPHONE = 'microphone';
export const CAMERA_PERMISSION_DENIED_PROMPT = 'Turn on camera permissions';
export const MICROPHONE_PERMISSION_DENIED_PROMPT = 'Turn on microphone permissions';

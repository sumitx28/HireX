// @author Vivek Sonani

import React, { useEffect, useState } from 'react';
import CodeEditorHeader from './CodeEditorHeader';
import CodeEditor from './CodeEditor';
import CodeEditorFooter from './CodeEditorFooter';
import { Divider, Stack } from '@mui/material';
import { submitCode, validateCode } from '../../../../../services/api/codeRunnerApis';
import { useNavigate } from 'react-router-dom';

// component to manage header, code editor and footer
const CodeEditorBox = ({ testcases, candidateJobId, codeProblemId, codeAssessmentData, codeAssessmentResult }) => {
    const defaultCode = '';

    const editorOptions = {
        minimap: { enabled: false }
    };

    const navigate = useNavigate();

    const [language, setLanguage] = useState(codeAssessmentData.languages[0]);
    const [editorCode, setEditorCode] = useState(defaultCode);
    const [theme, setTheme] = useState('vs-dark');
    const [themeTooltipTitle, setThemeTooltipTitle] = useState('Light');
    const [consoleBox, setConsoleBox] = useState(false);
    const [validationRequestSuccess, setValidationRequestSuccess] = useState(false);
    const [runSpinner, setRunSpinner] = useState(false);
    const [submitSpinner, setSubmitSpinner] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionRequestSuccess, setSubmissionRequestSuccess] = useState(false);

    const [codeExecutionResult, setCodeExecutionResult] = useState();

    const [testcaseBox, setTestcaseBox] = useState(true);

    const handleChange = (event) => {
        setLanguage(event.target.value);
        setEditorCode(defaultCode);
    };

    const resetCode = () => {
        setEditorCode(defaultCode);
    }

    const changeTheme = () => {
        if (theme === 'vs-dark') {
            setTheme('light');
            setThemeTooltipTitle('Dark');
        }
        else {
            setTheme('vs-dark');
            setThemeTooltipTitle('Light');
        }
    }

    const changeConsoleState = () => {
        if (!consoleBox) {
            setConsoleBox(true);
        }
        else {
            setConsoleBox(false);
        }
    }

    useEffect(() => {
        if(validationRequestSuccess){
            setRunSpinner(false);
            setValidationRequestSuccess(false);
        }
    }, [validationRequestSuccess]);

    const generateResult = () => {
        validateCode(codeAssessmentData.codeAssessmentId, codeProblemId, language, editorCode, setCodeExecutionResult, setValidationRequestSuccess);
    }

    useEffect(() => {
        if(submissionSuccess){
            navigate("/candidate/job/codeProblems", { state: { "candidateJobId": candidateJobId } });
        }
    }, [submissionSuccess])

    useEffect(() => {
        if(submissionRequestSuccess){
            setSubmitSpinner(false);
            setSubmissionRequestSuccess(false);
        }
    }, [submissionRequestSuccess])

    const onSubmitCode = () => {
        submitCode(candidateJobId, codeAssessmentData.codeAssessmentId, codeProblemId, language, editorCode, setCodeExecutionResult, setSubmissionSuccess, setSubmissionRequestSuccess);
    }

    return (
        <Stack style={{ width: '100%', height: '82vh' }}>
            <CodeEditorHeader
                changeTheme={changeTheme}
                themeTooltipTitle={themeTooltipTitle}
                resetCode={resetCode}
                language={language}
                handleChange={handleChange}
                codeAssessmentData={codeAssessmentData}
                codeAssessmentResult={codeAssessmentResult}
            />
            <Divider />
            <CodeEditor
                language={language}
                editorCode={editorCode}
                theme={theme}
                editorOptions={editorOptions}
                setEditorCode={setEditorCode}
                consoleBox={consoleBox}
                testcases={testcases}
                codeExecutionResult={codeExecutionResult}
                testcaseBox={testcaseBox}
                setTestcaseBox={setTestcaseBox}
                runSpinner={runSpinner}
                submitSpinner={submitSpinner}
            />
            <CodeEditorFooter
                setConsoleBox={setConsoleBox}
                setTestcaseBox={setTestcaseBox}
                changeConsoleState={changeConsoleState}
                generateResult={generateResult}
                onSubmitCode={onSubmitCode}
                runSpinner={runSpinner}
                setRunSpinner={setRunSpinner}
                submitSpinner={submitSpinner}
                setSubmitSpinner={setSubmitSpinner}
            />
        </Stack>
    );

}

export default CodeEditorBox;
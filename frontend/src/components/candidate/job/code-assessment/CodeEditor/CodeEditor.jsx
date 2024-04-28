// @author Vivek Sonani

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Divider, InputLabel, Stack, TextField, Typography } from '@mui/material';

// component to show code editor
const CodeEditor = ({ language, editorCode, theme, editorOptions, setEditorCode, consoleBox, testcases, codeExecutionResult, testcaseBox, setTestcaseBox, runSpinner, submitSpinner }) => {
    const [testcaseIndex, setTestcaseIndex] = useState(0);

    return (
        <Stack style={{ flex: '1', position: 'relative' }}>
            <Box style={{ flex: '1' }}>
                <Editor language={language.toLowerCase()} value={editorCode} theme={theme} options={editorOptions} onChange={(value) => setEditorCode(value)} />
            </Box>
            {consoleBox ?
                <Box style={{ position: 'absolute', background: '#fff', left: '0', right: '0', bottom: '0', top: '50%' }}>
                    <Box style={{ padding: '0.5rem' }}>
                        <Button onClick={() => { setTestcaseBox(true) }} variant={testcaseBox ? 'contained' : 'outlined'}>
                            Testcase
                        </Button>
                        <Button onClick={() => { setTestcaseBox(false) }} variant={!testcaseBox ? 'contained' : 'outlined'} style={{ marginLeft: '0.5rem' }}>
                            Result
                        </Button>
                    </Box>
                    <Divider style={{ marginBottom: '0.5rem' }} />
                    <Box style={{ overflowY: 'auto', maxHeight: '80%' }}>
                        {testcaseBox ?
                            <Box style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                                <Box style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                    {testcases.map((t, index) => (
                                        <Button key={index} onClick={() => { setTestcaseIndex(index) }} variant={testcaseIndex === index ? 'outlined' : 'text'} size='small' style={{ marginRight: '0.5rem' }}>
                                            Case {index + 1}
                                        </Button>
                                    ))}
                                </Box>
                                <InputLabel style={{ marginTop: '0.5rem' }}>Input</InputLabel>
                                <TextField value={testcases[testcaseIndex].input} size='small' fullWidth InputProps={{ readOnly: true }} />
                                <InputLabel style={{ marginTop: '0.5rem' }}>Expected Output</InputLabel>
                                <TextField value={testcases[testcaseIndex].output} multiline size='small' fullWidth InputProps={{ readOnly: true }} ></TextField>
                            </Box>
                            :
                            <Box style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                                {codeExecutionResult && codeExecutionResult.testCaseList && codeExecutionResult.testCaseList.length !== 0
                                    ?
                                    (
                                        <>
                                            {codeExecutionResult.allTestPassed ?
                                                <Typography variant="h4" color='green' style={{ marginBottom: '0.5rem' }}>
                                                    Accepted
                                                </Typography>
                                                :
                                                <Typography variant="h4" color='red' style={{ marginBottom: '0.5rem' }}>
                                                    Wrong Answer
                                                </Typography>
                                            }
                                            <Box style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                                {testcases.map((testcase, index) => (
                                                    <Button
                                                        key={index}
                                                        onClick={() => { setTestcaseIndex(index) }}
                                                        variant={testcaseIndex === index ? 'outlined' : 'text'}
                                                        color={codeExecutionResult.testCaseList[index].isTestCasePassed ? 'success' : 'error'}
                                                        size='small'
                                                        style={{ marginRight: '0.5rem' }}
                                                    >
                                                        Case {index + 1}
                                                    </Button>
                                                ))}
                                            </Box>
                                            <InputLabel style={{ marginTop: '0.5rem' }}>Input</InputLabel>
                                            <TextField value={codeExecutionResult.testCaseList[testcaseIndex].input} size='small' fullWidth InputProps={{ readOnly: true }} />
                                            <InputLabel style={{ marginTop: '0.5rem' }}>Output</InputLabel>
                                            <TextField value={codeExecutionResult.testCaseList[testcaseIndex].codeOutput} size='small' fullWidth InputProps={{ readOnly: true }} />
                                            <InputLabel style={{ marginTop: '0.5rem' }}>Expected Output</InputLabel>
                                            <TextField value={codeExecutionResult.testCaseList[testcaseIndex].output} multiline size='small' fullWidth InputProps={{ readOnly: true }} ></TextField>
                                        </>
                                    )
                                    :
                                    (
                                        codeExecutionResult && codeExecutionResult.compilationError ?
                                            <>
                                                <Typography variant="h4" color='red' style={{ marginBottom: '0.5rem' }}>
                                                    Compilation Error
                                                </Typography>
                                                <TextField value={codeExecutionResult.compilationError} multiline size='small' fullWidth InputProps={{ readOnly: true }} ></TextField>
                                            </>
                                            :
                                            (
                                                codeExecutionResult && codeExecutionResult.runTimeError ?
                                                    <>
                                                        <Typography variant="h4" color='red' style={{ marginBottom: '0.5rem' }}>
                                                            Runtime Error
                                                        </Typography>
                                                        <TextField value={codeExecutionResult.runTimeError} multiline size='small' fullWidth InputProps={{ readOnly: true }} ></TextField>
                                                    </>
                                                    :
                                                    (runSpinner ?
                                                        <Typography variant='h6' color='grey'>
                                                            Running your code...
                                                        </Typography>
                                                        :
                                                        (submitSpinner ?
                                                            <Typography variant='h6' color='grey'>
                                                                Submitting your code...
                                                            </Typography>
                                                            :
                                                            <Typography variant='h6' color='grey'>
                                                                Please run your code.
                                                            </Typography>
                                                        )
                                                    )
                                            )
                                    )

                                }
                            </Box>
                        }
                    </Box>
                </Box>
                :
                <></>
            }
        </Stack>
    );
};

export default CodeEditor;
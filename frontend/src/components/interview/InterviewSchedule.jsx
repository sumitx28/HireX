// @author Roshni Joshi
// This component renders the interview schedule for an interviewer or a candidate

import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { deleteInterview, getInterviews } from '../../services/api/InterviewApis';
import { useNavigate } from 'react-router';
import { CANDIDATE_INTERVIEW_COLUMNS, INTERVIEWER, INTERVIEWER_INTERVIEW_COLUMNS } from '../../services/utils/Constants';
import { Backdrop, Button, CircularProgress, Container, Grid, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { useAuth } from '../../authUtility/authprovider';

export default function InterviewSchedule() {
  const { user } = useAuth();
  console.log(user);
  const [userType, setUserType] = useState(user.roles[0]);
  const [userId, setUserId] = useState(user.userId);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [interviewData, setInterviewData] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(user.userId);
    setUserType(user.roles[0]);
    if (INTERVIEWER === userType) {
      setColumns(INTERVIEWER_INTERVIEW_COLUMNS)
    } else {
      setColumns(CANDIDATE_INTERVIEW_COLUMNS)
    }
    getInterviews(userType, userId, setInterviewData, setShowLoader)
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCallJoin = (interviewId) => {
    const jwtToken = localStorage.getItem("JWTToken") || null;
    let user;
    if (jwtToken != null) {
      user = jwtDecode(jwtToken);
    }
    let userData = {};
    userData.userId = user.userId;
    userData.email = user.sub;
    userData.roomId = interviewId;
    userData.name = user.firstName;
    userData.role = user.roles[0];
    navigate("/join-call", { state: { userData } })
  }

  const checkTime = (row) => {
    const currentDateTime = dayjs();
    return !(currentDateTime.isAfter(dayjs(row.startTime)) && currentDateTime.isBefore(dayjs(row.endTime)))
  }

  return (
    <Container sx={{ minHeight: '100vh', px: { md: '7vh', xs: '3vh' }, paddingTop: { xs: '5vh', md: '9vh' }, display: 'flex', flexDirection: 'column' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h6" className="content-center" sx={{ paddingBottom: '5vh', fontWeight: 'bold' }}>Interview Schedule</Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: '3vh' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {interviewData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "update" &&
                              <IconButton size="small" onClick={() => navigate("/interview", { state: { "interviewId": row.interviewId } })}>
                                <EditIcon style={{ color: '#5A5A5A' }} />
                              </IconButton>}
                            {column.id === "delete" &&
                              <IconButton size="small" onClick={() => {
                                deleteInterview(row.interviewId)
                                setInterviewData(prev => prev.filter(data => data.interviewId !== row.interviewId))
                              }}>
                                <DeleteIcon />
                              </IconButton>}
                            {column.id !== "update" && column.id !== "update" && value}
                            {column.id === "join" &&
                              <Button
                                onClick={() => handleCallJoin(row.interviewId)}
                                disabled={checkTime(row)}>
                                {INTERVIEWER === userType ? 'Start' : 'Join'}
                              </Button>
                            }
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={interviewData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {INTERVIEWER === userType &&
        <Grid item xs={12} >
          <Button
            variant="contained"
            onClick={() => navigate("/interview", { state: { "interviewerId": userId } })}>
            Book Interview
          </Button>
        </Grid>}
    </Container>
  )
}

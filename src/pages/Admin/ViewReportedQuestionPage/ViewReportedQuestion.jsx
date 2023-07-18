import React, { useEffect, useState } from 'react'
import TableComponent from '../../../components/Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { approveQuestion, getReportedQuestions, rejectQuestion } from '../../../redux/feature/Admin/reportedQuestions/ReportedQuestions'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Stack } from '@mui/system'
import UseColors from '../../../assets/Colors'
import Filter from '../../../components/FilterDropdown/Filter'
import InputBar from '../../../components/InputBar/InputBar'

function ViewReportedQuestion() {
  const dispatch = useDispatch()
  const naviagate = useNavigate()
  const { fontColor, buttonColor } = UseColors()
  const { token } = useSelector(state => state.admin.admin)
  const [rearrangedData, setRearrangedData] = useState([])
  const [search, setSearch] = useState('')
  const reportedQuestion = useSelector(state => state.reportedQuestions.reportedQuestions)
  const handleApprove = (id) => {
    dispatch(approveQuestion({ id, token,role:'admin' }))

  }
  const handleReject = (id) => {
    dispatch(rejectQuestion({ id, token,role:'admin' }))
  }
  const handlePagination = () => {

  }

  const handleSearchSubmit = () => {
    dispatch(getReportedQuestions({ search, token,role:'admin' }))
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (!reportedQuestion) {
      dispatch(getReportedQuestions({ token,role:'admin' }))
    }
    if (reportedQuestion) {
      setRearrangedData(reportedQuestion.map((question) => {
        return {
          'User': question.user.name,
          'Reson': question.reason,
          "ReportedOn": new Date(question.createdAt).toLocaleDateString(),
          'Action': question.status ? "Taked" : "Not Taked",
          "Question id":question.question._id,
          "Question": <Button onClick={() => naviagate('/admin/question/' + question.question._id)}>view</Button>,
          "Handle": !question?.question?.isApprove ? { name: "Show", color: "success", action: () => handleApprove(question.question._id) } : { name: "Hide", color: "error", action: () => handleReject(question.question._id) }
        }
      }))
    }
  }, [dispatch, reportedQuestion, token])
  return (
    <>
      <Stack direction={'column'} minWidth={'100%'}>

        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} margin={"10px"}>
          <Typography sx={{
            fontSize: "30px",
            marginLeft: "20px",
            marginBottom: "20px"
          }}>Reported questions</Typography>
          <Stack direction={'row'} >
            <Stack direction={'row'} >
              <InputBar onChange={handleSearch} button={<Button onClick={handleSearchSubmit} variant='text' disableRipple sx={{ bgcolor: "transparent", backgroundColor: 'transparent' }}>Search</Button>} name={'question_id'} type={"text"} placeholder={'Enter the question id'} />
            </Stack>
          </Stack>
        </Stack>
        <TableComponent data={rearrangedData} />
        <Stack direction={'row'} justifyContent={"end"} sx={{
          marginRight: "20px",
          marginBottom: "20px",
          marginTop: "20px"
        }}>
          <Button disableRipple disableFocusRipple variant="contained" sx={{ color: fontColor, bgcolor: buttonColor, marginRight: '10px' }} onClick={() => handlePagination("down")}>Prev</Button>
          <Button variant="contained" sx={{ color: fontColor, bgcolor: buttonColor }} onClick={() => handlePagination("up")}>Next</Button>
        </Stack>
      </Stack>
    </>
  )
}

export default ViewReportedQuestion
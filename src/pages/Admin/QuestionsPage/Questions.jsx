import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../../../components/Table/Table";
import { Button, Stack, Typography } from "@mui/material";
import UseColors from "../../../assets/Colors";
import { approveQuestion, getAllQuestion, paginaTion, rejectQuestion } from "../../../redux/feature/Admin/questionManagement/QuestionManagment";
import InputBar from "../../../components/InputBar/InputBar";
import Filter from "../../../components/FilterDropdown/Filter";
import { useNavigate } from "react-router-dom";
function Questions() {
  const { fontColor, buttonColor } = UseColors()
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [rearrangedQuestions, setRearrangedQuestion] = useState([])
  const token = useSelector(state => state.admin.admin.token)
  const { questions, isLoading, isError, isSuccess, page } = useSelector(state => state.questions)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const filterProps = {
    sort: [{ key: "Recently added first", value: "asc" }, { key: "Old first", value: "des" }],
  }

  useEffect(() => {
    if (!isSuccess && !questions?.length) {
      dispatch(getAllQuestion({ start: page, token,role:'admin' }))
    }
    if (isSuccess && questions) {
      let data = questions?.map((question) => {
        return {
          User: question?.user?.name,
          Title: question?.title,
          "Question id": question?._id,
          Status: question?.isApprove ? "Approved" : "Rejected",
          PostedOn: new Date(question?.createdAt).toLocaleDateString(),
          UpdatedOn: new Date(question?.updatedAt).toLocaleDateString(),
          "View question": <Button onClick={() => navigate('/admin/question/' + question?._id)} variant="text">view</Button>,
          Handle: question?.isApprove ? { name: "Reject", color: "error", action: () => handleReject(question._id) } : { name: "Approve", color: "success", action: () => handleApprove(question._id) }
        }
      })
      setRearrangedQuestion(data ?? [])
    }
    if (isError) {
      toast.error("Something went wrong")
    }

  }, [dispatch, isError, isSuccess, page, questions, token])


  const handleApprove = (id) => {
    dispatch(approveQuestion({ id, token,role:'admin' }))
  }
  const handleReject = (id) => {
    dispatch(rejectQuestion({ id, token,role:'admin' }))
  }


  const handleFilter = (e) => {
    setFilter(e.target.value)
  }


  const handlePagination = (action) => {
    if (action === 'up' && questions.length) {
      dispatch(paginaTion({ start: page + 5, token,role:'admin' }))
    }
    if (action === 'down' && page > 0) {
      dispatch(paginaTion({ start: page - 5, token,role:'admin' }))
    }
  }

  const handleFilterClose = (e) => {
    if (e.target.name === 'Ok') {
    
      dispatch(getAllQuestion({ start: 0, sort: filter, token,role:'admin' }))
    }
  }
  const handleSearchSubmit = () => {
    dispatch(getAllQuestion({ start: 0, sort: filter, search, token,role:'admin' }))
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <Stack sx={{ marginTop: "70px", width: "100%" }} justifyContent={'flex-start'}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} margin={"10px"}>
        <Typography sx={{
          fontSize: "30px",
          marginLeft: "20px",
          marginBottom: "20px"
        }}>Questions</Typography>
        <Stack direction={'row'} >
          <Stack direction={'row'} sx={{ marginRight: '10px' }}>
            <Filter handleChange={handleFilter} handleCloseProps={handleFilterClose} menu={filterProps} />
          </Stack>
          <Stack direction={'row'} >
            <InputBar button={<Button onClick={handleSearchSubmit} variant='text' disableRipple sx={{ bgcolor: "transparent", backgroundColor: 'transparent' }}>Search</Button>} onChange={handleSearch} name={'question_id'} type={"text"} placeholder={'Enter the word'} />
          </Stack>
        </Stack>
      </Stack>
      <TableComponent loading={isLoading} data={rearrangedQuestions ?? []} handleApprove={handleApprove} handleReject={handleReject} />
      <Stack direction={'row'} justifyContent={"end"} sx={{
        marginRight: "20px",
        marginBottom: "20px",
        marginTop: "20px"
      }}>
        <Button disableRipple disableFocusRipple variant="contained" sx={{ color: fontColor, bgcolor: buttonColor, marginRight: '10px' }} onClick={() => handlePagination("down")}>Prev</Button>
        <Button variant="contained" sx={{ color: fontColor, bgcolor: buttonColor }} onClick={() => handlePagination("up")}>Next</Button>
      </Stack>
    </Stack>
  )
}

export default Questions
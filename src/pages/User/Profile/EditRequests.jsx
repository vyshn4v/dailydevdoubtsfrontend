import { useDispatch, useSelector } from "react-redux"
import TableComponent from '../../../components/Table/Table'
import {  Button } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { approveAnswerRequest } from "../../../services/answer"
import { toast } from "react-toastify"
import { updateEditRequest } from "../../../redux/feature/User/profile/Profile"
function Editrequests() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile.profile)
  const [data, setData] = useState()
  const handleReject = () => { }
  const handleApprove = useCallback((answer_id) => {
    approveAnswerRequest({ answer_id,role:"user" }).then((res) => {
      dispatch(updateEditRequest(res.data.data._id))
      console.log(res);
    }).catch((err) => {
      console.log(err);
      toast.error(err.response.data.message ?? 'failed to accept request')
    })
  },[dispatch])
  const handleNavigate = useCallback((data) => {
    navigate("/" + data.name + "/details", { state: { _id: data._id } })
  },[navigate])
  useEffect(() => {
    setData(profile?.editAnswerRequests?.map((answer) => {
      return {
        Body: answer.body,
        Requested: new Date(answer.createdAt).toLocaleDateString(),
        user: <Button onClick={() => handleNavigate({ name: answer.edited_by.name, _id: answer.edited_by._id })}>{answer.edited_by.name}</Button>,
        Handle: answer?.isApprove ? { name: "Reject", color: "error", action: () => handleReject(answer._id) } : { name: "Approve", color: "success", action: () => handleApprove(answer._id) }
      }
    }))
  }, [handleApprove, handleNavigate, profile])
  return (
    <>
      <TableComponent data={data} />
    </>
  )
}

export default Editrequests
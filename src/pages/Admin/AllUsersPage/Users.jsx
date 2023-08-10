import { Fragment, useEffect, useState } from "react";
import TableComponent from "../../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { Button, Stack, Typography } from "@mui/material";
import { approveUsers, getAllusers, paginaTion, rejectUsers } from "../../../redux/feature/Admin/userManagment/UserManagment";
import { toast } from "react-toastify";
import UseColors from "../../../assets/Colors";
import Filter from "../../../components/FilterDropdown/Filter";
import InputBar from "../../../components/InputBar/InputBar";
function Users() {
  const { fontColor, buttonColor } = UseColors()
  const dispatch = useDispatch()
  const token = useSelector(state => state.admin.admin.token)
  const [reArrangedUserData, setRearrangedUserData] = useState([])
  const { users, isLoading, isError, isSuccess, page } = useSelector(state => state.users)
  const filterProps = {
    sort: [{ key: "Recently added first", value: "asc" }, { key: "Old first", value: "des" }],
  }
  const [search, setSearch] = useState()
  const [filter, setFilter] = useState()
  const handleApprove = (id) => {
    dispatch(approveUsers({ id, isBanned: false, token, role: 'admin' }))
  }
  const handleReject = (id) => {
    dispatch(rejectUsers({ id, isBanned: true, token, role: 'admin' }))
  }


  useEffect(() => {
    if (!isSuccess && !users?.length) {
      dispatch(getAllusers({ token, role: "admin" }))
    }
    if (isSuccess && users) {
      let data = users?.map((user) => {
        return {
          Name: user?.name,
          Email: user?.email,
          Phone: user?.phone ?? "Not available",
          Status: user?.isBanned ? "Banned" : "Active",
          Verified: user?.isVerified ? "Yes" : "No",
          Following: user?.following_user?.length ?? 0,
          Joined: new Date(user?.createdAt).toLocaleDateString(),
          Handle: user?.isBanned ? { name: "Unban", color: "success", action: () => handleApprove(user._id) } : { name: "Ban", color: "error", action: () => handleReject(user._id) }
        }
      })
      setRearrangedUserData(data ?? [])
    }
    if (isError) {
      toast.error("Something went wrong")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoading, isError, isSuccess, users, token])

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }
  const handlePagination = (e) => {
    if (e === 'up' && users.length) {
      dispatch(paginaTion({ start: page + 5, sort: filter, token, role: "admin" }))
    } else if (e === 'down' && page>1) {
      dispatch(paginaTion({ start: page - 5, sort: filter, token, role: "admin" }))
    }
  }
  const handleFilterClose = (e) => {
    if (e.target.name === 'Ok') {
      dispatch(getAllusers({ start: 0, sort: filter, token, role: "admin" }))
    }
  }
  const handleSearchSubmit = () => {
    dispatch(getAllusers({ start: 0, search, token, role: "admin" }))
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  return (
    <Fragment>
      <Stack sx={{ marginTop: '70px', width: "100%" }} justifyContent={'space-between'} display={'flex'}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} margin={"10px"}>
          <Typography sx={{
            fontSize: "30px",
            marginLeft: "20px",
            marginBottom: "20px"
          }}>Users</Typography>
          <Stack direction={'row'} >
            <Stack direction={'row'} sx={{ marginRight: '10px' }}>
              <Filter handleChange={handleFilter} handleCloseProps={handleFilterClose} menu={filterProps} />
            </Stack>
            <Stack direction={'row'} >
              <InputBar onChange={handleSearch} button={<Button onClick={handleSearchSubmit} variant='text' disableRipple sx={{ bgcolor: "transparent", backgroundColor: 'transparent' }}>Search</Button>} name={'question_id'} type={"text"} placeholder={'Enter the name'} />
            </Stack>
          </Stack>
        </Stack>
        <TableComponent loading={isLoading} data={reArrangedUserData} />
        <Stack direction={'row'} justifyContent={"end"} sx={{
          marginRight: "20px",
          marginBottom: "20px",
          marginTop: "20px"
        }}>
          <Button disableRipple disableFocusRipple variant="contained" sx={{ color: fontColor, bgcolor: buttonColor, marginRight: '10px' }} onClick={() => handlePagination("down")}>Prev</Button>
          <Button variant="contained" sx={{ color: fontColor, bgcolor: buttonColor }} onClick={() => handlePagination("up")}>Next</Button>
        </Stack>
      </Stack>
    </Fragment>
  )
}

export default Users
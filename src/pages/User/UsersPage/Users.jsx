import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllusers, paginaTion } from '../../../redux/feature/Admin/userManagment/UserManagment'
import InputBar from '../../../components/InputBar/InputBar'
import Loading from '../../../components/Loading/Loading'
import TableComponent from '../../../components/Table/Table'

function Users() {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const { users, isSuccess, isError, isLoading, page } = useSelector(state => state.users)
    const { token, following_user } = useSelector(state => state.user.user)
    const [rearrangedData, setRearrangedData] = useState()
    useEffect(() => {
        if (!isSuccess && !users?.length) {
            dispatch(getAllusers({ token, sort: "asc",role:'user' }))
        }
        if (isError) {
            toast.error("Something went wrong")
        }
        if (users) {
            const data = users.filter((user)=>!following_user.includes(user._id)).map((user) => {
                return {
                    "Image": <Avatar src={user.profile_image} />,
                    Name:user.name,
                    Email:user.email,
                    Reputation:user.reputation,
                    Handle:{name:"unfollow",color:"error" }
                }
            })
            setRearrangedData(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isError, users])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleSearchSubmit = () => {
        dispatch(getAllusers({ start: 0, search, token, role: "user" }))
    }
    const paginate = (action) => {
        if (action === 'up' && users.length) {
            dispatch(paginaTion({ start: page + 5, token }))
        }
        if (action === 'down' && page > 0) {
            dispatch(paginaTion({ start: page - 5, token }))
        }


    }
    return (
        <>
            <Grid container marginTop={'90px'}>
                <Grid item xs={12} >
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} margin={"10px"}>
                        <Typography sx={{
                            fontSize: "30px",
                            marginLeft: "20px",
                            marginBottom: "20px"
                        }}>Users</Typography>
                        <Stack direction={'row'} >
                            <Stack direction={'row'} >
                                <InputBar onChange={handleSearch} button={<Button onClick={handleSearchSubmit} variant='text' disableRipple sx={{ bgcolor: "transparent", backgroundColor: 'transparent' }}>Search</Button>} name={'question_id'} type={"text"} placeholder={'Enter the users name'} />
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Grid container xs={12} justifyContent={'center'} alignItems={'center'}>
                        <TableComponent data={rearrangedData ?? []} />
                    </Grid>
                    <Grid display={'flex'} gap={3} marginTop={3} justifyContent={'center'} alignItems={'center'}>
                        <Button variant='contained' onClick={() => paginate('down')}>
                            Prev
                        </Button>
                        <Button variant='contained' onClick={() => paginate('up')}>
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Users
import { Avatar, Grid, Stack, Typography } from '@mui/material'
import  { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import InputBar from '../../../components/InputBar/InputBar'
import TableComponent from '../../../components/Table/Table'
import usersServices from '../../../services/users'

import { useErrorBoundary } from 'react-error-boundary'
function Users() {
    const { showBoundary } = useErrorBoundary()
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    // const { users, isSuccess, isError, isLoading, page } = useSelector(state => state.users)
    const [users, setUsers] = useState(null)
    const [rearrangedData, setRearrangedData] = useState()
    const handleUnfollow = (user_id) => {
        console.log(user_id);
        usersServices.followUnfollowUser({ user: user_id }).then((res) => {
            console.log(res);
            if (res.data.status) {
                let data = users?.filter((user) => user._id != user_id).map((user) => user._id)
                localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), "following_user": data }))
                setUsers(prev => prev?.filter(user => user._id != user_id))
            }
        }).catch((err) => {
            toast.error(err.response.data.message ?? "failed to unfollow user")
        })
    }
    useEffect(() => {
        usersServices.getFollowers({ role: 'user' }).then((res) => {
            setUsers(res.data.data)
            console.log(res)
        }).catch((err) => {
            console.log('Failed to load users details', err)
            showBoundary('error while loading followers')
            toast.error(err.response.data.message ?? 'Failed to load users details')
        })
    }, [showBoundary])
    useEffect(() => {
        if (users) {
            const data = users.filter((user) => user.name.includes(search)).map((user) => {
                return {
                    "Image": <Avatar src={user.profile_image} />,
                    Name: user.name,
                    Email: user.email,
                    Reputation: user.reputation,
                    Handle: { name: "unfollow", action: () => handleUnfollow(user._id), color: "error" }
                }
            })
            setRearrangedData(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, users, search])
    const handleSearch = (e) => {
        setSearch(e.target.value)
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
                                <InputBar onChange={handleSearch} name={'question_id'} type={"text"} placeholder={'Enter the users name'} />
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Grid container xs={12} justifyContent={'center'} alignItems={'center'}>
                        <TableComponent data={rearrangedData ?? []} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Users
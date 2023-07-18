import { Avatar, Button, CircularProgress, Container, Fab, Grid, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { addProfileImage, getProfile } from '../../../redux/feature/User/profile/Profile'
import UseColors from '../../../assets/Colors'
import { Input } from '@mui/icons-material'
import Loading from '../../../components/Loading/Loading'
import { uploadProfile } from '../../../services/users'
import { followUser, updateState } from '../../../redux/feature/User/userAuth/Auth'

function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cardBg, bgColor } = UseColors()
    const [loading, setLoading] = useState(false)
    const { state } = useLocation()
    const { user } = useParams()
    console.log(state);
    useEffect(() => {
        dispatch(getProfile({ user: state,role:'user' }))
    }, [state])
    const Buttons = [
        {
            name: "Details",
            onclick: () => {
                state ?
                    navigate('/' + user + "/details", { state: state })
                    :
                    navigate('/profile/details')
            }
        },
        {
            name: "Badges",
            onclick: () => {
                state ?
                    navigate('/' + user + "/badges", { state: state })
                    :
                    navigate('/profile/badges')
            }
        },
        !state && {
            name: "Edit request",
            onclick: () => {
                navigate('/profile/edit-requests')
            }
        },
        {
            name: "Questions",
            onclick: () => {
                state ?
                    navigate('/' + user + "/question", { state: state })
                    :
                    navigate('/profile/question')
            }
        },
        {
            name: "Answer",
            onclick: () => {
                state ?
                    navigate('/' + user + "/answers", { state: state })
                    :
                    navigate('/profile/answers')
            }
        },
    ]
    const handleSubmitProfile = (e) => {
        console.log(e.target.files);
        let form = new FormData()
        form.append('image', e.target.files[0])
        setLoading(true)
        uploadProfile(form).then((res) => {
            console.log(res);
            dispatch(addProfileImage(res.data.data))
            dispatch(updateState())
            setLoading(false)
        }).catch((err) => {
            console.log(err);
            setLoading(false)
        })
    }
    const handlefollowUser = () => {
        dispatch(followUser({ user: state?._id, follow: true }))
    }
    const UnFollowUser = () => {
        dispatch(followUser({ user: state?._id }))
    }
    const profile = useSelector((state) => state?.profile?.profile)
    const { following_user } = useSelector(state => state.user.user)
    return (
        <>{
            !profile ?
                <Loading />
                :
                <Container sx={{ marginTop: '70px' }} >
                    <Grid container display={'flex'} gap={'40px'} justifyContent={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={4} display={'flex'} direction={'column'} justifyContent={'center'} alignItems={'center'}  >
                            <Stack sx={{ m: 1, position: 'relative' }}>
                                <Avatar
                                    src={profile?.profile_image}
                                    sx={{ width: "200px", height: "200px" }}
                                />
                                {
                                    loading &&
                                    <CircularProgress size={200} thickness={1} sx={{ position: 'absolute' }} />
                                }
                            </Stack>
                            {
                                !state &&
                                <Stack  >
                                    <label htmlFor="upload-photo">
                                        <input
                                            style={{ display: 'none' }}
                                            id="upload-photo"
                                            name="image"
                                            type="file"
                                            onChange={handleSubmitProfile}
                                        />

                                        <Fab
                                            sx={{
                                                width: '200px',
                                                marginTop: '30px'
                                            }}
                                            color='secondary'
                                            size="small"
                                            component="span"
                                            aria-label="add"
                                            variant="extended"
                                        >
                                            Upload photo
                                        </Fab>
                                    </label>
                                </Stack>
                            }
                        </Grid >
                        <Grid item xs={12} md={7} display={'flex'} gap={'40px'} justifyContent={'space-around'} alignItems={'center'}>
                            <Grid container>
                                <Grid item xs={12} display={'flex'} gap={'20px'} justifyContent={'center'} alignItems={'center'}>
                                    <Stack width={'30%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                        <Typography >
                                            {profile?.following_user?.length} following
                                        </Typography>
                                    </Stack>
                                    <Stack width={'30%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                        <Typography>
                                            {profile?.followers?.length} followers
                                        </Typography>
                                    </Stack>
                                </Grid>
                                {
                                    state &&
                                    <Grid item xs={12} display={'flex'} gap={'20px'} justifyContent={'center'} alignItems={'center'} marginTop={'40px'}>
                                        <Stack width={'50%'}>
                                            {
                                                following_user?.includes(profile?._id) ?
                                                    <Button onClick={UnFollowUser} disableRipple fullWidth variant='contained' color='error'>
                                                        Un follow
                                                    </Button>
                                                    :
                                                    <Button onClick={handlefollowUser} disableRipple fullWidth variant='contained' color='primary'>
                                                        Follow
                                                    </Button>
                                            }
                                        </Stack>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12} display={'flex'} gap={'40px'} justifyContent={'space-around'} alignItems={'center'}>
                            <Grid container gap={'20px'} justifyContent={'center'}>
                                {
                                    Buttons.map((button, index) => (
                                        button && < Grid key={index} item xs={3} md={2}>
                                            <Typography onClick={button.onclick} sx={{
                                                bgcolor: cardBg,
                                                height: '50px',
                                                borderRadius: "10px",
                                                padding: "10px",
                                                display: 'flex',
                                                justifyContent: 'center',
                                                cursor: 'pointer'
                                            }}>
                                                {button.name}
                                            </ Typography>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12} display={'flex'} gap={'40px'} justifyContent={'space-around'} alignItems={'center'}>
                            <Outlet />
                        </Grid>
                    </Grid>
                </Container >
        }
        </>
    )
}

export default Profile
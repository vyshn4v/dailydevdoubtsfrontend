import { Avatar, Button, CircularProgress, Container, Fab, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { addProfileImage, clearUserData, getProfile } from '../../../redux/feature/User/profile/Profile'
import UseColors from '../../../assets/Colors'
import { uploadProfile } from '../../../services/users'
import { followUser, updateState } from '../../../redux/feature/User/userAuth/Auth'
import { useErrorBoundary } from 'react-error-boundary'

function Profile() {
    const { showBoundary } = useErrorBoundary();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cardBg } = UseColors()
    const [loading, setLoading] = useState(false)
    const { state } = useLocation()
    const { profile, isError } = useSelector((state) => state?.profile)
    const { following_user } = useSelector(state => state.user.user)
    const { user } = useParams()
    useEffect(() => {
    }, [])
    useEffect(() => {
        if (!profile) {
            dispatch(getProfile({ user: state, role: 'user' }))
        }
        if (isError) {
            showBoundary(new Error("Something went wrong"))
        }
        if (location.pathname.split('/')[1] !== encodeURIComponent(profile?.name) && location.pathname.split('/')[1] !== 'profile' && profile) {
            showBoundary(new Error("Something went wrong"))
        }

    }, [dispatch, isError, profile, showBoundary, state])
    useEffect(() => {
        return () => {
            dispatch(clearUserData())
        }
    }, [dispatch])
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
        let form = new FormData()
        form.append('image', e.target.files[0])
        setLoading(true)
        uploadProfile(form).then((res) => {
            dispatch(addProfileImage(res.data.data))
            dispatch(updateState())
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }
    const handlefollowUser = () => {
        dispatch(followUser({ user: state?._id, follow: true }))
    }
    const UnFollowUser = () => {
        dispatch(followUser({ user: state?._id }))
    }
    console.log(location.pathname.split('/')[1], encodeURIComponent(profile?.name), profile);
    return (
        <>{

            <Container sx={{
                paddingTop: '50px',
                height: '90vh', overflow: 'scroll', "&::-webkit-scrollbar": {
                    display: 'none'
                }
            }}>
                <Grid container display={'flex'} gap={'40px'} justifyContent={'center'} alignItems={'center'} >
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
                    <Grid item xs={12} md={12} height={'100%'} display={'flex'} gap={'40px'} justifyContent={'space-around'} alignItems={'center'} >
                        <Outlet />
                    </Grid>
                </Grid>
            </Container >
        }
        </>
    )
}

export default Profile
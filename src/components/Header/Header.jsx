import useColors from "../../assets/Colors"
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../redux/feature/User/userAuth/Auth";
import { useNavigate } from "react-router-dom";
import DrawerComponent from "../userDrawer/Drawer";
import { Alert, AppBar, Avatar,  Box, Button, Card, CardHeader, Menu, MenuItem, Snackbar, Stack, Toolbar } from "@mui/material"
import Fade from '@mui/material/Fade';
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import logo from './images/logo-no-background.png'
function Header() {
    const { fontColor, headerColor, cardBg } = useColors()
    const dispatch = useDispatch()
    const [notification, setNotification] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState('')
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user)
    const socket = useRef()
    const { _id } = useSelector(state => state.user.user)
    const handleNotificationClose = () => {
        setNotification(false)
        setNotificationMessage('')
    }
    useEffect(() => {
        socket.current = io(import.meta.env.VITE_BASE_URL.replace("/api", ""))
        return () => {
            socket.current.disconnect();
        };
    }, [socket])
    useEffect(() => {
        socket.current.emit('room', { room_id: _id })
        console.log('success');
      
        return () => {
            socket.current.emit('leaveRoom', {
                room_id: _id
            })
        }
    }, [_id, dispatch])
    useEffect(() => {
        socket.current.on('notification', (data) => {
            setNotification(true)
            setNotificationMessage(data?.message)
            console.log("notification", data);
        })

    }, [])
    function handleLogout() {
        setAnchorEl(null);
        localStorage.removeItem('user')
        dispatch(clearUserData())
        navigate('/login')
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleNavigateToProfile = () => {
        setAnchorEl(null);
        navigate('/profile/details')
    };
    let drawerProps = [
        { name: "Home", path: "/" },
        { name: "Bookmarks", path: "/bookmarks" },
        { name: "Users", path: "/users" },
        { name: "Plans", path: "/plans" },
        { name: "Chat", path: "/chat" },
        { name: "Ask question", path: "/ask-question" },
    ]
    return (
        <AppBar sx={{
            bgcolor: headerColor,
            boxShadow: 0,
            top: 0
        }}>
            <Toolbar sx={{
                marginTop: "10px",
                width: "100vw"
            }}>
                <Stack width={"100%"} direction={'row'} alignItems={'center'} justifyContent={'space-between'} >

                    <Box width={"30.33%"}>
                        <DrawerComponent drawerMenu={drawerProps} />
                    </Box>

                    <Box width={"30.33%"} display={'flex'} justifyContent={'center'}>
                        <img width={150} src={logo} alt="logo"/>
                    </Box>
                    <Box width={"30.33%"} direction={'row'}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'end'}>
                            <Snackbar open={notification} autoHideDuration={6000} onClose={handleNotificationClose}>
                                <Alert onClose={handleNotificationClose} severity="info" sx={{ width: '100%' }}>
                                   {notificationMessage}
                                </Alert>
                            </Snackbar>
                            <Button onClick={handleClick} sx={{ cursor: "pointer", color: fontColor }} disableRipple>
                                <Card sx={{ bgcolor: cardBg, color: fontColor, maxHeight: '60px', display: 'flex' }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar src={user?.profile_image}>
                                            </Avatar>
                                        }
                                    />
                                </Card>
                            </Button>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}

                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                                variant="selectedMenu"
                            >
                                <MenuItem onClick={handleNavigateToProfile} sx={{ minWidth: "200px" }}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </Stack>
                    </Box>
                </Stack>
            </Toolbar >
        </AppBar >
    )
}

export default Header
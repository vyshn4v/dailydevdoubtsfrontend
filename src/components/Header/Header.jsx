import useColors from "../../assets/Colors"
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../redux/feature/User/userAuth/Auth";
import { useNavigate } from "react-router-dom";
import DrawerComponent from "../userDrawer/Drawer";
import { AppBar, Avatar, Box, Button, Card, CardHeader, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material"
import Fade from '@mui/material/Fade';
import { useState } from "react";
function Header() {
    const { fontColor, headerColor, cardBg } = useColors()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user)
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

                    <Box width={"30.33%"}>
                        <Typography component={'span'} sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: fontColor
                        }}>
                            Dailydevdoubts<ComputerOutlinedIcon />
                        </Typography>
                    </Box>
                    <Box width={"30.33%"}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'end'}>
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
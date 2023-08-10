import { AppBar, Avatar, Box, Button, Stack, Toolbar, Typography } from "@mui/material"
import useColors from "../../assets/Colors"
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DrawerComponent from "../userDrawer/Drawer";
import { clearAdminData } from "../../redux/feature/Admin/adminAuth/Auth";

function AdminHeader() {
    let drawerProps = [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Users", path: "/admin/users" },
        { name: "Plans", path: "/admin/plans" },
        { name: "Advertises", path: "/admin/advertises" },
        { name: "Reports", path: "/admin/reports" },
    ]
    const {  fontColor, headerColor } = useColors()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.removeItem('admin')
        dispatch(clearAdminData())
        navigate('/login')
    }
    return (
        <AppBar position="static" sx={{
            bgcolor: headerColor,
            boxShadow: 0,
            position: 'fixed',
            top: 0,


        }}>
            <Toolbar sx={{
                marginTop: "10px",
                width: "100vw"
            }}>
                <Stack width={"100%"} direction={'row'} alignItems={'center'} justifyContent={'space-between'} >
                    <Box width={"30.33%"}>
                        <DrawerComponent drawerMenu={drawerProps} />
                    </Box>
                    <Box  width={"30.33%"}>
                        <Typography component={'span'} sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: fontColor
                        }}>
                            Dailydevdoubts admin <ComputerOutlinedIcon />
                        </Typography>
                    </Box>
                    <Box  width={"30.33%"}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'end'}>
                            <Button>
                                <Avatar src="https://img.freepik.com/free-icon/user_318-159711.jpg" />
                            </Button>
                            <Button sx={{
                                color: fontColor
                            }} endIcon={<ExitToAppOutlinedIcon />}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar >
    )
}

export default AdminHeader
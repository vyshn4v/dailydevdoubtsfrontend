import { Box, Drawer, Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Switch, Typography } from "@mui/material"
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import useColors from "../../assets/Colors";
import { Link } from "react-router-dom";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch, useSelector } from "react-redux";
import { TurnOnDarkMode } from "../../redux/feature/User/userAuth/Auth";
import MenuIcon from '@mui/icons-material/Menu';
import Footer from "../Footer/Footer";
// eslint-disable-next-line react/prop-types
function DrawerComponent({ drawerMenu }) {
    const { bgColor, drawerBg, fontColor, buttonColor } = useColors()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const dark = useSelector(state => state.user.isDarkMode)
    const dispatch = useDispatch()
    const handleDarkMode = () => {
        dispatch(TurnOnDarkMode())
    }
    return (
        <>
            {
                !isDrawerOpen &&
                < MenuIcon sx={{
                    bgcolor: buttonColor,
                    color: fontColor,
                    "&:hover": {
                        bgcolor: buttonColor,
                        cursor: 'pointer'
                    }
                }} onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
            }
            <Drawer anchor='left' color="primary" open={isDrawerOpen}
                PaperProps={{
                    sx: {
                        bgcolor: bgColor
                    }
                }}>
                <Box width={"300px"} height={'100%'} textAlign={"center"} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} role="presentation" >
                    <Stack alignItems={"flex-end"} justifyContent={"space-between"}>
                        <Fab color="secondary" size="big" aria-label="edit" sx={{
                            position: "relative",
                            top: "10px",
                            right: '10px',
                            width: "40px",
                            height: "40px",
                            bgcolor: buttonColor,
                            color: fontColor,
                            "&:hover": {
                                bgcolor: buttonColor
                            }
                        }} onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                            <CloseIcon />
                        </Fab>
                        <List sx={{
                            width: '100%', overflow: "scroll", "&::-webkit-scrollbar": {
                                display: "none"
                            }
                        }}>

                            <ListItem>

                                <ListItemIcon>
                                    {dark ? <Brightness7Icon sx={{ color: fontColor }} /> : <Brightness4Icon sx={{ color: fontColor }} />}
                                </ListItemIcon>
                                <ListItemText sx={{ color: fontColor }} primary={!dark ? "Dark" : "Light"} />
                                <Switch
                                    edge="end"
                                    onChange={handleDarkMode}
                                    checked={!dark}
                                    inputProps={{
                                        'aria-labelledby': 'switch-list-label-bluetooth',
                                    }}
                                />
                            </ListItem>
                            {
                                // eslint-disable-next-line react/prop-types
                                drawerMenu?.map((menu, index) => (
                                    <Link key={index} to={menu.path} style={{ textDecoration: 'none' }}>
                                        <ListItemButton disablePadding sx={{
                                            backgroundColor: "transparent",
                                            "&:hover": {
                                                backgroundColor: drawerBg
                                            }
                                        }}
                                            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                                        >
                                            <ListItem style={{ width: "100%", height: '50px', color: fontColor }}>{menu.name}</ListItem>
                                        </ListItemButton>
                                    </Link>
                                ))
                            }

                        </List>
                        {/* <Button sx={{marginBottom:"20px"}}  onClick={() => setIsDrawerOpen(!isDrawerOpen)}><CloseIcon /></Button> */}

                    </Stack>
                    <Stack justifyContent={'flex-end'} height={"auto"} marginBottom={'20px'}>
                        <Typography>
                            <Footer />
                        </Typography>
                    </Stack>
                </Box>
            </Drawer >
        </>
    )
}

export default DrawerComponent
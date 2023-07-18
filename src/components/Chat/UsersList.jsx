import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, IconButton, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import UseColors from '../../assets/Colors'
import RemoveIcon from '@mui/icons-material/Remove';
function UsersList({ users, chat, _id }) {
    const { fontColor, cardBg, bgColor } = UseColors()
    const [openUsersList, setOpenUsersList] = useState(false)
    const handleClick = () => {
        setOpenUsersList(prev => !prev)
    }
    return (
        <List sx={{ position: "relative" }}>
            <ListItemButton onClick={handleClick} sx={{width:'100%'}}>
                <ListItemText primary={chat?.isGroupChat ? chat?.name : chat?.users?.filter(user => _id != user?.user?._id)[0]?.user?.name} />
                {chat?.isGroupChat ? openUsersList ? <ExpandLess /> : <ExpandMore /> : ""}
            </ListItemButton>
            <Collapse sx={{ position: "absolute", bgcolor: fontColor, color: bgColor, zIndex: 999, width: '100%' }} in={openUsersList} timeout="auto" unmountOnExit>
                {
                    chat?.isGroupChat &&
                    users?.filter((user) => user?.user?._id != _id)?.map((user, index) => (
                        <List key={index} component="div" disablePadding>
                            <ListItemButton sx={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                                <Stack>
                                    <Typography fontSize={14}>
                                        {user?.user?.name}
                                    </Typography>
                                    <Typography fontSize={10}>
                                        {user?.user?.email}
                                    </Typography>
                                </Stack>
                                <Stack>
                                    {
                                        (chat?.users?.find(user => _id == user?.user?._id)?.role === "admin") ?
                                            <IconButton sx={{'&:hover':{
                                            
                                                color:'red',
                                            }}}>
                                                <RemoveIcon />
                                            </IconButton>
                                            : ''
                                    }
                                </Stack>
                            </ListItemButton>
                        </List>
                    ))
                }
            </Collapse>
        </List>
    )
}

export default UsersList
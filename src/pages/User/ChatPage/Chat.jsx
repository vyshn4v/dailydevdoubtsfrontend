import { Avatar, Box, Button, Container, Divider, Fab, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, TextField, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material"
import InputBar from "../../../components/InputBar/InputBar"
import ChatLayout from "./ChatDrawer"
import { useEffect, useState } from "react";
import UseColors from "../../../assets/Colors";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addChat, createChat, deleteChat, getAllChat, updateChat } from "../../../redux/feature/User/chat/Chat";
import { clearUsers, getAllusers } from "../../../redux/feature/Admin/userManagment/UserManagment";
import AddIcon from '@mui/icons-material/Add';
import ModalDialogBox from "../../../components/Modal/ModalDialogBox";
import { toast } from "react-toastify";
import { io } from 'socket.io-client'
import chatServices from '../../../services/chat'
const socket = io(import.meta.env.VITE_BASE_URL.replace("/api", ""))
function Chat() {
    const [chat, setChat] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [groupName, setGroupName] = useState('')
    const [groupMembers, setGroupMembers] = useState([])
    const [groupProfile, setGroupProfile] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const theme = useTheme();
    const navigate = useNavigate()
    const [searchUser, setSearchUser] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const { token } = useSelector(state => state.user.user)
    const { users } = useSelector(state => state.users)
    const { _id } = useSelector(state => state.user.user)
    const { chats } = useSelector(state => state.chats)
    const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
    const { cardBg, fontColor } = UseColors()

    const handleNavigatetochat = (chat_id) => {
        navigate('/chat/' + chat_id)
    }
    useEffect(() => {
        dispatch(getAllChat({ token, role: 'user' }))
        socket.emit('room', { room_id: _id })
        socket.on('chatCreated', (data) => {
            dispatch(addChat(data))
        })
        socket.on('userLeft', (data) => {
            console.log('chat updated', data);
            dispatch(updateChat(data))
        })
        socket.on('deletedChat', (data) => {
            console.log(data);
            dispatch(deleteChat({room_id:data.data._id,data}))
        })
        return () => {
            socket.emit('leaveRoom', {
                room_id: _id
            })
        }
    }, [_id, dispatch, token])


    const handleSearch = (e) => {
        setSearchUser(e.target.value)
    }

    const handleClear = () => {
        dispatch(clearUsers())
    }
    const handleSubmit = () => {
        dispatch(getAllusers({ token, search: searchUser, role: 'user' }))
    }
    const handleCreateChat = (user_id) => {
        chatServices.createChat({ token, users: [{ user: user_id }], role: 'user' }).then((data) => {
            console.log(data.data);
            dispatch(addChat(data.data.data))
            socket.emit('newChat', {
                room_id: [user_id],
                data: data.data.data
            })
        }).catch((err) => {
            toast.error('Failed to create Chat')
        })
        dispatch(clearUsers())
    }
    const handleCreateGroup = () => {
        if (!selectedUsers?.length) {
            toast.error('Please select users')
            return
        }
        const users = selectedUsers?.map((user) => {
            return {
                user: user._id
            }
        })
        const rooms = selectedUsers?.filter((user) => user._id !== _id).map((user) => user._id)

        if (!groupName) {
            toast.error('Enter the group name')
            return
        }
        if (chats.find((chat) => chat.name?.toLowerCase() === groupName?.toLowerCase())) {
            toast.error('already have a group with same name')
            return
        }

        chatServices.createChat({ token, users, isGroup: true, name: groupName, image: groupProfile }).then((data) => {
            dispatch(addChat(data.data.data))
            socket.emit('newChat', {
                room_id: rooms,
                data: data.data.data
            })
            setModalOpen(prev => !prev)
        }).catch((err) => {
            toast.error('Failed to create Chat')
        })
        dispatch(clearUsers())
    }
    const handleImage = (e) => {
        setGroupProfile(e.target.files[0])
    }
    const handleGroupTitle = (e) => {
        setGroupName(e.target.value)
    }

    const handleGroupMembers = (e) => {
        if (selectedUsers?.some((data) => data._id === e.target.value?._id)) {
            toast.error('user already selected')
            return
        }
        else if (selectedUsers.length >= 10) {
            toast.error('only 10 users allowed in a group')
            return
        }
        setSelectedUsers(prev => [...prev, e.target.value])
    }
    const handleSearchUserState = (e) => {
        setSearchUser(e?.target?.value ?? "")
    }

    return (
        <Container >
            <Grid container sx={{ maxHeight: '80vh', minHeight: '80vh' }} >
                <Grid item xs={12} display={'flex'} height={'70px'} sx={{ bgcolor: cardBg, padding: '20px' }} justifyContent={'space-between'}>
                    <Typography>
                        Chat
                    </Typography>
                    {
                        isMobileView &&
                        <Button onClick={() => setChat(!chat)}>
                            Show chats
                        </Button>
                    }
                </Grid>
                <ChatLayout
                    open={chat}
                    setOpen={() => setChat(!chat)}
                    DrawerComponet={
                        <Grid container overflow={'scroll'} maxHeight={'80vh'} minHeight={"70vh"} sx={{
                            '&::-webkit-scrollbar': {
                                display: "none"
                            }
                        }}
                        >
                            <Grid item xs={12} width={'100%'}>
                                <List sx={{ marginRight: "3px" }}>
                                    <ListItem key={user?.name} sx={{ color: fontColor, bgcolor: cardBg, padding: "10px", justifyContent: 'space-between' }}>
                                        <Stack direction={'row'} justifyContent={'space-between'}>
                                            <ListItemIcon>
                                                <Avatar alt="Remy Sharp" src={user?.profile_image} />
                                            </ListItemIcon>
                                            <ListItemText primary={user?.name}></ListItemText>
                                        </Stack>
                                        <ListItemIcon >
                                            <Tooltip title='Create group'>
                                                <IconButton onClick={() => {
                                                    dispatch(clearUsers())
                                                    setModalOpen(!modalOpen)
                                                }}>
                                                    <AddIcon sx={{ color: fontColor }} />
                                                </IconButton>
                                            </Tooltip>
                                            <ModalDialogBox handleClear={handleClear} groupProfile={groupProfile} handleImage={handleImage} handleSearchUserState={handleSearchUserState} selectedUsers={selectedUsers} handleCreateGroup={handleCreateGroup} handleGroupMembers={handleGroupMembers} handleGroupTitle={handleGroupTitle} handleSearchUser={handleSubmit} users={users} open={modalOpen} setOpen={setModalOpen} />
                                        </ListItemIcon>
                                    </ListItem>
                                </List>
                                <Divider sx={{ bgcolor: 'white' }} />
                            </Grid>
                            <Grid item xs={12} sx={{ position: 'relative' }} marginTop={'10px'} >
                                <InputBar onChange={handleSearch} button={<>
                                    <Button onClick={handleClear} variant='text' disableRipple sx={{ bgcolor: "transparent", backgroundColor: 'transparent' }}>Clear</Button>
                                    <Button onClick={handleSubmit} variant='text' disableRipple sx={{ bgcolor: "transparent", backgroundColor: 'transparent' }}>Submit</Button>
                                </>} name={'question_id'} type={"text"} placeholder={'Search for users'} />
                                {(users?.length > 0) &&
                                    <Box sx={{ position: "absolute", width: "100%", zIndex: 999 }}>
                                        <List sx={{ color: 'black', bgcolor: fontColor, borderRadius: '10px', marginTop: '10px' }} >
                                            {(users?.length > 0) ?
                                                users?.filter((user) => user._id != _id)?.map((user, index) => (
                                                    <ListItem key={index} onClick={() => handleCreateChat(user._id)} sx={{ color: fontColor, bgcolor: cardBg, cursor: 'pointer' }}>
                                                        <ListItemIcon>
                                                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                                        </ListItemIcon>
                                                        <Stack width={'100%'}>
                                                            <ListItemText secondary={user?.name}></ListItemText>
                                                            <ListItemText secondary={user?.email}></ListItemText>
                                                        </Stack>
                                                        <ListItemText align="right"><Typography >{user?.email}</Typography></ListItemText>
                                                    </ListItem>
                                                )) :
                                                users !== null &&
                                                <ListItem sx={{ color: fontColor, bgcolor: cardBg, cursor: 'pointer' }}>
                                                    <ListItemIcon>
                                                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                                    </ListItemIcon>
                                                    <ListItemText secondary='User Not Found'></ListItemText>
                                                    <ListItemText primary="online" align="right"></ListItemText>
                                                </ListItem>
                                            }
                                        </List>
                                    </Box>
                                }
                            </Grid>
                            <Grid item xs={12} width={'100%'}>
                                <List sx={{ color: fontColor }} >
                                    {
                                        chats?.map((chat, index) => (
                                            <ListItem key={index} onClick={() => handleNavigatetochat(chat._id)} sx={{ color: fontColor, bgcolor: cardBg, marginTop: "10px", padding: "10px", cursor: 'pointer' }}>
                                                <ListItemIcon>
                                                    <Avatar alt="Remy Sharp" src={chat?.profile_image ?? chat?.users?.filter((data) => _id != data.user?._id)[0]?.user?.profile_image} />
                                                </ListItemIcon>
                                                <ListItemText primary={chat.name ?? chat?.users?.filter((data) => _id !== data.user?._id)[0]?.user?.name} ></ListItemText>
                                                <ListItemText primary="online" align="right"></ListItemText>
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </Grid>
                        </Grid>
                    }

                    chat={
                        <Outlet />
                    }
                />
            </Grid>
        </Container>
    )
}

export default Chat
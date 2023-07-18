import { Avatar, Button, Collapse, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import InputBar from '../InputBar/InputBar'
import UseColors from '../../assets/Colors'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addMessages, deleteChat, getAllChat, updateChat } from '../../redux/feature/User/chat/Chat'
import { io } from 'socket.io-client'
import chatservice from '../../services/chat'
import DefaultChatMsg from './Message'
import { toast } from 'react-toastify'
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import AlertDialogModal from '../../components/DeleteModal/AlertDialogModal'
import UsersList from './UsersList'
function ChatCompnent() {
    const messagesEndRef = useRef(null);
    const socket = useRef(null);
    const { chat_id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [joinMessage, setJoinMessage] = useState('')
    const [newMessage, setNewMessage] = useState()
    const [message, setMessage] = useState('')
    const { _id, token, name } = useSelector(state => state.user.user)
    const chat = useSelector(state => state?.chats?.chats?.find((chat) => chat_id == chat._id))
    useEffect(() => {
        socket.current = io(import.meta.env.VITE_BASE_URL.replace("/api", ""))
        return () => {
            socket.current.disconnect();
        };
    }, [])
    useEffect(() => {
        dispatch(getAllChat({ token, role: 'user' }))
        socket.current.emit('room', {
            user_name: name,
            user: _id,
            room_id: chat_id
        })
        return () => {
            console.log("exut");
            socket.current.emit('leaveRoom', {
                user_name: name,
                user: _id,
                room_id: chat_id
            })
        }
    }, [_id, chat_id, dispatch, name, token])
    useEffect(() => {

        socket.current.on('message', (data) => {
            dispatch(addMessages(data))
        })


    }, [])
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom()
        if (!chat) {
            navigate('/chat')
        }
    }, [chat])

    const handleSendMessage = () => {
        chatservice.sendMessage({ token, message, chat_id }).then((data) => {
            socket.current.emit('chat', {
                room_id: chat_id,
                data: data.data.data
            })
            dispatch(addMessages({ room_id: chat_id, data: data.data.data }))
            setMessage("")
        }).catch((err) => {
            toast.error('Failed to send Message')
        })
    }
    const handleMessage = (e) => {
        setMessage(e.target.value)
    }
    const isSameDay = (date1, date2) => {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    };
    const handleDeleteChat = () => {
        chatservice.deleteChat({ token, chat_id }).then((res) => {
            const users = res.data.data?.users?.filter((user) => user.user != _id).map((user) => user.user)
            console.log(res.data.data);
            socket.current.emit('deleteChat', {
                room_id: users,
                data: res.data.data
            })
            dispatch(deleteChat({ room_id: chat_id, data: res.data.data }))
            navigate('/chat')
        }).catch((err) => {
            console.log(res);
        })
    }
    const handleExitChat = () => {
        chatservice.leftChat({ token, chat_id }).then((res) => {
            console.log(res);
            const users = res.data?.data?.users?.filter((user) => user.users?._id != _id)?.map((user) => user.user._id)
            console.log(users);
            socket.current.emit('exitChat', {
                room_id: users,
                data: res.data.data
            })
            dispatch(deleteChat(res.data.data))
            navigate('/chat')
        }).catch((err) => {
            console.log(err);
        })
    }
    const { fontColor, cardBg, bgColor } = UseColors()
    return (
        <>
            <List overflow={'scroll'} sx={{
                height: '65vh'
            }}>
                <ListItem key="profile" sx={{ color: fontColor, bgcolor: cardBg, padding: "10px" }} >
                    <ListItemIcon>
                        <Avatar alt="Profile" src={chat?.isGroupChat ? chat?.profile_image : chat?.users?.find(user => _id != user?.user?._id)?.user?.profile_image} />
                    </ListItemIcon>
                    <ListItemText align="left">
                        <UsersList _id={_id} chat={chat} users={chat?.users} />
                    </ListItemText>
                    <ListItemText align="right">
                        {chat?.isGroupChat ?
                            (chat?.users?.find(user => _id == user?.user?._id)?.role === "admin") ?
                                <AlertDialogModal heading={"Delete this chat?"} title={'Delete group'} handleDeleteChat={handleDeleteChat} />
                                : <AlertDialogModal heading={"Leave from this chat"} title={'Left'} handleDeleteChat={handleExitChat} />
                            : <AlertDialogModal heading={"Delete this chat"} title={'Delete chat'} handleDeleteChat={handleDeleteChat} />
                        }
                    </ListItemText>
                </ListItem>
                <Stack maxHeight={'400px'} overflow={'scroll'} sx={{
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }}>
                    {
                        chat && chat?.messages?.map((message, index) => {

                            return (
                                <ListItem key={index}>
                                    <Grid container sx={{ color: 'black', }}>
                                        {!isSameDay(new Date(message.createdAt), new Date(chat?.messages[index - 1]?.createdAt)) ?
                                            < Grid item xs={12}>
                                                <ListItemText sx={{ color: fontColor }} align="center" primary={!isSameDay(new Date(message?.createdAt), new Date(chat[0]?.messages[index - 1]?.createdAt)) && new Date(message.createdAt).toLocaleDateString()}></ListItemText>
                                            </Grid> : null
                                        }
                                        <DefaultChatMsg message={message} side={_id != message?.user?._id ? true : null} />
                                    </Grid>
                                </ListItem>
                            )
                        })
                    }
                    <div ref={messagesEndRef} />
                </Stack>
            </List >
            <Divider />
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={12}>
                    <InputBar onChange={handleMessage} value={message} button={<Button variant='text' onClick={handleSendMessage} disableRipple sx={{ bgcolor: "transparent", backgroundColor: 'transparent' }}>Submit</Button>} name={'question_id'} type={"text"} placeholder={'Enter the message'} />
                </Grid>
            </Grid>
        </>
    )
}

export default ChatCompnent
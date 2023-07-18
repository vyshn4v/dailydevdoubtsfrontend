import { Avatar, Button, Card, CardHeader, Chip, Container, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Select, Stack, Tooltip, Typography, } from '@mui/material'
import React, { useState } from 'react'
import useColors from '../../assets/Colors'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from '@mui/material/Fade';
import HTMLReactParser from 'html-react-parser';
import './ViewQuestion.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import MenuComponent from '../Menu/MenuComponet';
import InputBar from '../InputBar/InputBar';
function ViewQuestion({ data, handleUpAndDownVote, handleAnswer, handleSubmitAnswer, submitAnswer, handleUpAndDownVoteAnswer }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickClose = (event) => {
        setAnchorEl(null);
    };
    const handleClose = () => {
        navigate('report')
        setAnchorEl(null);
    };

    const user = useSelector(state => state.user.user)
    const { _id } = useSelector(state => state?.user?.user) || ""
    const DateFormatter = (date) => {
        let AskedDate = new Date(date)
        let currentDate = new Date()
        const year = AskedDate.getFullYear() - currentDate.getFullYear()
        const month = currentDate.getMonth() - AskedDate.getMonth()
        const day = AskedDate.getDay()
        return year !== 0 ? ` ${year} year ${month} month ago` : month > 1 ? ` ${month} month ${day} days ago` : ` ${day} day ago`;
    }
    const navigateToProfile = ({ name, _id }) => {
        if (_id === user?._id) {
            navigate("/profile/details")
        } else {
            navigate('/' + name + "/details", { state: { _id } })
        }
    }

    const { fontColor, cardBg } = useColors()

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['clean'], ['code-block']
        ],
    }

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "align",
        "strike",
        "script",
        "blockquote",
        "background",
        "list",
        "bullet",
        "indent",
        "color",
        "code-block"
    ];

    return (
        <Grid container
            sx={{
                // minHeight: "70vh"
            }} direction={'row'} justifyItems={'flex-start'}>
            <Grid item xs={12} direction={'row'} marginTop={"80px"}>
                <Grid container direction={'row'}>
                    <Grid item xs={11}>
                        <Typography sx={{ fontSize: '30px' }}>
                            {data?.question?.title}
                        </Typography>
                        <Stack direction={'row'} gap={'20px'}>
                            <Typography sx={{ fontSize: '10px' }}>
                                Asked {DateFormatter(data?.question?.createdAt)}
                            </Typography>
                            <Typography sx={{ fontSize: '10px' }}>
                                Modified {DateFormatter(data?.question?.updatedAt)}
                            </Typography>
                            <Typography sx={{ fontSize: '10px' }}>
                                Viewed {data?.question?.views} times
                            </Typography>
                        </Stack>
                    </Grid>

                    <Grid item xs={1} display={"flex"} justifyContent={"flex-end"}>
                        <IconButton sx={{
                            color: fontColor,
                        }} disableRipple >
                            <MoreVertIcon sx={{ fontSize: '30px' }} onClick={handleClick} />
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClickClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={handleClose}>Report</MenuItem>
                            </Menu>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12}>
                <Grid container marginTop={"20px"}>
                    {
                        handleUpAndDownVote &&
                        <Grid item xs={2} display={'flex'} flexDirection={'column'} alignItems={"center"}>
                            <Tooltip title={data?.question?.up_vote?.includes(_id) ? "Already upvoted" : (_id === data?.question?.user[0]?._id) ? "you can't vote your own question" : "Its usefull"}>
                                <IconButton sx={{
                                    color: (!data?.question?.up_vote?.includes(_id)) ? fontColor : "orange",
                                }} disableRipple
                                    onClick={handleUpAndDownVote?.upVote}
                                >
                                    <ArrowDropUpIcon sx={{ fontSize: '70px' }} />
                                </IconButton>
                            </Tooltip>
                            <Typography>
                                {data?.question?.up_vote?.length - data?.question?.down_vote?.length}
                            </Typography>
                            <Tooltip title={data?.question?.down_vote?.includes(_id) ? "Already down voted" : (_id === data?.question?.user[0]?._id) ? "you can't vote your own question" : "Its not usefull"}>
                                <IconButton sx={{
                                    color: !data?.question?.down_vote?.includes(_id) ? fontColor : "orange",
                                }} disableRipple
                                    onClick={handleUpAndDownVote?.downVote}
                                >
                                    <ArrowDropDownIcon sx={{ fontSize: '70px' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={user?.bookmark?.includes(data?._id) ? "Alredy Bookmarked" : "Bookmark"}>
                                <IconButton sx={{
                                    color: user?.bookmark?.includes(data?._id) ? "orange" : fontColor,
                                }}
                                    onClick={handleUpAndDownVote?.bookmark}
                                    disableRipple>
                                    <BookmarkAddIcon sx={{ fontSize: '30px' }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    }
                    <Grid item xs={handleUpAndDownVote ? 10 : 12}>
                        <Grid container direction={'column'}>
                            <Grid item xs={12} >
                                <Typography >
                                    <div className="content">
                                        {HTMLReactParser(data?.question?.body ?? "")}
                                    </div>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} direction={'row'}  >
                                <Grid container>

                                    <Grid item xs={8}  >
                                        {
                                            data?.question?.tags?.map((tag, index) => {
                                                return <Chip sx={{ bgcolor: cardBg, color: fontColor, marginRight: "20px", marginTop: "20px", padding: '10px' }} key={index} label={tag} />
                                            })
                                        }
                                    </Grid>
                                    <Grid item xs={4}  >
                                        <Card sx={{ bgcolor: 'transparent', boxShadow: 0, marginTop: "10px", color: fontColor }} >
                                            <CardHeader
                                                avatar={
                                                    <Avatar sx={{ cursor: 'pointer' }} onClick={() => navigateToProfile({ name: data?.question?.user[0]?.name, _id: data?.question?.user[0]?._id })} src={data?.question?.user[0]?.profile_image} aria-label="recipe">

                                                    </Avatar>
                                                }
                                                color={fontColor}
                                                titleTypographyProps={{
                                                    color: fontColor,
                                                }}
                                                subheaderTypographyProps={{
                                                    color: fontColor
                                                }}
                                                title={data?.question?.user[0]?.name}
                                                subheader={"joined " + new Date(data?.question?.user[0]?.createdAt).toLocaleDateString()}
                                            />
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography sx={{
                            fontSize: '20px'
                        }}>
                            {data?.answers?.length} Answers
                        </Typography>
                    </Grid>
                    <Grid item xs={6} >
                        <FormControl fullWidth sx={{ color: fontColor }}>
                            <InputLabel sx={{ color: fontColor }} id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                value={10}
                                label="Sort"
                                sx={{ color: fontColor }}
                            // onChange={}
                            >
                                <MenuItem value={10}>Highest Score</MenuItem>
                                <MenuItem value={20}>New first</MenuItem>
                                <MenuItem value={30}>Old first</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {
                    data?.answers?.map((answer, index) => (
                        < Grid container key={index} xs={12} marginBottom={'50px'} >
                            {
                                handleUpAndDownVoteAnswer &&
                                <Grid item xs={2} display={'flex'} flexDirection={'column'} alignItems={"center"}>
                                    <Tooltip title={answer?.up_vote?.includes(_id) ? "Already upvoted" : _id === answer?.user[0]?._id ? "you can't vote your own question" : "Its usefull"}>
                                        <IconButton sx={{
                                            color: (!answer?.up_vote?.includes(_id)) ? fontColor : "orange",
                                        }} disableRipple
                                            onClick={() => handleUpAndDownVoteAnswer?.upVote(answer._id)}
                                        >
                                            <ArrowDropUpIcon sx={{ fontSize: '70px' }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Typography>
                                        {answer?.up_vote?.length - answer?.down_vote?.length}
                                    </Typography>
                                    <Tooltip title={answer?.down_vote?.includes(_id) ? "Already down voted" : _id === answer?.user[0]?._id ? "you can't vote your own question" : "Its not usefull"}>
                                        <IconButton sx={{
                                            color: (!answer?.down_vote?.includes(_id)) ? fontColor : "orange",
                                        }} disableRipple
                                            onClick={() => handleUpAndDownVoteAnswer?.downVote(answer._id)}
                                        >
                                            <ArrowDropDownIcon sx={{ fontSize: '70px' }} />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            }
                            <Grid item xs={handleUpAndDownVoteAnswer ? 10 : 12}>
                                <Grid container direction={'column'}>
                                    <Grid item xs={12} >
                                        <Typography >
                                            <div className="content">
                                                {HTMLReactParser(answer?.body ?? "")}
                                            </div>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} direction={'row'}  >
                                        <Grid container>
                                            {

                                            }
                                            <Grid item sm={6} >
                                                {
                                                    answer?.editedUser &&
                                                    <Card sx={{ bgcolor: 'transparent', boxShadow: 0, marginTop: "10px", color: fontColor }}>
                                                        <CardHeader
                                                            avatar={
                                                                <Avatar sx={{ cursor: 'pointer' }} onClick={() => navigateToProfile({ name: answer?.editedUser?.name, _id: answer?.editedUser?._id })} src={answer?.user[0]?.profile_image} aria-label="recipe">

                                                                </Avatar>
                                                            }
                                                            color={fontColor}
                                                            titleTypographyProps={{
                                                                color: fontColor,
                                                            }}
                                                            subheaderTypographyProps={{
                                                                color: fontColor
                                                            }}

                                                            title={"Last edited by"}
                                                            subheader={answer?.editedUser?.name}
                                                        />
                                                    </Card>
                                                }
                                            </Grid>
                                            <Grid item sm={6} >
                                                <Card sx={{ bgcolor: 'transparent', boxShadow: 0, marginTop: "10px", color: fontColor }}>
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar sx={{ cursor: 'pointer' }} onClick={() => navigateToProfile({ name: answer?.user[0]?.name, _id: answer?.user[0]?._id })} src={answer?.user[0]?.profile_image} aria-label="recipe">

                                                            </Avatar>
                                                        }
                                                        color={fontColor}
                                                        titleTypographyProps={{
                                                            color: fontColor,
                                                        }}
                                                        subheaderTypographyProps={{
                                                            color: fontColor
                                                        }}
                                                        action={
                                                            <MenuComponent user={user} answer={answer} />
                                                        }
                                                        title={answer?.user[0]?.name}
                                                        subheader={"joined " + new Date(answer?.user[0]?.createdAt).toLocaleDateString()}
                                                    />
                                                </Card>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>
            {
                handleSubmitAnswer &&
                <Grid item xs={12}>
                    <Grid container direction={'column'} justifyContent={"space-between"}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: '20px', marginTop: '30px' }}>Submit answer</Typography>
                        </Grid>
                        <Grid item xs={12} height={"100%"}>
                            <ReactQuill style={{ height: "300px", marginTop: "20px" }} theme='snow' onChange={handleAnswer} modules={modules} formats={formats} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={handleSubmitAnswer}
                                sx={{ minHeight: '50px', width: '100%', marginTop: '70px', color: fontColor, bgcolor: cardBg }}
                            >
                                <span>Submit answer</span>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </Grid >
    )
}

export default ViewQuestion
import { Container, Grid, IconButton, Menu, MenuItem, Stack, Typography, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useColors from '../../../assets/Colors'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from '@mui/material/Fade';
import HTMLReactParser from 'html-react-parser';
import ViewQuestion from '../../../components/ViewQuestion/ViewQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { downVoteQuestion, getQuestion, upvoteQuestion } from '../../../redux/feature/User/singleQuestion/Singlequestion';
import { useParams } from 'react-router-dom';
import { upVoteQuestion } from '../../../services/question';
import { addAnswer } from '../../../services/answer';


function ViewQuestionPage() {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { question_id } = useParams()
    const { token } = useSelector(state => state.admin.admin)
    const { question } = useSelector(state => state.question)
    const [answer, setAnswer] = useState()
    const [loading, setLoading] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleAnswer = (html) => {
        setAnswer(html)
    };
    const handleSubmitAnswer = () => {
        setLoading(true)
        addAnswer({ html: answer, question_id,role:'admin' }).then((response) => {
            console.log(response.data);
            setLoading(false)
        }).catch((err) => {
            console.log(err.message)
            setLoading(false)
        })
    };


    useEffect(() => {
        dispatch(getQuestion({ question_id, token,role:'admin' }))
    }, [])
    const { fontColor } = useColors()
    return (
        <Container sx={{
            display: "flex",
            justifyContent: "center",
        }}>
            <ViewQuestion  handleAnswer={handleAnswer} data={question ? question[0] : {}} submitAnswer={loading} />
        </Container>
    )
}

export default ViewQuestionPage
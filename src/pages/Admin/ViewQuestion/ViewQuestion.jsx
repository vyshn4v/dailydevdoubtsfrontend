import { Container } from '@mui/material'
import  { useEffect, useState } from 'react'
import ViewQuestion from '../../../components/ViewQuestion/ViewQuestion';
import { useDispatch, useSelector } from 'react-redux';
import {  getQuestion } from '../../../redux/feature/User/singleQuestion/Singlequestion';
import { useParams } from 'react-router-dom';
import { addAnswer } from '../../../services/answer';


function ViewQuestionPage() {
    const dispatch = useDispatch()
    const { question_id } = useParams()
    const { token } = useSelector(state => state.admin.admin)
    const { question } = useSelector(state => state.question)
    const [answer, setAnswer] = useState()
    const [loading, setLoading] = useState(false)

    const handleAnswer = (html) => {
        setAnswer(html)
    };
    const handleSubmitAnswer = () => {
        setLoading(true)
        addAnswer({ html: answer, question_id, role: 'admin' }).then((response) => {
            console.log(response.data);
            setLoading(false)
        }).catch((err) => {
            console.log(err.message)
            setLoading(false)
        })
    };


    useEffect(() => {
        dispatch(getQuestion({ question_id, token, role: 'admin' }))
    }, [dispatch, question_id, token])
    return (
        <Container sx={{
            display: "flex",
            justifyContent: "center",
        }}>
            <ViewQuestion handleSubmitAnswer={handleSubmitAnswer} handleAnswer={handleAnswer} data={question ? question[0] : {}} submitAnswer={loading} />
        </Container>
    )
}

export default ViewQuestionPage
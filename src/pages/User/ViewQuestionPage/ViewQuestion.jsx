import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import ViewQuestion from '../../../components/ViewQuestion/ViewQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { addAnswerToState, downVoteAnswer, downVoteQuestion, getQuestion, upvoteAnswer, upvoteQuestion } from '../../../redux/feature/User/singleQuestion/Singlequestion';
import { useParams } from 'react-router-dom';
import { addAnswer } from '../../../services/answer';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading/Loading';
import { addToBookmarkQuestion, removeFromBookmarkQuestion } from '../../../redux/feature/User/userAuth/Auth';


function ViewQuestionPage() {
  const dispatch = useDispatch()
  const { question_id } = useParams()
  const { token, _id: user_id } = useSelector(state => state.user.user)
  const { question } = useSelector(state => state.question)
  const [answer, setAnswer] = useState()

  const handleAnswer = (html) => {
    setAnswer(html)
  };
  const handleSubmitAnswer = () => {
    if (!answer) {
      toast.error("Please enter the answer")
      return
    }
    const id = toast.loading("uploading answer")
    addAnswer({ html: answer, question_id,role:'user' }).then((response) => {
      console.log(response.data);
      dispatch(addAnswerToState(response?.data?.data))
      toast.update(id, { render: "Aswer uploaded", type: "success", isLoading: false, autoClose: 2000 })
    }).catch((err) => {
      console.log(err);
      toast.update(id, { render: err.response.data.message || err.message || "answer uploading failed", type: "error", isLoading: false, autoClose: 2000 })
    })
  };

  const user = useSelector(state => state.user.user)
  useEffect(() => {
    dispatch(getQuestion({ question_id, token,role:'user' }))
  }, [dispatch, question_id, token])
  const handleUpAndDownVote = {
    upVote: () => {
      dispatch(upvoteQuestion({ question_id, user_id, token,role:'user' }))
    },
    downVote: () => {
      dispatch(downVoteQuestion({ question_id, user_id, token,role:'user' }))
    },
    bookmark: () => {
      if (user?.bookmark?.includes(question[0]._id)) {
        dispatch(removeFromBookmarkQuestion({ id: question_id,role:'user' }))
      } else {
        dispatch(addToBookmarkQuestion({ id: question_id,role:'user' }))
      }
    }
  }
  const handleUpAndDownVoteAnswer = {
    upVote: (answer_id) => {
      dispatch(upvoteAnswer({ answer_id, upvote: true,role:'user' }))
    },
    downVote: (answer_id) => {
      dispatch(downVoteAnswer({ answer_id,role:'user' }))
    }

  }
  return (
    <Container sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: 'center'
    }}>
      {
        question ?
          <ViewQuestion handleSubmitAnswer={handleSubmitAnswer} handleAnswer={handleAnswer} data={question ? question[0] : {}} handleUpAndDownVote={handleUpAndDownVote} handleUpAndDownVoteAnswer={handleUpAndDownVoteAnswer} />
          :
          <Loading />
      }
    </Container>
  )
}

export default ViewQuestionPage
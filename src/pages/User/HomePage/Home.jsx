import { Button, Container, Stack, Typography } from "@mui/material"
import QuestionCard from "../../../components/QuestionCard/QuestionCard"
import QuestionCardSkeleton from "../../../components/QuestionCard/QusetionCardSkeleton"
import { Suspense, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllQuestion } from "../../../redux/feature/User/Questions/Question"
import InputBar from "../../../components/InputBar/InputBar"


function Home() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.user.token)
    const [data, setData] = useState([])
    const [search, setSearch] = useState([])
    const { questions } = useSelector(state => state.questionList)
    useEffect(() => {
        dispatch(getAllQuestion({ start: 0, limit: 10, token,role:'user' }))

    }, [])


    const handleSearchSubmit = () => {
        dispatch(getAllQuestion({ start: 0,search, limit: 10, token,role:'user' }))
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <>
            <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: "center", minHeight: "100vh", marginTop: "90px" }}>
                <Stack sx={{
                    minWidth: '100%',
                    marginLeft: "10px"
                }}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} margin={"10px"}>
                        <Typography sx={{
                            fontSize: "30px",
                            marginLeft: "20px",
                            marginBottom: "40px"
                        }}>Questions</Typography>
                        <Stack direction={'row'} >

                            <Stack direction={'row'} >
                                <InputBar button={<Button onClick={handleSearchSubmit} variant='text' disableRipple sx={{ bgcolor: "transparent", backgroundColor: 'transparent' }}>Search</Button>} onChange={handleSearch} name={'question_id'} type={"text"} placeholder={'Enter the word'} />
                            </Stack>
                        </Stack>
                    </Stack>
                    {
                        questions?.map((question, index) => {

                            let data = {
                                _id: question?._id,
                                votes: question?.up_vote?.length - question?.down_vote?.length,
                                answers: question?.answers?.length,
                                views: question?.views,
                                title: question?.title,
                                body: question?.body,
                                tags: question?.tags,
                                user: {
                                    _id: question?.user?._id,
                                    name: question?.user?.name,
                                    email: question?.user?.email,
                                    profile_image: question?.user?.profile_image,
                                    reputation: question?.user?.reputation,
                                    asked: new Date(question?.createdAt).toLocaleDateString() + " " + new Date(question?.createdAt).toLocaleTimeString()
                                }
                            }
                            return < QuestionCard data={data} key={index} />

                        })
                    }
                </Stack>
            </Container>
        </>
    )
}

export default Home
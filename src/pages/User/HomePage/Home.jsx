import {  Button, Container, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import QuestionCard from "../../../components/QuestionCard/QuestionCard"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllQuestion, resetQuestions } from "../../../redux/feature/User/questions/Question"
import InputBar from "../../../components/InputBar/InputBar"
import Loading from "../../../components/Loading/Loading"
import adServices from '../../../services/advertisement'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import { useErrorBoundary } from "react-error-boundary"


function Home() {
    const { showBoundary } = useErrorBoundary();
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.user.token)
    const [search, setSearch] = useState([])
    const [ads, setAds] = useState([])
    const { questions, isError } = useSelector(state => state.questionList)
    useEffect(() => {
        dispatch(getAllQuestion({ start: 0, limit: 10, token, role: 'user' }))
        adServices.getAdevertisements({ role: 'user' }).then((res) => {
            setAds(res.data.data)
        }).catch((error) => {
            throw new Error(error)
        })
        if (isError) {
            showBoundary("Something went wrong")
        }
        return () => {
            dispatch(resetQuestions())
        }
    }, [dispatch, isError, showBoundary, token])


    const handleSearchSubmit = () => {
        dispatch(getAllQuestion({ start: 0, search, limit: 10, token, role: 'user' }))
    }
    const handleClear = () => {
        dispatch(getAllQuestion({ start: 0, limit: 10, token, role: 'user' }))
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <>
            <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: "center", minHeight: "100vh", marginTop: "90px" }}>
                <Stack sx={{
                    minWidth: '100%',
                    marginLeft: "10px",
                    marginRight: "10px",
                    display: 'flex'
                }}>
                    <Stack width={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} margin={"10px"}>
                        <Typography sx={{
                            fontSize: "30px",
                            marginLeft: "20px",
                            marginBottom: "40px"
                        }}>Questions</Typography>
                        <Stack direction={'row'} >

                            <Stack direction={'row'} >
                                <InputBar value={search} button={<><Button onClick={handleSearchSubmit} variant='text' disableRipple sx={{ bgcolor: "transparent", backgroundColor: 'transparent' }}>Search</Button><Button onClick={handleClear} variant='text' disableRipple sx={{ bgcolor: "transparent", backgroundColor: 'transparent' }}>clear</Button></>} onChange={handleSearch} name={'question_id'} type={"text"} placeholder={'Enter the word'} />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack width={'100%'} display={'flex'} flexDirection={'row'} >
                        <Stack width={isMobileView || ads?.length === 0 ? '100%' : '80%'} display={'flex'}>
                            {!questions ? <Loading /> :
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
                        {
                            ads?.length === 0 ? "" :
                                !isMobileView &&
                                <Stack width={'20%'} marginLeft={'10px'}>
                                    <Swiper className="mySwiper" style={{ width: '100%' }} modules={[Autoplay]} autoplay={{
                                        delay: 10000,
                                        disableOnInteraction: true,
                                    }}>
                                        {
                                            ads?.map((ad, index) => (
                                                <SwiperSlide key={index} >
                                                    <a href={ad.websiteUrl} target="blank">
                                                        <img style={{ width: "100%", objectFit: 'cover' }} src={ad.image} alt="" />
                                                    </a>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                </Stack>
                        }
                    </Stack>
                </Stack>

            </Container>
        </>
    )
}

export default Home
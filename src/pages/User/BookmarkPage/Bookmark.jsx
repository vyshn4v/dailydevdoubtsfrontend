import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookmarkedQuestions, removeBookmark, reset } from '../../../redux/feature/User/bookmarks/Bookmarks'
import { toast } from 'react-toastify'
import TableComponent from '../../../components/Table/Table'
import { Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import InputBar from '../../../components/InputBar/InputBar'
import bookMarkService from '../../../services/question'
import { updateBookMark } from '../../../redux/feature/User/userAuth/Auth'
function Bookmark() {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const { token } = useSelector(state => state.user.user)
    const { isLoading, isError, isSuccess } = useSelector(state => state.bookmarks)
    const Bookmarks = useSelector(state => state.bookmarks.bookmarks?.Bookmarks)
    const [id, setId] = useState(null)
    const [rearrangedData, setRearrangedData] = useState(null)
    const navigate = useNavigate()
    const handleRemove = (id) => {
        bookMarkService.removeFromBookmarkQuestion({ id }).then((res) => {
            dispatch(removeBookmark(id))
            dispatch(updateBookMark(id))
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(() => {
        if (isLoading && !id) {
            setId(toast.loading('Please wait'))
        }
        if (!isError && !isSuccess && !Bookmarks) {
            dispatch(bookmarkedQuestions({ token, role: 'user' }))
        }
        if (!isLoading && isSuccess) {
            toast.update(id, { render: "sucess fully loaded", type: "success", isLoading: false, autoClose: 1000 })
        }

        if (Bookmarks) {
            let data = Bookmarks?.map((question) => {
                return {
                    Title: question?.title,
                    PostedOn: new Date(question?.createdAt).toLocaleDateString(),
                    UpdatedOn: new Date(question?.updatedAt).toLocaleDateString(),
                    "View question": <Button onClick={() => navigate('/question/' + question?._id)} variant="text">view</Button>,
                    Handle: { name: "Remove", color: "error", action: () => handleRemove(question._id) }
                }
            })
            setRearrangedData(data)
        }
    }, [dispatch, isError, isLoading, isSuccess,Bookmarks])
    useEffect(() => {

        return () => {
            dispatch(reset())
        }

    }, [])
    useEffect(() => {
        if (Bookmarks) {
            let data = Bookmarks?.filter((question) => question.title.toLowerCase()?.includes(search?.toLowerCase())).map((question) => {
                return {
                    Title: question?.title,
                    PostedOn: new Date(question?.createdAt).toLocaleDateString(),
                    UpdatedOn: new Date(question?.updatedAt).toLocaleDateString(),
                    "View question": <Button onClick={() => navigate('/question/' + question?._id)} variant="text">view</Button>,
                    Handle: { name: "Remove", color: "error", action: () => handleRemove(question._id) }
                }
            })
            setRearrangedData(data)
        }

    }, [search])
    function handleSearch(e) {
        setSearch(e.target.value)
    }
    return (
        <>
            <Stack direction={'column'} maxHeight={'80vh'}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} margin={"10px"}>
                    <Typography sx={{
                        fontSize: "30px",
                        marginLeft: "20px",
                        marginBottom: "20px"
                    }}>Bookmarks</Typography>
                    <Stack direction={'row'} >
                        <Stack direction={'row'} >
                            <InputBar onChange={handleSearch} name={'question_id'} type={"text"} placeholder={'Enter the word'} />
                        </Stack>
                    </Stack>
                </Stack>
                <TableComponent data={rearrangedData ?? []} />
            </Stack>
        </>
    )
}

export default Bookmark
import { useState } from "react";
import InputBar from "../../../components/InputBar/InputBar"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Button, Chip, Stack, Typography } from "@mui/material";
import UseColors from "../../../assets/Colors";
import { toast } from "react-toastify";
import { addQuestion } from "../../../services/question";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function AskQuestion() {
    const { buttonColor, fontColor } = UseColors()
    const [html, setHtml] = useState('')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState('')
    const user_id = useSelector(state => state.user.user._id)
    const token = useSelector(state => state.user.user.token)
    const navigate = useNavigate()
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

    const handleSubmit = () => {
        addQuestion({ user_id, title, html, tags,role:'user' }, token).then((response) => {
            if (response.data.status) {
                toast.success("Question successfully added")
                navigate('/')
            }
        }).catch((err) => {
            if (err.response.data.message) {
                toast.error(err.response.data.message)
            } else {
                toast.error("something went wrong")
            }
        })
    }
    const handleInputValue = (e) => {
        if (e.target.name === "title") {
            setTitle(e.target.value)
        }
        if (e.target.name === "tags") {
            setTag(e.target.value)
        }
    }
    const handleTagsValue = () => {
        if (!tag) {
            return toast.error('Please Enter the keyword')
        }
        if (!tags.includes(tag)) {
            setTags((prev) => [...prev, tag])
            setTag('')
        } else {
            toast.error('Same keyword not allowed')
        }
    }
    const handleDelete = (tag) => {
        console.log(tag);
        setTags(prev => prev?.filter((value) => value !== tag))
    }
    return (
        <>
            <Stack sx={{ maxWidth: "700px", minHeight: "80vh" }} direction={'column'} justifyContent={'space-between'}>
                <Stack sx={{ height: "3.33%", marginTop: "70px" }}>
                    <Typography sx={{fontSize:'25px'}}>
                        Ask questions
                    </Typography>
                </Stack>
                <Stack sx={{ height: "33.33%" }}>
                    <Typography>
                        Title
                    </Typography>
                    <InputBar onChange={handleInputValue} name={'title'} value={title} />
                </Stack>
                <Stack sx={{ marginTop: "10px", height: "33.33%", marginBottom: "20px" }}>
                    <Typography>
                        Body
                    </Typography>
                    <ReactQuill style={{ height: "250px" }} theme="snow" value={html} onChange={setHtml} modules={modules} formats={formats} />
                </Stack>

                <Stack style={{ marginTop: "20px", height: "33.33%" }}>
                    <Typography style={{ marginTop: "20px" }}>
                        Tags
                    </Typography>
                    <div>
                        {tags?.map((tag, index) => <Chip label={tag} sx={{ marginTop: "5px", color: fontColor, bgcolor: buttonColor }} color="info" variant="outlined" key={index} onDelete={() => handleDelete(tag)} />)}
                    </div>
                    <Stack alignItems={'center'} marginTop={"10px"}>
                        <InputBar onChange={handleInputValue} name={"tags"} value={tag} />
                        <Button
                            sx={{
                                height: "40px",
                                width: "100%",
                                bgcolor: buttonColor,
                                color: fontColor,
                                "&:hover": {
                                    bgcolor: buttonColor,
                                    color: fontColor
                                },
                                marginTop: "20px"
                            }}
                            onClick={handleTagsValue}
                        >Add</Button>
                    </Stack>
                </Stack>
                <Button
                    sx={{
                        width: "100%",
                        height: "40px",
                        bgcolor: buttonColor,
                        color: fontColor,
                        "&:hover": {
                            bgcolor: buttonColor,
                            color: fontColor
                        },
                        marginTop: "30px"
                    }}
                    onClick={() => handleSubmit()}
                >Submit</Button>
            </Stack>

        </>
    )
}

export default AskQuestion
import { useEffect, useState } from "react";
import InputBar from "../../../components/InputBar/InputBar"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Button, Chip, Stack, Typography } from "@mui/material";
import UseColors from "../../../assets/Colors";
import { toast } from "react-toastify";
import { addQuestion } from "../../../services/question";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { editAnswer, editAnswerRequest } from "../../../services/answer";
function SuggestEditAnswer() {
    const { buttonColor, fontColor } = UseColors()
    const [html, setHtml] = useState('')
    const token = useSelector(state => state.user.user.token)
    const navigate = useNavigate()
    const { question_id } = useParams()
    const { state: { answer } } = useLocation()
    useEffect(() => {
        if (answer === null) {
            navigate('/question/' + question_id)
        } else {
            setHtml(answer?.body ?? '')
        }
    }, [answer])
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
        editAnswerRequest({ answer_id: answer?._id, html, token,role:'user' }).then((response) => {
            console.log(response);
            if (response.data.status) {
                toast.success("Request successfully updated")
                navigate('/question/' + question_id)
            }
        }).catch((err) => {
            console.log(err);
            if (err.response.data.message) {
                toast.error(err.response.data.message)
            } else {
                toast.error("something went wrong")
            }
        })
    }
    return (
        <>
            <Stack sx={{ maxWidth: "700px", minHeight: "80vh" }} direction={'column'} justifyContent={'space-between'}>
                <Stack sx={{ height: "3.33%", marginTop: "70px" }}>
                    <Typography sx={{ fontSize: '25px' }}>
                        Suggest Answer
                    </Typography>
                </Stack>
                <Stack sx={{ marginTop: "10px", height: "33.33%", marginBottom: "20px" }}>
                    <ReactQuill style={{ height: "250px" }} theme="snow" value={html} onChange={setHtml} modules={modules} formats={formats} />
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

export default SuggestEditAnswer
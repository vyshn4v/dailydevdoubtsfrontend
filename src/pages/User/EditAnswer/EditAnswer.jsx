import { useEffect, useState } from "react";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Button,  Stack, Typography } from "@mui/material";
import UseColors from "../../../assets/Colors";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { editAnswer } from "../../../services/answer";
function EditAnswer() {
    const { buttonColor, fontColor } = UseColors()
    const [html, setHtml] = useState('')
    const token = useSelector(state => state.user.user.token)
    const navigate = useNavigate()
    const { question_id } = useParams()
    const { state:{answer} } = useLocation()
    useEffect(() => {
        if (answer===null) {
            navigate('/question/' + question_id)
        }else{
            setHtml(answer?.body??'')
        }
    }, [answer, navigate, question_id])
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
        editAnswer({ answer_id:answer?._id, html,role:'user' }, token).then((response) => {
            if (response.data.status) {
                toast.success("Answer successfully edited")
                navigate('/question/' + response.data.data._id)
            }
            console.log(response);
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
                        Edit Answer
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

export default EditAnswer
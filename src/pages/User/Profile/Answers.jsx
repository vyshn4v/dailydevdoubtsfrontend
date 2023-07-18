import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TableComponent from '../../../components/Table/Table'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

function Answers() {
    const answers = useSelector(state => state.profile.profile.answers)
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const handleNavigate = ({ _id }) => {
        navigate('/question/' + _id)
    }
    useEffect(() => {
        setData(answers?.map((answer) => {
            return {
                Body: answer.body?.substr(0, 40) + "...",
                Asked: new Date(answer.createdAt).toLocaleDateString(),
                Answer: <Button color='primary' onClick={() => handleNavigate({ _id: answer.question })}>view</Button>,
            }
        }))
    }, [answers])
    return (
        <TableComponent data={data} />
    )
}

export default Answers
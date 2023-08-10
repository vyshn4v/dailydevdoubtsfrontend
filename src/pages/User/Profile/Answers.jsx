import  { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TableComponent from '../../../components/Table/Table'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

function Answers() {
    const answers = useSelector(state => state.profile.profile.answers)
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const handleNavigate = useCallback((_id) => {
        navigate('/question/' + _id)
    },[navigate])
    useEffect(() => {
        setData(answers?.map((answer) => {
            return {
                Body: <div dangerouslySetInnerHTML={{__html:answer.body?.substr(0, 100) + "..."}}></div>,
                Asked: new Date(answer.createdAt).toLocaleDateString(),
                Answer: <Button color='primary' onClick={() => handleNavigate(answer.question )}>view</Button>,
            }
        }))
    }, [answers, handleNavigate])
    return (
        <TableComponent data={data} />
    )
}

export default Answers
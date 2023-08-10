import { Button } from '@mui/material'
import  { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TableComponent from '../../../components/Table/Table'

function Questions() {
    const question = useSelector(state => state.profile.profile.questions)
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const handleNavigate = useCallback(( _id ) => {
        navigate('/question/' + _id)
    },[navigate])
    useEffect(() => {
        setData(question?.map((question) => {
            return {
                Body: question.title?.substr(0,40)+"...",
                Asked: new Date(question.createdAt).toLocaleDateString(),
                Quesiton: <Button color='primary' onClick={() => handleNavigate( question._id )}>view</Button>,
            }
        }))
    }, [handleNavigate, question])
    return (
        <TableComponent data={data}/>
    )
}

export default Questions
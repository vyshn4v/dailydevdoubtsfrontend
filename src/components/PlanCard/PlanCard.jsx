/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PlanCard({ data,handlePayment }) {
    const { plan, price, totalQuestions, totalAnswers, totalDays,_id } = data
    return (
        <Card sx={{ maxWidth: 345, margin: 1 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {plan ?? ""}
                </Typography>
                <Typography gutterBottom component="div">
                    {price === 0 ? "Free" : "Price " + price ?? ``}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {totalQuestions ?? ""} questions and {totalAnswers ?? ``} answer request per day for {totalDays ?? ""} days
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant='outlined' onClick={()=>handlePayment(price,_id)}>Purchase</Button>
            </CardActions>
        </Card>
    );
}
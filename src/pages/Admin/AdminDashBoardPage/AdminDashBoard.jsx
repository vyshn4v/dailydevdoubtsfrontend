import { useEffect, useState } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Box, Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material';
import UseColors from '../../../assets/Colors';
import dashboardServices from '../../../services/dashboard'
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading/Loading';
import { useSelector } from 'react-redux';
function AdminDashBoard() {
  const { token } = useSelector(state => state.admin.admin)
  const [data, setData] = useState({})
  const [graphData, setGraphData] = useState()
  const { cardBg, fontColor } = UseColors()
  useEffect(() => {
    dashboardServices.getDashBoardData({ token,role:'admin' }).then((res) => {
      console.log(res);
      setData(res.data?.data)
      const questionChart = res.data.data.questionChart
      const userChart = res.data.data.userChart
      const chatChart = res.data.data.chatChart
      console.log(questionChart,
        userChart,
        chatChart);
      const questionKeys = Object.keys(questionChart[0]?.data)
      const questionData = questionKeys.map((key) => questionChart[0]?.data[key])

      const usersKeys = Object.keys(userChart[0]?.data)
      const usersData = usersKeys.map((key) => userChart[0]?.data[key])

      const chatChartKeys = Object.keys(chatChart[0]?.data)
      const chatChartData = chatChartKeys.map((key,) => chatChart[0]?.data[key])
      setGraphData({
        labels: questionKeys,
        questionData,
        usersData,
        chatChartData
      })
    }).catch((err) => {
      console.log(err);
      toast.error('error while loading data')
    })
  }, [])
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Over all data',
      },
    },
  };

  const graph = {
    labels: graphData?.labels,
    datasets: [
      {
        label: 'Questions',
        data: graphData?.questionData,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'users',
        data: graphData?.usersData,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      // {
      //   label: 'Group',
      //   data: graphData?.chatChartData,
      //   backgroundColor: 'rgba(23, 134, 135, 0.5)',
      // },
    ],
  };
  return (
    <>
      {
        !data ? <Loading /> :
          <Stack minWidth={'100%'} direction={'column'}>
            <Grid container marginTop={10} display={'flex'} minWidth={'100%'} gap={2} justifyContent={'center'}>

              <Grid key={'total users'}>
                <Card sx={{ maxWidth: 345, bgcolor: cardBg, color: fontColor }}>
                  <CardContent sx={{ color: fontColor, display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: fontColor }}>
                      Total users in this month
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ color: fontColor }}>
                      {data?.totalUsersInMonth}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* <Grid key={"total group"}>
                <Card sx={{ maxWidth: 345, bgcolor: cardBg, color: fontColor }}>
                  <CardContent sx={{ color: fontColor, display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: fontColor }}>
                      Total Group in this month
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ color: fontColor }}>
                      {data?.totalGroupInMonth}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid> */}

              <Grid key={"total questions"}>
                <Card sx={{ maxWidth: 345, bgcolor: cardBg, color: fontColor }}>
                  <CardContent sx={{ color: fontColor, display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: fontColor }}>
                      Total Questions in this month
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ color: fontColor }}>
                      {data?.totalQuestionsInMonth}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
            <Stack minWidth={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Stack minWidth={"80%"} >
                <Bar options={options} data={graph} />
              </Stack>
            </Stack>
          </Stack>
      }
    </>
  )
}

export default AdminDashBoard

// console.log(chartData.orderChart[0].data)
// const ordersKeys = Object.keys(chartData.orderChart[0].data)
// const ordersData = ordersKeys.map((key, index) => chartData.orderChart[0].data[key])
// const usersKeys = Object.keys(chartData.userChart[0].data)
// const usersData = usersKeys.map((key, index) => chartData.userChart[0].data[key])
// const restaurantKeys = Object.keys(chartData.restaurantChart[0].data)
// const restaurantData = restaurantKeys.map((key, index) => chartData.restaurantChart[0].data[key])
// new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ordersKeys,
//         datasets: [{
//             label: 'orders',
//             data: ordersData,
//             borderWidth: 1
//         }, {
//             label: 'users',
//             data: usersData,
//             borderWidth: 1
//         }, {
//             label: 'restaurants',
//             data: restaurantData,
//             borderWidth: 1
//         }]
//     },
//     responsive: true,
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });
// })
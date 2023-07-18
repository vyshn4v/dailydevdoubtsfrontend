import { Alert, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import UseColors from '../../../assets/Colors'
import TokenIcon from '@mui/icons-material/Token';
import { useSelector } from 'react-redux';
function Badge() {
  const badges = useSelector(state => state.profile.profile.badges)
  const { cardBg, fontColor } = UseColors()
  const colors = {
    Bronze: "brown",
    Silver: 'silver',
    Gold: 'orange'
  }
  return (
    <>
      <Grid container gap={3} justifyContent={'center'}>
        {badges.length ?
          badges?.map((badge, index) => (
            <Grid item sm={12} md={4} lg={3} key={index}>
              <Card sx={{ minWidth: 275, bgcolor: cardBg, color: fontColor }}>
                <CardContent>
                  <Typography sx={{ fontSize: 50, color: fontColor }} color="text.secondary" gutterBottom>
                    <TokenIcon sx={{ color: colors[badge.badge] }} fontSize={'40px'} />
                  </Typography>
                  <Typography variant="h5" component="div">
                    {badge.badge + " "}
                    {badge.count}
                  </Typography>
                  <Typography sx={{ mb: 1.5, color: fontColor }} color="text.secondary">
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )) :
          <Grid>
            <Alert severity="info">Badges will be initialized within 24 hours please wait</Alert>
          </Grid>
        }
      </Grid>
    </>
  )
}

export default Badge
import { Avatar, Button, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomModal from '../../../components/AddPlanCustomModal/CustomModal'
import AdvertiseMentModal from '../../../components/AdvertisementModal/AdvertiseMentModal'
import TableComponent from '../../../components/Table/Table'
import { toast } from 'react-toastify'
import adsService from '../../../services/advertisement'
function AdverTiseMentPage() {
    const [image, setImage] = useState(null)
    const [label, setLabel] = useState('')
    const [websiteUrl, setWebsiteUrl] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [ads, setAds] = useState([])
    const [rearrangedData, setRearrangedData] = useState([])
    const handleSubscriptionPlanSubmit = () => {
        if (!image || !label || !expiryDate) {
            toast.error('Fields are requrired')
            return
        }
        console.log(image, label, expiryDate);
        adsService.postAdvertisement({ image, label, expiryDate,websiteUrl }).then((res) => {
            setAds(prev => [...prev, res.data.data])
            toast.success('advertisement successfully added')
            setImage(null)
            setLabel('')
            setExpiryDate('')
        }).catch((err) => {
            toast.error(err.response.data.message ?? 'failed to add ads')
        })
    }
    const handleDeleteads = (ad_id) => {
        console.log(ad_id);
        if (!ad_id) {
            toast.error('Fields are requrired')
            return
        }
        adsService.deleteAdvertisement({ ad_id }).then((res) => {
            if (res.data.status) {
                let data = ads.filter((ad) => ad._id != ad_id)
                setAds(data)
                toast.success('advertisement successfully deleted')
                setImage(null)
                setLabel('')
                setExpiryDate('')
            } else {
                toast.success(res.data.message)
            }
        }).catch((err) => {
            toast.error(err.response.data.message ?? 'failed to add ads')
        })
    }
    const manageExpiryDate = (e) => {
        setExpiryDate(e)
    }
    const managePlansState = (e) => {
        console.log(e);
        if (e.target.name === 'image') {
            setImage(e.target.files[0])
        }
        if (e.target.name === 'label') {
            setLabel(e.target.value)
        }
        if (e.target.name === 'product_link') {
            setWebsiteUrl(e.target.value)
        }
    }
    useEffect(() => {
        adsService.getAdevertisements({ role: "admin" }).then((res) => {
            setAds(res.data.data)
        }).catch((err) => {
            toast.error('failed to load ads')
        })
    }, [])
    useEffect(() => {
        let data = ads.map((ad) => {
            return {
                Image: <Avatar src={ad.image} />,
                Label: ad.label,
                Status: new Date(ad.expired_At) > new Date() ? "Active" : "Expired",
                AdUrl:ad.websiteUrl,
                EXpiredAt: new Date(ad.expired_At).toLocaleDateString(),
                Action: <Button onClick={() => handleDeleteads(ad._id)}>Delete</Button>
            }
        })
        setRearrangedData(data)
    }, [ads])
    return (
        <Container sx={{ marginTop: 10 }}>
            <Grid container xs={12}>
                <Grid item xs={6} justifyContent={'flex-end'}>
                    <Typography sx={{
                        fontSize: "30px",
                        marginLeft: "20px",
                        marginBottom: "20px"
                    }}>
                        Manage Advertisement
                    </Typography>
                </Grid>
                <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
                    <AdvertiseMentModal manageExpiryDate={manageExpiryDate} button={'Add ads'} managePlansState={managePlansState} state={{
                        image, label, expiryDate,websiteUrl
                    }} handleSubmit={handleSubscriptionPlanSubmit} />
                </Grid>
                <Grid item xs={12}>
                    <Grid item gap={3} justifyContent={'center'}>
                        <TableComponent data={rearrangedData} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AdverTiseMentPage
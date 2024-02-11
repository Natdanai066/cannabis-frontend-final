"use client"
import React, { useRef, useState } from 'react';
import Navbar from '../navbar/Navbar.jsx';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useEffect } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Axios from 'axios';
import { useRouter } from "next/navigation";
import config from '../utils/config.js'
import Link from 'next/link';
import Container from '@mui/material/Container';
import "../globals.css";
import Providers from '../components/Providers'



const Postpage = () => {

    const BASE_URL = config.SERVER_URL
    const [cannabisList, setCannabisList] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)
    const router = useRouter()
  
    const getCannabis = () => {
      Axios.get(`${BASE_URL}/cannabis`).then((response) => {
        setCannabisList(response.data)
      })
    }
    useEffect(() => {
        getCannabis()
      }, [])

      const handleOpenGoogleMaps = (id) => {
        const googleMapsUrl = (cannabis.lc);
        // แทน YourLocation ด้วยตำแหน่งที่คุณต้องการ
    
        // เปิด Google Maps ในหน้าต่างใหม่
        window.open(googleMapsUrl, '_blank');
      };

      return (
        
<>
<Providers>
        <Navbar />
        </Providers>
        
          
        <br />
        <br />
<Container maxWidth="md">
                <Grid container spacing={2}>
                  {cannabisList.length <= 0
                    ? "ไม่พบข้อมูล!!"
                    : cannabisList.map((cannabis, index) => (
                      <Grid item xs={6} sm={4} md={3} lg={4} key={index}>
                        <Card sx={{ maxWidth: 350 }}>
                          <CardMedia
                            sx={{ height: 180 }}
                            image={cannabis.image}
                            title="green iguana"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {cannabis.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {cannabis.detail.length > 100 ? `${cannabis.detail.substring(0, 100)}...` : cannabis.detail}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              onClick={() => window.open(cannabis.lc, '_blank')}
                            >
                              Google Maps
                            </Button>

                            <Link className="btn btn-info text-blue" href={{ pathname: '/moredetail', query: { cannabisId: cannabis.id } }} >เพิ่มเติม</Link>

                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </Container>
    
             </>
      )
}
export default Postpage;
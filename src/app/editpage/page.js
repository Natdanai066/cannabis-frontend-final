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
import "./style.css"
import { getSession } from 'next-auth/react';



const editpage = () => {

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
    const handleClick = () => {
        router.push('/moredetail');
    };

    useEffect(() => {
        async function checkAdminStatus() {
          const session = await getSession();
          if (!session || session.user.role !== "ADMIN") {
            router.push('/');
          }
        }
    
        checkAdminStatus();
      }, [router]);

 
    const deleteCannabis = (id) => {
        const shouldDelete = window.confirm("คุณต้องการลบข้อมูลนี้จริง ๆ หรือไม่?");
        if (shouldDelete) {
          Axios.delete(`${BASE_URL}/cannabis/${id}`).then((response) => {
            setCannabisList(
              cannabisList.filter((val) => {
                return val.id !== id
              })
            )
          }).then(() => {
            if (isDeleted === false) {
              setIsDeleted(true)
              setTimeout(() => {
                setIsDeleted(false)
              }, 2000)
            }
          })
        }
      }
    

    return (

        <>
            <Providers>
                <Navbar />
            </Providers>

            <br/>
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1vh' }}>หน้าแก้ไขข้อมูล</h1>

            <div className="flex">
        {/* แถบฝั่งซ้าย */}
        <div className="bg-gray-200 w-1/4 p-4">
          {/* เนื้อหาแถบฝั่งซ้าย */}
          <ul>
            <li><Link href="/admin">เพิ่มข้อมูล</Link></li>
            
          </ul>
        </div>

        
        
            <br />
            <br />
            <Container maxWidth="md">
            
                <Grid container spacing={2}>
                    {cannabisList.length <= 0
                        ? "ไม่พบข้อมูล!!"
                        : cannabisList.map((cannabis, index) => (
                            <Grid item xs={6} sm={4} md={4} lg={4} key={index}>
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

                                        <Button onClick={handleClick}>
                                            เพิ่มเติม
                                        </Button>
                                        <Link className="btn btn-warning text-white"href={{ pathname: '/pageedit', query: { cnbId: cannabis.id } }} >แก้ไข</Link>
                                        <Button onClick={() => deleteCannabis(cannabis.id)}style={{ color: 'red' }}>ลบข้อมูล</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </Container>
</div>
        </>
    )
}

export default editpage;
"use client";
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from '../navbar/Navbar';
import config from "../utils/config.js";

function Editmenu() {
  const BASE_URL = config.SERVER_URL;
  const searchParams = useSearchParams();
  const cannabisIdParams = searchParams.get("cannabisId");
  const [cannabisData, setcannabisData] = useState([]);

  const getCannabis = () => {
    Axios.get(`${BASE_URL}/cannabis/${cannabisIdParams}`)
      .then((response) => {
        console.log('response data = ', response.data);
        setcannabisData(response.data);
      })
  }

  useEffect(() => {
    getCannabis();
  }, []);

  const [isSubmitSucceed, setIsSubmitSucceed] = useState(false);

  const handleChange = (event) => {
    setcannabisData({ ...cannabis, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(cannabis);

    const bodyData = {
      name: cannabis.name,
      image: cannabis.image,
      detail: cannabis.detail,
      lc: cannabis.lc,
      // ตัวแปรอื่น ๆ ที่ต้องการ 
    }

  }

  return (
    <>
      <Navbar />
      <div className="h-screen">
        <div className="bg-white">
          <br />

          <Container maxWidth="md">
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6} lg={6} >
                <Card sx={{ maxWidth: 350 }} key={cannabisData.id}>
                  <CardMedia
                    sx={{ height: 180 }}
                    image={cannabisData.image}
                    title="green cannabis"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" >
                      {cannabisData.name}

                    </Typography>
                    <Typography variant="body2" color="text.secondary" >

                      {cannabisData.detail}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => window.open(cannabisData.lc, '_blank')}
                    >
                      Google Maps
                   
                   </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>

          <div className="flex justify-center align-middle gap-4 mt-10">
            <Link href={{ pathname: '/postpage' }} passHref>
              <Button className="btn px-12">ย้อนกลับ</Button>
            </Link>
          
          </div>
        </div>
      </div>
    </>
  );
}

export default Editmenu;
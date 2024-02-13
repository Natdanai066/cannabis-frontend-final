"use client";
import React, { useEffect, useState } from 'react';
import Providers from '../components/Providers'
import Navbar from '../navbar/Navbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Axios  from 'axios';
import config from '../utils/config';
import Container from '@mui/material/Container';

const moredetail = () => {
  const BASE_URL = config.SERVER_URL
  const [cannabisList, setCannabisList] = useState([])
    

  const getCannabis = () => {
    Axios.get(`${BASE_URL}/cannabis`).then((response) => {
      setCannabisList(response.data)
    })
  }
  useEffect(() => {
      getCannabis()
    }, [])
    const cannabis = cannabisList.length > 0 ? cannabisList[0] : null;

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
      <br/>
    <Container maxWidth="sm">
      
       {cannabisList.length <= 0
                    ? "ไม่พบข้อมูล!!"
                    : cannabisList.map((cannabis, index) => (
      <iframe
        title="Google Maps"
        width="700"
        height="700"
        loading="lazy"
        allowfullscreen
        src={cannabis.embed}>
      </iframe>
                    ))
}
</Container>
    </>
  );
};

export default moredetail;
"use client"
import React, { useState } from "react";
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Axios from 'axios';
import Link from 'next/link';
import config from "../utils/config.js";
import "../utils/config.js";
import Navbar from '../navbar/Navbar';
import Providers from '../components/Providers'
import '../globals.css'
import { Container } from "@mui/material";
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';


export default function AdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // ตัวอย่าง state สำหรับเก็บข้อมูลภาพ
    image: null,
    // เพิ่ม state อื่น ๆ ตามความต้องการ
  });

  const BASE_URL = config.SERVER_URL
  const [values, setValues] = useState({
    name: "",
    detail: "",
    lc: "",
    image: "",
  });
  const [isSubmitSucceed, setIsSubmitSucceed] = useState(false)

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: [event.target.value] });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values);
    alert(values);

    try {
      // เพิ่มโค้ด Axios.post เพื่อส่งข้อมูลไปยัง API
      await Axios.post(`${BASE_URL}/cannabis`, values)
        .then((res) => console.log("Registered Successfully!!"))
        .catch((err) => console.log(err));


      setValues({
        name: "",
        detail: "",
        image: "",
        lc: "",
      });

      window.location.reload();

    } catch (error) {
      console.log('error', error);
    }
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

  return (
    <>
      
        <Providers>
  <Navbar />
</Providers>

<div className="flex justify-center items-center h-screen">
<div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', margin: '20px auto', maxWidth: '275px' }}> 
    
<Container maxWidth="sm">
  <h1 className="text-2xl mb-6 font-bold color-b" style={{ color: 'black' }}>กรอกข้อมูล</h1>
<br/>
    <form onSubmit={handleSubmit}>
      <div class="grid grid-cols-3 gap-4">
        <div className="mb-3 col-span-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text" style={{ color: 'black' }}>ชื่อร้าน</span>
            </div>
            <input
              type="text"
              placeholder="ใส่ชื่อร้าน.."
              name="name"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <br/>
        <div className="mb-3 col-span-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text"style={{ color: 'black' }} >รายละเอียดร้าน</span>
            </div>
            <input
              type="text"
              placeholder="กรอกรายละเอียดร้านและที่อยู่.."
              name="detail"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <br/>
        <div className="mb-3 col-span-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text"style={{ color: 'black' }}>location ของร้าน</span>
            </div>
            <input
              type="text"
              placeholder="กรอกลิ้งค์ google maps.."
              name="lc"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <br/>
        <div className="mb-3 col-span-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text"style={{ color: 'black' }}>ใส่รูปภาพ</span>
            </div>
            <input
              type="text"
              placeholder="ใส่รูปภาพเป็นลิ้งค์.."
              name="image"
              className="input input-bordered w-full"
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
<br/>
      <div className="flex justify-center mt-10">
       
        <button type="Submit" className="btn bg-green-500 text-white px-12 rounded">
          บันทึก
        </button>
      
      </div>
    </form>
    </Container>
  </div>
  </div>


      

    </>

  );
}


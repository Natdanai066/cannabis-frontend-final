"use client";
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useSearchParams } from "next/navigation"
import Link from 'next/link'
import config from "../utils/config.js"
import Providers from '../components/Providers.js'
import Navbar from '../navbar/Navbar.jsx';
import { Container } from "@mui/material";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

function editpost() {
  const BASE_URL = config.SERVER_URL
  const searchParams = useSearchParams()
  const cnbIdParams = searchParams.get("cnbId");
  const [cannabis, setCannabisList] = useState([])

  const getCannabis = () => {
    Axios.get(`${BASE_URL}/cannabis/${cnbIdParams}`).then((response) => {
      console.log('response data = ', response.data);
      setCannabisList(response.data)
    })
  }

  useEffect(() => {
    getCannabis()
  }, []);

  const [isSubmitSucceed, setIsSubmitSucceed] = useState(false)

  const handleChange = (event) => {
    setCannabisList({ ...cannabis, [event.target.name]: [event.target.value] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(cannabis);

    const bodyData = {
      name: cannabis.name,
      lc: cannabis.lc,
      detail: cannabis.detail,
      image: cannabis.image,
      embed: cannabis.embed,

    }

    try {
      // เพิ่มโค้ด Axios.post เพื่อส่งข้อมูลไปยัง API
      await Axios.patch(`${BASE_URL}/cannabis/${cnbIdParams}`, bodyData)
        .then((res) => console.log("Updated Successfully!!"))
        .catch((err) => console.log(err));

      setCannabisList({
        name: "",
        lc: "",
        detail: "",
        image: "",
        embed: "",
      });

      window.location.reload();

    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <Providers>
        <Navbar />
      </Providers>
      <br />


      <div className="flex">
        {/* แถบฝั่งซ้าย */}
        <div className="bg-gray-200 w-1/4 p-4">
          {/* เนื้อหาแถบฝั่งซ้าย */}
          <ul>
            <li><Link href="/admin">เพิ่มข้อมูล</Link></li>



          </ul>
        </div>

        <div className="flex justify-center items-center h-screen">
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', margin: '20px auto', maxWidth: '600px' }}>

            <Container maxWidth="sm">
              <h1 className="text-2xl mb-6" style={{ color: 'black', textAlign: 'center' }}>กรอกข้อมูล</h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-4">
                  <div className="mb-3 col-span-2">
                    <label className="form-control w-full">
                      <div className="label">
                      </div>
                      <FormControl>
                        <FormLabel>ชื่อร้าน</FormLabel>
                        <Input

                          name="name"
                          type="text"
                          placeholder="ชื่อร้าน.."
                          onChange={handleChange}
                          required
                          value={cannabis.name}
                        />
                      </FormControl>
                    </label>
                  </div>
                  <br />
                  <FormControl>
                    <FormLabel>รายละเอียดร้าน</FormLabel>
                    <Input

                      name="detail"
                      type="text"
                      placeholder="กรอกรายละเอียดร้านและที่อยู่.."
                      onChange={handleChange}
                      required
                      value={cannabis.detail}
                    />
                  </FormControl>
                  <br />
                  <FormControl>
                    <FormLabel>location ของร้าน</FormLabel>
                    <Input

                      name="lc"
                      type="text"
                      placeholder="กรอกลิ้งค์ google maps.."
                      onChange={handleChange}
                      required
                      value={cannabis.lc}
                    />
                  </FormControl>
                  <br />
                  <FormControl>
                    <FormLabel>ใส่รูปภาพ</FormLabel>
                    <Input

                      name="image"
                      type="text"
                      placeholder="กรอกรายละเอียดร้านและที่อยู่.."
                      onChange={handleChange}
                      required
                      value={cannabis.image}
                    />
                  </FormControl>
                  <br />
                  <FormControl>
                    <FormLabel>ใส่ Embedmaps</FormLabel>
                    <Input

                      name="embed"
                      type="text"
                      placeholder="ลิ้งค์ของร้าน.."
                      onChange={handleChange}
                      required
                      value={cannabis.embed}
                    />
                  </FormControl>
                  <br />

                </div>

                <div className="flex justify-center mt-10">

                  <Button type="Submit" className="btn bg-green-500 text-white px-12 rounded">
                    บันทึก
                  </Button>

                  <Link href={{ pathname: '/editpage' }} className="btn px-12" style={{ color: 'blue' }}>
                    ย้อนกลับ
                  </Link>

                </div>
              </form>
            </Container>
          </div>
        </div>
      </div>

    </>
  );
}
export default editpost;
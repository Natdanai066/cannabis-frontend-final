"use client";
import React, { useState } from "react";
//import { format,isValid } from 'date-fns';
import Axios from 'axios';
import Link from 'next/link';
import config from "../utils/config.js";
import "../utils/config.js";
import Navbar from '../navbar/Navbar.jsx';
import Providers from '../components/Providers';
import '../globals.css'

function Singup() {
    const [formData, setFormData] = useState({
        // ตัวอย่าง state สำหรับเก็บข้อมูลภาพ
        image: null,
        // เพิ่ม state อื่น ๆ ตามความต้องการ
      });

  const BASE_URL = config.SERVER_URL
  const [values, setValues] = useState({
    name: "",
    detail:"",
    lc:"",
    image:"",
  });

  const [isSubmitSucceed, setIsSubmitSucceed] = useState(false)

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: [event.target.value] });
  };

//   const handleDateChange = (date) => {
//     if(isValid(date)){
//   const formattedDate = format(date, 'yyyy/MM/dd');
//     setValues((prevData) => ({
//       ...prevData,
//       start_date: formattedDate,
//     }));
//   }
//   }; 
  

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
        detail:"",
        image:"",
        lc:"",
      });

      window.location.reload();

    } catch (error) {
      console.log('error', error);
    }
  };
  

  const handleImageUpload = (imageFile) => {
    // อัพโหลดไฟล์ภาพและปรับปรุง state
    setFormData({
      ...formData,
      image: imageFile,
    });
  };



  return (
    <body>
        <Providers>
        <Navbar />
        </Providers>
        <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="relative shadow-lg p-8 w-2/4 h-[842px] text-center bg-white rounded-md">
        <div className="flex justify-center"></div>
        <div className="flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-2/4 text-center mx-auto">
        <h1 className="text-2xl mb-6 font-bold">กรอกข้อมูล</h1>

<br />
<br />
<br />
            <form onSubmit={handleSubmit}>
              <div class="grid grid-cols-3 gap-4">
                

              <div className="mb-3 col-span-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">ชื่อร้าน</span>
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

                
              
              <div className="mb-3 col-span-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">รายละเอียดร้าน</span>
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
                
                <div className="mb-3 col-span-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">location ของร้าน</span>
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
                <div className="mb-3 col-span-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">รูปภาพ</span>
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
                
                <div>
      {/* เรียกใช้ Component ImageUpload และส่ง callback function */}
      
      {/* <ImageUpload onImageUpload={handleImageUpload} name="image"/> */}
      

      {/* ตัวอย่างอื่น ๆ ของฟอร์ม */}
      {/* <input type="text" value={formData.someField} onChange={(e) => setFormData({ ...formData, someField: e.target.value })} /> */}
      
      
    </div>
              




              <div className="flex justify-center align-middle gap-4 mt-10">
              <Link href={{ pathname: '/' }} className="btn bg-blue-500 text-white px-12 rounded">ย้อนกลับ</Link>

<button
  className="btn bg-green-500 text-white px-12 rounded"
  type="Submit"
>
  บันทึก
</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </body>
  );
}


export default Singup;
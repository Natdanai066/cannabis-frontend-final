"use client";
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useSearchParams } from "next/navigation"
import Link from 'next/link'
import config from "../utils/config.js"
import Providers from '../components/Providers'
import Navbar from '../navbar/Navbar.jsx';

function editSlip() {
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

            setEmployeeList({
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

                    <h1 className="text-2xl mb-6" style={{ color: 'black', textAlign: 'center' }}>แก้ไขข้อมูล</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="mb-3 col-span-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text" style={{ color: 'black' }}>ชื่อร้าน</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="ใส่ชื่อร้าน"
                                            name="name"
                                            className="input input-bordered w-full"
                                            onChange={handleChange}
                                            required
                                            value={cannabis.name}
                                        />
                                    </label>
                                </div>
                            </div>
                            <br />
                            <div className="mb-3 col-span-3">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text" style={{ color: 'black' }}>รายละเอียดร้าน</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="กรอกรายละเอียดร้านและที่อยู่.."
                                        name="lc"
                                        className="input input-bordered w-full"
                                        onChange={handleChange}
                                        required
                                        value={cannabis.lc}
                                    />
                                </label>
                            </div>
                            <br />
                            <div className="mb-3 col-span-3">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text" style={{ color: 'black' }}>location ของร้าน</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="กรอกลิ้งค์ google maps.."
                                        name="lc"
                                        className="input input-bordered w-full"
                                        onChange={handleChange}
                                        required
                                        value={cannabis.lc}
                                    />
                                </label>
                            </div>
                            <br />
                            <div className="mb-3 col-span-3">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text" style={{ color: 'black' }}>ใส่รูปภาพ</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="ใส่รูปภาพเป็นลิ้งค์.."
                                        name="image"
                                        className="input input-bordered w-full"
                                        onChange={handleChange}
                                        required
                                        value={cannabis.image}
                                    />
                                </label>
                            </div>
                            <br />
                            <div className="mb-3 col-span-3">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text" style={{ color: 'black' }}>ใส่ Embedmaps</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="ลิ้งค์ของร้าน.."
                                        name="embed"
                                        className="input input-bordered w-full"
                                        onChange={handleChange}
                                        required
                                        value={cannabis.embed}
                                    />
                                </label>
                            </div>
                            <br />

                            <div className="flex justify-center mt-10">
                                <Link href={{ pathname: '/' }} className="btn btn-warning px-12 mr-4">
                                    ย้อนกลับ
                                </Link>
                                <button className="btn btn-success text-white px-12" type="submit">
                                    แก้ไขข้อมูล
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}
export default editSlip;
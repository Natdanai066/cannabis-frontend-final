"use client"
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import Navbar from './navbar/Navbar.jsx'
import styles from "./home.module.css";
import "./globals.css";
import AppBar from "../app/components/AppBar";
import Providers from "./components/Providers";
import './globals.css'





const EmptyPage = () => {

  
 
  
  return (
    <>
    <Providers>
        <Navbar />
        </Providers>
            <br />
            <br />
            <br/>
            <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Cannabis List.</h1>
        <br/>
        <p className={styles.desc}>
          This website is Cannabis list in Thailand.
        </p>
        <div className={styles.buttons}>
          
        </div>
       
      </div>
      <div className={styles.imgContainer}>
        <Image src="/hero.gif" alt="" fill className={styles.heroImg}/>
      </div>
    </div>

    


         
      
      
      
    </>
   
  )
};

export default EmptyPage;
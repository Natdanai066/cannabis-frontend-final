"use client";
import React, { useState, useRef } from 'react';
import { Backend_URL } from '../lib/Constants';
import { Button } from '../components/Button';
import InputBox from '../components/InputBox';
import Link from 'next/link';
import styles from './SignupPage.module.css';
import Navbar from '../navbar/Navbar';
import Providers from '../components/Providers';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const [data, setData] = useState<FormInputs>({
    name: '',
    email: '',
    password: '',
  });

  const register = async () => {
    try {
      const res = await fetch(`${Backend_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        alert(res.statusText);
        return;
      }

      const response = await res.json();
      alert('User Registered!');
      console.log({ response });
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
<>
      <Providers>
        <Navbar />
      </Providers>
      <div className={styles.container}>
        <div className={styles.header}>Sign up</div>
        <div className={styles.form}>

          <InputBox
            autoComplete="off"
            name="name"
            labelText="Name"
            required
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <InputBox
            name="email"
            labelText="Email"
            required
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <InputBox
            name="password"
            labelText="Password"
            type="password"
            required
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <div className={styles.buttonGroup}>
            <Button onClick={register}>Submit</Button>
            <Link href="/" passHref> {/* ใช้ passHref เพื่อให้ลิงก์ทำงานถูกต้อง */}
              <Button>Cancel</Button> {/* เปลี่ยน <a> เป็น <Button> หรืออย่างอื่นที่ไม่ใช่ <a> */}
            </Link>
          </div>
        </div>
      </div>
      </>
      );
};

      export default SignupPage;

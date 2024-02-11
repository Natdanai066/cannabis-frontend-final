"use client";
import React, { useState, useRef } from 'react';
import { Backend_URL } from '../lib/Constants';
import { Button } from '../components/Button';
import InputBox from '../components/InputBox';
import Link from 'next/link';
import Providers from '../components/Providers'
import Navbar from '../navbar/Navbar';


const SignupPage = () => {
  const [data, setData] = useState({
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
    <div className="m-2 border rounded overflow-hidden shadow">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">
        Sign up
      </div>
      <div className="p-2 flex flex-col gap-6">
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
        <div className="flex justify-center items-center gap-2">
          <Button onClick={register}>Submit</Button>
          <Link href="/">Cancel</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignupPage;
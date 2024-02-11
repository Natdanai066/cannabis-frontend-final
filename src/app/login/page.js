"use client"
import React, { useState } from 'react';
import Axios from 'axios';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import config from '../utils/config';
import { useRouter } from "next/navigation"; // แก้ไขการ import
import Navbar from '../navbar/Navbar';
import'../utils/config';
import { Providers } from '../components/Providers'

function LoginFinal() {
  const BASE_URL = config.SERVER_URL;
  const router = useRouter();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await Axios.post(`${BASE_URL}/auth/login`,{

      
        email: values.email,
        password: values.password
      });
      console.log("Login Successful:", response.data);

      setValues({
        email: '',
        password: '',
      });

      if (response.data.success) {
        // Login สำเร็จ, ทำการเด้งไปยังหน้าหลัก
        router.push('/');
      } else {
        setError(response.data.message);
        console.error("Login Failed:", response.data.message);
      }
    } catch (error) {
      setError('Login error');
      console.error('Login Error:', error);
    }
  };

  return (
    <CssVarsProvider>
      <Providers>
      <Navbar />
      </Providers>
      <br />
      <main>
        <Sheet
          sx={{
            width: 300,
            mx: 'auto',
            my: 4,
            py: 3,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              value={values.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </FormControl>

          <Button sx={{ mt: 1 }} type="submit" onClick={handleSubmit}>
            Log in
          </Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Typography
            endDecorator={<Link href="/register">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </main>
     
    </CssVarsProvider>
  );
}

export default LoginFinal;
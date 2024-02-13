"use client";
import React, { useState, useRef } from 'react';
import { Backend_URL } from '../lib/Constants';
// import { Button } from '../components/Button';
// import InputBox from '../components/InputBox';
// import Link from 'next/link';
import styles from './SignupPage.module.css';
import Navbar from '../navbar/Navbar';
import Providers from '../components/Providers';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

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
<CssVarsProvider>
      <Providers>
        <Navbar />
        </Providers>
      <br/>
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
              <b>Register</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>username</FormLabel>
            <Input
              name="name"
              type="text"
              placeholder=""
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="your password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </FormControl>
          <Button sx={{ mt: 1 }} type="submit" onClick={register}>
            Submit
          </Button>
          <Typography
            endDecorator={<Link href="/api/auth/signin">Login</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            You already have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
      </>
      );
};

      export default SignupPage;

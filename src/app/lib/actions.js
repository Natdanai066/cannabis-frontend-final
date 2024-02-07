"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
import { Axios } from "axios";




export const addPost = async (prevState,formData) => {
  // const title = formData.get("title");
  // const desc = formData.get("desc");
  // const slug = formData.get("slug");

  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
  

    await Axios.delete(`${BASE_URL}/users/${id}`)
    console.log("deleted from db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState,formData) => {
  const { username, email, password, date } = Object.fromEntries(formData);

  try {
    
    const newUser = new User({
      username,
      email,
      password,
      date,
    });

    await Axios.post(`${BASE_URL}/users`, newUser)
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    

    await Axios.delete(`${BASE_URL}/users/${id}`)
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// export const handleGithubLogin = async () => {
//   "use server";
//   await signIn("github");
// };

// export const handleLogout = async () => {
//   "use server";
//   await signOut();
// };

// export const register = async (previousState, formData) => {
//   const { username, email, password, img, passwordRepeat } =
//     Object.fromEntries(formData);

//   if (password !== passwordRepeat) {
//     return { error: "Passwords do not match" };
//   }

//   try {
    

//     const user = await Axios.get`${BASE_URL}/users/`({ username });

//     if (user) {
//       return { error: "Username already exists" };
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       date,
//     });

//     await Axios.post(`${BASE_URL}/users`, newUser)
//     console.log("saved to db");

//     return { success: true };
//   } catch (err) {
//     console.log(err);
//     return { error: "Something went wrong!" };
//   }
// };
export const register = async (previousState, formData) => {
  const { username, email, password, passwordRepeat } = Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    // ตรวจสอบว่ามีชื่อผู้ใช้ซ้ำหรือไม่
    const userResponse = await Axios.get(`${BASE_URL}/users/`, { params: { username } });
    const user = userResponse.data;

    if (user) {
      return { error: "Username already exists" };
    }

    // เข้ารหัสรหัสผ่าน
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // สร้าง User object
    const newUser = {
      username,
      email,
      password: hashedPassword,
      date: new Date(), // ให้แน่ใจว่าคุณได้ import User และสร้าง constructor ของ User ให้ถูกต้อง
    };

    // ทำการลงทะเบียนผู้ใช้
    await Axios.post(`${BASE_URL}/users`, newUser);
    console.log("Saved to the database");

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong!" };
  }
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
"use client";
import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { SessionProvider } from "next-auth/react";




const links = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Post",
    path: "/postpage",
  },

];

const Links =() => {
 
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <SessionProvider>
<>
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {!session && ( // ตรวจสอบว่าไม่มี session และแสดงลิงก์ไปยังหน้าลงทะเบียนเท่านั้น
          <NavLink item={{ title: "Register", path: "/signup" }} />
        )}
        
        {session ? ( // ตรวจสอบว่ามี session หรือไม่
          <div className="flex gap-4 ml-auto">
            
            <p className="text-sky-600">{session.user.name}</p>
            <Link href={"/api/auth/signout"} className="flex gap-4 ml-auto text-red-600">
              Sign Out
            </Link>
            {session.user.role === "ADMIN" && ( // ตรวจสอบว่าผู้ใช้เป็น admin หรือไม่
              <NavLink item={{ title: "AdminDashboard", path: "/admin" }} /> // เพิ่มลิงก์ไปยังหน้า /admin เฉพาะ admin เท่านั้น
            )}
          </div>
          
        ) : (
          <NavLink item={{ title: "Login", path: "/api/auth/signin" }} />
        )}
      </div>
      
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
          {session && ( // ตรวจสอบว่ามี session หรือไม่ และแสดงชื่อผู้ใช้และลิงก์ออกจากระบบ
            <div className="flex gap-4 ml-auto">
              <p className="text-sky-600">{session.user.name}</p>
              
              <Link href={"/api/auth/signout"} className="flex gap-4 ml-auto text-red-600">
                Sign Out
              </Link>
              
            </div>
          )}
        </div> 
      )}
    </div>
    
    
    </>
    </SessionProvider>
  );
};


export default Links;
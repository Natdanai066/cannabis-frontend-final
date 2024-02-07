"use client"
import Link from "next/link"
import Links from "./links/Links"
import styles from "./navbar.module.css"
import { auth } from "../lib/auth";

const Navbar =  () => {

  // const session = await auth();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>Cannabis List</Link>
      <div>
        <Links />
      </div>
    </div>
  )
}

export default Navbar
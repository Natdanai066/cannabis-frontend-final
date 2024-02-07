import Image from "next/image";
import styles from "./about.module.css";
import Navbar from "../navbar/Navbar";
import Providers from '../components/Providers';

export const metadata = {
  title: "About Page",
  description: "About description",
};


const AboutPage = () => {

  // console.log("lets check where it works")
  return (
  
    <>
     <Providers>
        <Navbar />
        </Providers>
    <br/>
    <br/>
    <br/>
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Cannabis</h2>
        <h1 className={styles.title}>
          We create this website for Canabis Shop in thailand.
        </h1>
        <p className={styles.desc}>
          The website that grows from cannabis not only enhances joy in usage but also serves as a space connecting creative thoughts and sparking new waves of ideas. Every process is an art of innovation, and we believe that beautiful paths can be found everywhere in the gaze of cannabis.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>

          </div>

        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src="/about.png"
          alt="About Image"
          fill
          className={styles.img} />
      </div>
    </div></>
  );
};

export default AboutPage;
import Head from 'next/head'
import styles from '../styles/Home.module.css'
<<<<<<< HEAD
import AppBar from '../components/header'
import Card from '../components/cards'
import PostCards from '../components/cards_alt';
import fire from '../config/fire-config'
=======
import fire from '../config/fire-config'
import AppBar from '../components/header'
>>>>>>> e41883ea04d4dc44219a7de48d3b04a433dda1d3

export default function Home() {
  return (

    <div className={styles.container}> 
      <AppBar/>
      <div className={styles.rad}>
        <div className={styles.annonseContainer}>
            <PostCards/>
        </div>
      </div>
     </div>
  )
}

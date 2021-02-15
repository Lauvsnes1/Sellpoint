import Head from 'next/head'
import styles from '../styles/Home.module.css'
import AppBar from '../components/header'
import Card from '../components/cards'



export default function Home() {
  return (
    <div className={styles.container}> 
      <AppBar>

      </AppBar>
      <div className={styles.rad}>
        <div className={styles.annonseContainer}>
            <Card>
            </Card>
            <Card>

            </Card>
            <Card>
            </Card>
            
        </div>
        <div className={styles.annonseContainer}>
            <Card>
            </Card>
            <Card>

            </Card>
            <Card>
            </Card>
            
        </div>
      </div>
     </div>
  )
}

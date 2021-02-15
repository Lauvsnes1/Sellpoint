import Head from 'next/head'
import Link from "next/link"
import Image from "next/image"
import Layout from '../components/layout'
import utilStyles from "../styles/utils.module.css"
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
      props: {
        allPostsData
      }
    }
  }

export default function Test({ allPostsData }) {
    return (
        <>
        <Layout>
        <Head>
            <title>Sellpoint - Forside</title>
        </Head>
        <div className={utilStyles.heading2Xl}>
        <h2>
            <Link href="/Annonse">
                <a>
                Spisebord
                </a>
            </Link>
        </h2>
        </div>,
        <Image src="/images/spisebord.jpg" height={214} width={320} alt="Spisebord"/>
        <h3 className="link">
            <Link href="/Annonse">
                <a>
                    Gå til annonse
                </a>
            </Link>
        </h3>
        </Layout>
        <style jsx>{`

            

            `}

        </style>
        </>
    )
    

}

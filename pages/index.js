import Head from 'next/head'
import Link from "next/link"
import Image from "next/image"
import Layout from '../components/layout'
import utilStyles from "../styles/utils.module.css"

export default function Test() {
    return (
        <>
        <Layout>
        <div className={utilStyles.heading2Xl}>
        <Head>
            <title>Sellpoint - Forside</title>
        </Head>
        </div>
        <h2 className="title">
            <Link href="/Annonse">
                <a>
                Spisebord
                </a>
            </Link>
        </h2>,
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

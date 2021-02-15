import Head from 'next/head'
import Link from "next/link"
import Image from "next/image"
import Layout from '../components/layout'

export default function Test2() {
    return (
        <>
        <Layout>
        <Head>
            <title>Annonse-Spisebord</title>
        </Head>
        <h1>Spisebord</h1>
        <Image src="/images/spisebord.jpg" height={428} width={640} alt="Spisebord"/>
        <h2 className="title">
            <Link href="/">
                <a>
                Tilbake til forsiden
                </a>
            </Link>
        </h2>
        </Layout>,
        <style jsx>{`

            

            `}

        </style>
        </>
    )
    

}
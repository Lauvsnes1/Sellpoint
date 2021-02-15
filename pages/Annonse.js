import Head from 'next/head'
import Link from "next/link"
import Image from "next/image"
export default function Test2() {
    return (
        <>
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
        </h2>,
        <style jsx>{`

            .title {
                color: red;
                font-style: Broadway
            }

            `}

        </style>
        </>
    )
    

}
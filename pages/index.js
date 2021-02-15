import Head from 'next/head'
import Link from "next/link"
import Image from "next/image"
export default function Test() {
    return (
        <>
        <Head>
            <title>Sellpoint - Forside</title>
        </Head>
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
        <style jsx>{`

            .link {
                color: green;
                font-style: Algerian
            }

            `}

        </style>
        </>
    )
    

}

import Link from "next/link"
import Image from "next/image"
export default function Test() {
    return (
        <>
        <h2 className="title">
            <Link href="/Annonse.js">
                <a>
                Støvsuger
                </a>
            </Link>
        </h2>,
        <Image src="/images/spisebord.jpg" height={214} width={320} alt="Spisebord"/>
        <h3 className="link">
            <Link href="/Annonse.js">
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

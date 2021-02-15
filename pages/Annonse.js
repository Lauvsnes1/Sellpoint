import Link from "next/link"
export default function Test2() {
    return (
        <>
        
        <h3>Mindre overskrift</h3>
        <Image src="/images/spisebord.jpg" height={428} width={640} alt="Spisebord"/>
        <h2 className="title">
            <Link href="/index.js">
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
import Link from "next/link"
export default function Test2() {
    return (
        <>
        
        <h3>Mindre overskrift</h3>
        <Image src="/images/spisebord.jpg" height={428} width={640} alt="Spisebord"/>
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
import Link from "next/link"
export default function Test2() {
    return (
        <h1 className="title">
            Read{" "}
            <Link href="/test">
                <a>
                Tilbake  til den andre siden igjen
                </a>
            </Link>
        </h1>,
        <h3>Mindre overskrift</h3>
    )
    

}
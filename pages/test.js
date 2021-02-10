import Link from "next/link"
export default function Test() {
    return (
        <>
        <h1>Test123</h1>,
        <h3 className="link">
            <Link href="/test2">
                <a>
                    Gå til andre siden
                </a>
            </Link>
        </h3>
        </>
    )
    

}

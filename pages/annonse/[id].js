import fire from "../../config/fire-config";
import { useRouter} from "next/router";
import Image from "next/image"
import {useState, useEffect } from "react"

export async function getServerSideProps({res, params}) {
    const documentData = await fire.firestore()
    .collection('posts')
    .doc(params.id)
    .get()
    .then((doc) => {
        if (doc.exists) {
            return doc.data()
        } else {
            res.statusCode = 302
            res.setHeader('Location', '/404')
            res.end();
        }
    });

    const userData = await fire.firestore()
    .collection('users')
    .doc(documentData.userID)
    .get()
    .then((doc) => {
        if (doc.exists) {
            return doc.data()
        } else {
            return ""
        }
    });

  return {
    props: {
        data: documentData,
        userData: userData
    }, 
  };
}

export default function Annonse({data, userData}){
    console.log(data)
    console.log(userData)
    return (
        <div>
            <h1>{data.title}</h1>
            <Image
            src={data.imageUrl}
            width={600}
            height={400}
            />
            <p><span>Lokasjon: </span> {data.place}</p>
            <p><span>Pris: </span> {data.price}</p>
            <p><span>Beskrivelse: </span>{data.description}</p>
            <p><span>Selger: </span> {userData.firstName} {userData.lastName}</p>
            <p><span>E-post: </span></p>
        </div>
    )

}
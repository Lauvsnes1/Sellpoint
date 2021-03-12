import fire from "../../config/fire-config";
import AppBar from "../../components/header";
import { useState } from "react";
import { Button } from "@material-ui/core";
import Link from "next/link";
import ImageContainer from "../../components/image_container";

export async function getServerSideProps({ res, params }) {
  const documentData = await fire
    .firestore()
    .collection("posts")
    .doc(params.id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        res.statusCode = 302;
        res.setHeader("Location", "/404");
        res.end();
      }
    });

  const userData = await fire
    .firestore()
    .collection("users")
    .doc(documentData.userID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return "";
      }
    });

  return {
    props: {
      docid: params.id,
      data: documentData,
      userData: userData,
    },
  };
}

export default function Annonse({ data, userData, docid }) {
  const [owner, setOwner] = useState(false);
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setOwner(data.userID == user.uid);
    }
  });
  return (
    <div>
      <style jsx>{`
        .container {
          width: 80%;
          max-width: 700px;
          margin: auto;
        }
        h1 {
          font-family: "helvetica neue";
          font-size: 48pt;
          font-weight: normal;
        }
        span {
          color: #90cc00;
          font-weight: bold;
        }
        a {
          text-decoration: underline;
        }
        .top-div {
          margin-top: 5rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
      <div className="container">
        <AppBar />
        <div className="top-div">
          <h1>{data.title}</h1>
          <EditButton isOwner={owner} docid={docid} />
        </div>
        <ImageContainer
          imageSrcs={data.imagesRef.map((imageRef) => imageRef.url)}
        />
        <p>
          <span>Lokasjon: </span> {data.place}
        </p>
        <p>
          <span>Pris: </span> {data.price} kr
        </p>
        <p>
          <span>Beskrivelse: </span>
          {data.description}
        </p>
        <p>
          <span>Selger: </span> {userData.firstName} {userData.lastName}
        </p>
        <p>
          <span>E-post: </span>
          <a
            href={`mailto:${userData.email}?subject=[Selpoint]%20${data.title}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {userData.email}
          </a>
        </p>
      </div>
    </div>
  );
}

function EditButton(props) {
  const isOwner = props.isOwner;

  if (isOwner) {
    return (
      <Link href={`/editpost/${props.docid}`}>
        <a>
          <Button variant="outlined" color="secondary">
            Rediger
          </Button>
        </a>
      </Link>
    );
  } else {
    return <></>;
  }
}

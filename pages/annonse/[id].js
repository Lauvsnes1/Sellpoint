import fire from "../../config/fire-config";
import AppBar from "../../components/header";
import { useState } from "react";
import { Button } from "@material-ui/core";
import Link from "next/link";
import ImageContainer from "../../components/image_container";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [owner, setOwner] = useState(false);
  const [admin, setAdmin] = useState(false);
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setOwner(data.userID == user.uid);
      fire
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setAdmin(doc.data().permissions.admin);
          }
        });
    }
  });

  const handleDelete = async () => {
    const ref = fire.firestore().collection("posts").doc(docid);
    const storageRef = fire
      .storage()
      .ref()
      .child("/images/" + data.imageRef);
    await storageRef.delete().catch((err) => console.log(err.code));
    await ref
      .delete()
      .then(router.push("/"))
      .catch((error) => console.log(error.code));
  };

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
      <div>
      </div>
      <div className="container">
        <AppBar />
        <div className="top-div">
          <h1>{data.title}</h1>
          <EditButton isOwner={owner} docid={docid} />
          <DeleteButton isAdmin={admin} handleDelete={handleDelete} />
        </div>
        <ImageContainer
          imageSrcs={data.imageRefs.map((imageRef) => imageRef.url)}
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
            href={`mailto:${userData.email}?subject=[Sellpoint]%20${data.title}`}
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

function DeleteButton(props) {
  const isAdmin = props.isAdmin;

  if (isAdmin) {
    return (
      <Button
        variant="outlined"
        style={{ color: "#FF1744", borderColor: "#FF1744" }}
        onClick={() => props.handleDelete()}
      >
        Delete
      </Button>
    );
  } else {
    return <></>;
  }
}

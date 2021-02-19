import fire from "../../config/fire-config";
import Image from "next/image";
import AppBar from "../../components/header";

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
      data: documentData,
      userData: userData,
    },
  };
}

export default function Annonse({ data, userData }) {
  console.log(data);
  console.log(userData);
  return (
    <div>
      <style jsx>{`
        .container {
          width: 80%;
          max-width: 700px;
          margin: auto;
        }
        h1 {
          margin-top: 5rem;
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
      `}</style>
      <div className="container">
        <AppBar />
        <h1>{data.title}</h1>
        <Image src={data.imageUrl} width={600} height={400} />
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

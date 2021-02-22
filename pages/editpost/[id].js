import fire from "../../config/fire-config";
import Image from "next/image";
import AppBar from "../../components/header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

  return {
    props: {
      data: documentData,
      id: params.id,
    },
  };
}

export default function Annonse({ data, id }) {
  const [title, setTitle] = useState(data.title);
  const [location, setLocation] = useState(data.place);
  const [price, setPrice] = useState(data.price);
  const [description, setDescription] = useState(data.description);
  const [miniDesc, setMiniDesc] = useState(data.miniDescription);

  const router = useRouter();

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
        if (!user || user.uid != data.userID) {
          router.push("/")
        }
    })
  })


  const handleUpdate = async () => {
      const ref = fire.firestore().collection('posts').doc(id);
      await ref.update(
          {
              title: title,
              place: location,
              price: price,
              description: description,
              miniDescription: miniDesc
          }
      )
      .then(router.push(`/annonse/${id}`))
      .catch((error) => console.log(error.code))
  };

  const handleDelete = async () => {
    const ref = fire.firestore().collection('posts').doc(id);
    await ref.delete().catch((error) => console.log(error.code))
  }
  return (
    <div>
      <style jsx>{`
        .container {
          width: 80%;
          max-width: 700px;
          margin: auto;
          margin-top: 5rem;
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
        .buttons {
            display: flex;
            flex-direction: column;
        }
        .textfield {
            margin: 20px 0;
        }
      `}</style>
      <AppBar />
      <div className="container">
        <Image src={data.imageUrl} width={600} height={400} />
        <form onSubmit={handleUpdate}>
          <div className="textfield">
            <TextField
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              id="outlined-title"
              label="Tittel"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="textfield">
            <TextField
              value={location}
              onChange={({ target }) => setLocation(target.value)}
              id="outlined-location"
              label="Lokasjon"
              variant="outlined"
            />
          </div>
          <div className="textfield">
            <TextField
              value={price}
              onChange={({ target }) => setPrice(target.value)}
              id="outlined-price"
              label="Pris"
              variant="outlined"
            />
          </div>
          <div className="textfield">
            <TextField
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              id="outlined-description"
              label="Beskrivelse"
              variant="outlined"
              multiline
              fullWidth
            />
          </div>
          <div className="textfield">
            <TextField
              value={miniDesc}
              onChange={({ target }) => setMiniDesc(target.value)}
              id="outlined-ingress"
              label="Ingress"
              variant="outlined"
              multiline
              fullWidth
            />
          </div>
          <div className="buttons">
            <Button
              style={{ width: "200px" }}
              color="secondary"
              variant="contained"
              //type="submit"
              onClick={handleUpdate}
            >
              Oppdater annonse
            </Button>

            <Button
              style={{ width: "200px", marginTop: "10px", color: "#FF1744", borderColor: '#FF1744' }}
              variant="outlined"
              onClick={handleDelete}
            >
              Slett annonse
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

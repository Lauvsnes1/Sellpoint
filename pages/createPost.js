import { useState, useEffect } from "react";
import Image from "next/image";
import fire from "../config/fire-config";
import AppBar from "../components/header";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import ImageUpload from "../components/image_upload";
import ImageContainer from "../components/image_container";

const CreatePost = () => {
  //Place er bare en streng nå, må sette opp google
  //maps ting etterhvert
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [miniDescription, setMiniDescription] = useState("");
  const [description, setDescription] = useState("");

  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [images, setImages] = useState([]);

  useEffect(() => {
    //Sets a firebase listener on initial render
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        //Redirects to login if user is not logged in
        router.push("/users/login");
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      title.length === 0 ||
      location.length === 0 ||
      miniDescription === 0 ||
      description === 0 ||
      images.length === 0
    ) {
      setNotification("Du må fylle inn alle felt!");
      setTimeout(() => {
        setNotification("");
      }, 2000);
      return;
    }

    setLoading(true);

    const imagesRef = await ImageUpload.firebaseUpload(
      images.map((image) => image.file)
    ).then((res) => {
      return res;
    });

    // Create post
    var document = await fire.firestore().collection("posts").add({
      title: title,
      place: location,
      price: price,
      miniDescription: miniDescription,
      description: description,
      userID: user.uid,
      imagesRef: imagesRef,
    });

    router.push("/annonse/" + document.id);
  };

  if (!user || loading) {
    return <h2>Loading...</h2>;
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
        {notification}
        <ImageContainer
          imageSrcs={images.map((image) => image.src)}
          deleteImage={(index) =>
            setImages((oldImages) => oldImages.filter((src, i) => i != index))
          }
        />
        <ImageUpload
          setImages={(images) => setImages(images)}
          text="Last opp bilde av varen"
        />
        <form onSubmit={handleSubmit}>
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
            {/*Man skal kun skrive tall inn for pris, nå kan man skrive hva som helst*/}
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
              value={miniDescription}
              onChange={({ target }) => setMiniDescription(target.value)}
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
              type="submit"
            >
              Opprett annonse
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

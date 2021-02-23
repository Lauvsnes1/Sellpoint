import { useState, useEffect } from "react";
import Image from "next/image";
import fire from "../config/fire-config";
import AppBar from "../components/header";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import uniqid from "uniqid";

const CreatePost = () => {
  //Place er bare en streng nå, må sette opp google
  //maps ting etterhvert
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [miniDescription, setMiniDescription] = useState("");
  const [description, setDescription] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState("");

  const router = useRouter();

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

  const handleImageUpload = (e) => {
    const [file] = e.target.files;

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      title.length === 0 ||
      location.length === 0 ||
      miniDescription === 0 ||
      description === 0 ||
      imageSrc === null
    ) {
      setNotification("Du må fylle inn alle felt!");
      setTimeout(() => {
        setNotification("");
      }, 2000);
      return;
    }

    // Add images to storage
    const ref = uniqid();
    const downloadUrl = await fire
      .storage()
      .ref("/images/" + ref)
      .put(imageFile)
      .then((res) => {
        return res.ref.getDownloadURL();
      });

    // Create post
    var document = await fire.firestore().collection("posts").add({
      title: title,
      place: location,
      price: price,
      miniDescription: miniDescription,
      description: description,
      userID: user.uid,
      imageUrl: downloadUrl,
      imageRef: ref,
    });
    router.push("/annonse/" + document.id);
    //Det tar litt tid før den fullfører så burde ha noe som viser at den laster ellerno
  };

  //When retrieving user state from firebase
  if (!user) {
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
        {imageSrc && (
          <div
            style={{ position: "relative", width: "700px", height: "500px" }}
          >
            <Image src={imageSrc} layout="fill" objectFit="contain" />
          </div>
        )}
        <div className="buttons">
          <Button
            style={{ width: "200px" }}
            color="secondary"
            variant="contained"
            component="label"
          >
            Last opp bilde av varen
            <input
              type="file"
              accept="image/*"
              multiple={false}
              onChange={handleImageUpload}
              hidden
            />
          </Button>
        </div>
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
              //type="submit"
              onClick={handleSubmit}
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

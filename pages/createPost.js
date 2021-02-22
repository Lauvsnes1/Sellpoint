import { useState, useEffect } from "react";
import fire from "../config/fire-config";
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
    var document = fire.firestore().collection("posts").add({
      title: title,
      place: location,
      price: price,
      miniDescription: miniDescription,
      description: description,
      userID: user.uid,
      imageUrl: downloadUrl,
      imageRef: ref,
    });

    router.push("/");
    //Det tar litt tid før den fullfører så burde ha noe som viser at den laster ellerno
  };

  //When retrieving user state from firebase
  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Opprett en ny annonse:</h1>
      {notification}
      <form onSubmit={handleSubmit}>
        Overskrift på annonsen:{" "}
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        Plassering:{" "}
        <input
          type="text"
          value={location}
          onChange={({ target }) => setLocation(target.value)}
        />
        <br />
        Pris:{" "}
        <input
          type="number"
          min="0"
          value={price}
          onChange={({ target }) => setPrice(target.value)}
        />
        <br />
        Ingress:{" "}
        <textarea
          value={miniDescription}
          onChange={({ target }) => setMiniDescription(target.value)}
        />
        <br />
        Beskrivelse av varen:{" "}
        <textarea
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <br />
        Last opp bilde av varen:{" "}
        <input
          type="file"
          accept="image/*"
          multiple={false}
          onChange={handleImageUpload}
        />
        <br />
        {/*Burde kanskje lage en egen ImageUpload component eller ImageDisplay component
        siden det kan være flere steder der man vil laste opp bilder?*/}
        {/*Skal bildet som lastes opp vises på denne siden?*/}
        <img src={imageSrc} />
        <br />
        <button type="submit">Opprett</button>
      </form>
    </div>
  );
};

export default CreatePost;

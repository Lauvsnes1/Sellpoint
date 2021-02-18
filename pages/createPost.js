import { useState, useRef, createRef } from "react";
import fire from "../config/fire-config";
import { useRouter } from "next/router";
import uniqid from "uniqid";

const CreatePost = () => {
  //Place er bare en streng nå, må sette opp google
  //maps ting etterhvert
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imageSrcs, setImageSrcs] = useState([]);
  const [notification, setNotification] = useState("");

  const router = useRouter();

  //TODO: Validere input. Post må ha tittel blant annet.
  //TODO: Legge til miniDescription

  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const newSrcs = [];

    newFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        newSrcs.push(e.target.result);

        //Update state when all files have been read
        if (newSrcs.length === newFiles.length) {
          setImageSrcs((oldSrcs) => [...oldSrcs, ...newSrcs]);
        }
      };
      reader.readAsDataURL(file);
    });
    setImageFiles((oldFiles) => [...oldFiles, ...newFiles]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = fire.auth().currentUser;

    if (!user) {
      setNotification("Du må logge inn først!");
      //return;
    }

    // Add image to storage
    var ref = uniqid();
    fire
      .storage()
      .ref("/images/" + ref)
      .put(imageAsFile);

    // Create post
    var document = fire.firestore().collection("posts").add({
      title: title,
      place: place,
      price: price,
      description: description,
      //userID: user.uid,
      imageRef: ref,
    });

    router.push("/");
  };

  return (
    <div>
      <h1>Lag Annonse</h1>
      {notification}
      <form onSubmit={handleSubmit}>
        Tittel:{" "}
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        Bilde:{" "}
        <input
          type="file"
          accept="image/*"
          multiple={true}
          onChange={handleImageUpload}
        />
        {/*Burde kanskje lage en egen ImageUpload component eller ImageDisplay component
        siden det kan være flere steder der man vil laste opp bilder?*/}
        {/* Vet ikke om det er greit å bare bruke indeks som key?*/}
        {imageSrcs.map((imageSrc, index) => (
          <img key={index} src={imageSrc} />
        ))}
        Plassering:{" "}
        <input
          type="text"
          value={place}
          onChange={({ target }) => setPlace(target.value)}
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
        Beskrivelse:{" "}
        <textarea
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <br />
        <button type="submit">Opprett</button>
      </form>
    </div>
  );
};

export default CreatePost;

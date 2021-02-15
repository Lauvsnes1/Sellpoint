import { useState, useRef } from "react";
import fire from "../config/fire-config";
import { useRouter } from "next/router";
import uniqid from "uniqid";

const CreatePost = () => {
  //Forstår ikke bilde greiene helt :/ Hentet fra
  //https://dev.to/asimdahall/client-side-image-upload-in-react-5ffc
  //Finnes pakker som react-image-uploader så burde kanskje prøve det istedet

  const image = useRef(null);
  const [imageAsFile, setImageAsFile] = useState("");
  //Place er bare en streng nå, må sette opp google
  //maps ting etterhvert

  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const [notification, setNotification] = useState("");

  const router = useRouter();

  //TODO: Laste opp mer enn et bilde
  //TODO: Validere input. Post må ha tittel.

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      setImageAsFile(file);
      const reader = new FileReader();
      const { current } = image;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
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
          multiple={false}
          onChange={handleImageUpload}
        />
        {/*Burde kanskje lage en egen ImageUpload component eller ImageDisplay component
        siden det kan være flere steder der man vil laste opp bilder?*/}
        <img ref={image} />
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

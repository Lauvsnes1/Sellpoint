import { useState, useRef } from "react";

const CreatePost = () => {
  //Forstår ikke bilde greiene helt :/ Hentet fra
  //https://dev.to/asimdahall/client-side-image-upload-in-react-5ffc
  //Finnes pakker som react-image-uploader så burde kanskje prøve det istedet

  const image = useRef(null);
  //Place er bare en streng nå, må sette opp google
  //maps ting etterhvert
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const [notification, setNotification] = useState("");

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = image;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  //Legge til post i database og gå til hovedside?
  //Bli på siden og gi feilmelding hvis annonsen ikke er fylt ut
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Create Post</h1>
      {notification}
      <form onSubmit={handleSubmit}>
        Image:{" "}
        <input
          type="file"
          accept="image/*"
          multiple={false}
          onChange={handleImageUpload}
        />
        {/*Burde kanskje lage en egen ImageUpload component eller ImageDisplay component
        siden det kan være flere steder der man vil laste opp bilder?*/}
        <img ref={image} />
        Place:{" "}
        <input
          type="text"
          value={place}
          onChange={({ target }) => setPlace(target.value)}
        />
        <br />
        Price:{" "}
        <input
          type="number"
          min="0"
          value={price}
          onChange={({ target }) => setPrice(target.value)}
        />
        <br />
        Description:{" "}
        <textarea
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;

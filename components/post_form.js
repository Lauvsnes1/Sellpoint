import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ImageUpload from "../components/image_upload";
import ImageContainer from "../components/image_container";
import DropDownPlace from "./placeDropDown";
import DropDownCategory from "./categoryDropDown";

const PostForm = ({
  initialCategory,
  initialTitle,
  initialLocation,
  initialPrice,
  initialMiniDescription,
  initialDescription,
  initialImages,
  handleSubmit,
  submitText,
  onImageDeleted,
  deleteButton,
}) => {
  //Place er bare en streng nå, må sette opp google
  //maps ting etterhvert
  const [title, setTitle] = useState(initialTitle);
  const [location, setLocation] = useState(initialLocation);
  const [category, setCategory] = useState(initialCategory);
  const [price, setPrice] = useState(initialPrice);
  const [miniDescription, setMiniDescription] = useState(
    initialMiniDescription
  );
  const [description, setDescription] = useState(initialDescription);

  const [notification, setNotification] = useState("");

  const [images, setImages] = useState(initialImages);

  const validate = () => {
    if (images.length === 0) {
      setNotification("Du må ha minst ett bilde!");
      setTimeout(() => {
        setNotification("");
      }, 5000);
      return false;
    }
    return true;
  };

  const deleteImage = (index) => {
    const image = images[index];
    setImages((oldImages) => oldImages.filter((src, i) => i != index));
    if (onImageDeleted) {
      onImageDeleted(image);
    }
  };

  return (
    <div className="container">
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
      {notification}
      <ImageContainer
        imageSrcs={images.map((image) => (image.src ? image.src : image.url))}
        deleteImage={deleteImage}
      />
      <ImageUpload
        setImages={(images) => setImages(images)}
        text="Last opp bilde av varen"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validate()) {
            handleSubmit(
              images,
              title,
              location,
              price,
              miniDescription,
              description,
              category
            );
          }
        }}
      >
        <div className="textfield">
          <TextField
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="outlined-title"
            label="Tittel"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="textfield">
          <DropDownPlace city={location} valueChanged={setLocation}/>
          <DropDownCategory category={category} valueChanged={setCategory}/>
        </div>
        <div className="textfield">
          <TextField
            required
            value={price}
            onChange={({ target }) => setPrice(target.value)}
            id="outlined-price"
            label="Pris"
            type="number"
            variant="outlined"
          />
        </div>
        <div className="textfield">
          <TextField
            required
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
            required
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
            {submitText}
          </Button>
          {deleteButton}
        </div>
      </form>
    </div>
  );
};

export default PostForm;

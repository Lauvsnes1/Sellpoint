import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ImageUpload from "../components/image_upload";
import ImageContainer from "../components/image_container";

const PostForm = ({
  initial_title,
  initial_location,
  initial_price,
  initial_miniDescription,
  initial_description,
  initial_images,
  handleSubmit,
  submit_text,
  onImageDeleted,
  delete_button,
}) => {
  //Place er bare en streng nå, må sette opp google
  //maps ting etterhvert
  const [title, setTitle] = useState(initial_title);
  const [location, setLocation] = useState(initial_location);
  const [price, setPrice] = useState(initial_price);
  const [miniDescription, setMiniDescription] = useState(
    initial_miniDescription
  );
  const [description, setDescription] = useState(initial_description);

  const [notification, setNotification] = useState("");

  var [images, setImages] = useState(initial_images);

  const validate = () => {
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
              description
            );
          }
        }}
      >
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
            {submit_text}
          </Button>
          {delete_button}
        </div>
      </form>
    </div>
  );
};

export default PostForm;

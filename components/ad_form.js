import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SingleImageUpload from "../components/single_image_upload";
import Image from "next/image";

const AdForm = ({ handleSubmit }) => {
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [notification, setNotification] = useState("");

  const validate = () => {
    if (!imageSrc) {
      setNotification("Du må laste opp et bilde!");
      setTimeout(() => {
        setNotification("");
      }, 5000);
      return false;
    }
    return true;
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
      {<div>(På nettsiden vil reklamen vises på formatet: 200x575)</div>}
      {imageSrc && <Image src={imageSrc} width={200} height={575} />}
      <SingleImageUpload
        setImageFile={(imageFile) => setImageFile(imageFile)}
        setImageSrc={(imageSrc) => setImageSrc(imageSrc)}
        text="Last opp reklamebilde"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validate()) {
            handleSubmit(link, imageFile);
          }
        }}
      >
        <div className="textfield">
          <TextField
            required
            value={link}
            onChange={({ target }) => setLink(target.value)}
            id="outlined-link"
            label="link"
            variant="outlined"
          />
        </div>

        <div className="buttons">
          <Button
            style={{ width: "200px" }}
            color="secondary"
            variant="contained"
            type="submit"
          >
            Opprett reklame
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AdForm;

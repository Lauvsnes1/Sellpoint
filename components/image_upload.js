import Button from "@material-ui/core/Button";
import uniqid from "uniqid";
import fire from "../config/fire-config";

const ImageUpload = ({ setImages, text }) => {
  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files).map((file) => {
      return { file: file, src: null };
    });

    let counter = 0;
    newImages.forEach((image, index) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        newImages[index].src = e.target.result;
        counter++;

        //Update state when all files have been read
        if (counter === newImages.length) {
          setImages((oldImages) => [...oldImages, ...newImages]);
        }
      };
      reader.readAsDataURL(image.file);
    });
  };

  return (
    <div className="buttons">
      <Button
        style={{ width: "200px" }}
        color="secondary"
        variant="contained"
        component="label"
      >
        {text}
        <input
          type="file"
          accept="image/*"
          multiple={true}
          onChange={handleImageUpload}
          hidden
        />
      </Button>
    </div>
  );
};

ImageUpload.firebaseUpload = async function (imageFiles) {
  const imagesRef = [];

  for (const file of imageFiles) {
    const ref = uniqid();
    const url = await fire
      .storage()
      .ref("/images/" + ref)
      .put(file)
      .then((res) => {
        return res.ref.getDownloadURL();
      });
    imagesRef.push({
      ref: ref,
      url: url,
    });
  }
  return imagesRef;
};

export default ImageUpload;

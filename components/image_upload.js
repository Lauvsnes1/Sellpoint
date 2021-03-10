import Button from "@material-ui/core/Button";
import uniqid from "uniqid";
import fire from "../config/fire-config";

const ImageUpload = ({ setImageFiles, setImageSrcs, text }) => {
  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const newSrcs = [];

    newFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        newSrcs.push(e.target.result);

        //Update state when all files have been read
        //BUG: tror det kan komme i feil rekkefølge nå
        if (newSrcs.length === newFiles.length) {
          setImageSrcs((oldSrcs) => [...oldSrcs, ...newSrcs]);
        }
      };
      reader.readAsDataURL(file);
    });

    setImageFiles((oldFiles) => [...oldFiles, ...newFiles]);

    /*
    const [file] = e.target.files;

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    } */
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
  let imagesInfo = [];

  imageFiles.forEach(async (imageFile) => {
    const imageRef = uniqid();
    const imageUrl = await fire
      .storage()
      .ref("/images/" + imageRef)
      .put(imageFile)
      .then((res) => {
        return res.ref.getDownloadURL();
      });

    imagesInfo.push([imageRef, imageUrl]);
  });

  return imagesInfo;
};

export default ImageUpload;

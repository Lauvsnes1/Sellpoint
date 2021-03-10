import { useState } from "react";
import Button from "@material-ui/core/Button";


const ImageUpload = ({imageFile, setImageFile, imageSrc, setImageSrc, text}) => {
    
    console.log(imageFile)
    console.log(setImageFile)
    console.log(imageSrc)
    console.log(setImageSrc)
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
    }


      return (<div className="buttons">
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
        multiple={false}
        onChange={handleImageUpload}
        hidden
      />
    </Button>
    </div>)
  };
  
  ImageUpload.staticFirebaseUpload = function (imageFiles, imageSrcs) {
    console.log("Static method!!!")
  }

  export default ImageUpload;
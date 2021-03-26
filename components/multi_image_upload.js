import Button from "@material-ui/core/Button";

const MultiImageUpload = ({ setImages, text }) => {
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

export default MultiImageUpload;

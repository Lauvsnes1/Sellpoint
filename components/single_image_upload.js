import Button from "@material-ui/core/Button";

const SingleImageUpload = ({ setImageFile, setImageSrc, text }) => {
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
          multiple={false}
          onChange={handleImageUpload}
          hidden
        />
      </Button>
    </div>
  );
};
export default SingleImageUpload;

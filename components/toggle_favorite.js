import { Button } from "@material-ui/core";

const ToggleFavorite = ({ isFavorite, setIsFavorite }) => {
  const Toggle = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  return (
    <Button onClick={Toggle}>
      {isFavorite ? "Favoritt" : "Ikke Favoritt"}
    </Button>
  );
};

export default ToggleFavorite;

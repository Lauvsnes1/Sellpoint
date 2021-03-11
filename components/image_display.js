import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import Image from "next/image";

const ImageDisplay = ({ imageSrcs }) => {
  return (
    <GridList cellHeight={160} cols={3}>
      {imageSrcs.map((src, index) => (
        <GridListTile key={index} cols={1}>
          <Image src={src} layout="fill" />
        </GridListTile>
      ))}
    </GridList>
  );
};

export default ImageDisplay;

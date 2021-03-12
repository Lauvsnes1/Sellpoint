import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import Image from "next/image";

const ImageContainer = ({ imageSrcs, deleteImage }) => {
  console.log(imageSrcs);
  return (
    <GridList cellHeight={160} cols={3}>
      {imageSrcs.map((src, index) => (
        <GridListTile key={index} cols={1}>
          <Image src={src} layout="fill" />
          {deleteImage && (
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "red",
              }}
              onClick={() => deleteImage(index)}
            >
              X
            </div>
          )}
        </GridListTile>
      ))}
    </GridList>
  );
};

export default ImageContainer;

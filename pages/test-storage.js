import fire from "../config/fire-config";
import { useState, useEffect } from "react";

const getImageURL = async () => {
    const imgURL = await fire
      .storage()
      .ref("images/kl6oqvzi")
      .getDownloadURL()
    return imgURL
};

export default function TestStorage() {
  const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        getImageURL().then((imgurl) => {
            setImageURL(imgurl)
        })
    }, [])

  console.log(imageURL);

  return <img src={imageURL}></img>;
}

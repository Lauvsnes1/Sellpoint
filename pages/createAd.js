import { useState, useEffect } from "react";
import fire from "../config/fire-config";
import AppBar from "../components/header";
import { useRouter } from "next/router";
import FirebaseStorage from "../components/firebase_storage";
import AdForm from "../components/ad_form";

const CreateAd = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.push("/users/login");
      } else {
        setUser(user);
        fire
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              if (!doc.data().permissions.advertiser) {
                router.push("/");
              } else {
                console.log("setLoading");
                setLoading(false);
              }
            }
          });
      }
    });
  }, []);

  const handleSubmit = (imageFile, imageSrc, link) => {
    console.log("submit!!");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // Create ad
  /*
var document = await fire.firestore().collection("ads").add({
    link: link,
    imageRef: imageRef
  });
*/

  return <AdForm handleSubmit={handleSubmit}></AdForm>;
};

export default CreateAd;

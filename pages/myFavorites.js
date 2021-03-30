import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostCards from "../components/cards_alt";
import fire from "../config/fire-config";
import styles from "../styles/Home.module.css";
import AppBar from "../components/header";

const MyFavorites = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (!user) router.push("/");
      else {
        fire
          .firestore()
          .collection("favorites")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.data().favoritesArray) {
              const favoritesId = doc.data().favoritesArray;
              if (favoritesId.length) {
                fire
                  .firestore()
                  .collection("posts")
                  .where(
                    fire.firestore.FieldPath.documentId(),
                    "in",
                    favoritesId
                  )
                  .onSnapshot((snapShot) => {
                    const newFavorites = snapShot.docs.map((doc) => ({
                      id: doc.id,
                      ...doc.data(),
                    }));
                    console.log(newFavorites);
                    setFavorites(newFavorites);
                  });
              }
            }
          });
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <AppBar />
      <div className={styles.rad}>
        <div className={styles.annonseContainer}>
          <PostCards posts={favorites} />
        </div>
      </div>
    </div>
  );
};

export default MyFavorites;

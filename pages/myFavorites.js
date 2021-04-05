import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostCards2 from "../components/cards_alt2";
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
            if (doc.data()) {
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
      <style jsx>{`
        h1 {
          font-family: "helvetica neue";
          font-size: 48pt;
          font-weight: normal;
          margin-top: 5rem;
          padding-top: 100px;
        }
      `}</style>

      <AppBar />
      {favorites.length ? (
        <>
          <h1> Dine favoritter </h1>
          <div className={styles.rad}>
            <div className={styles.annonseContainer}>
              <PostCards2 posts={favorites} />
            </div>
          </div>
        </>
      ) : (
        <h1> Du har ingen favoritter</h1>
      )}
    </div>
  );
};

export default MyFavorites;

import Head from "next/head";
import styles from "../styles/Home.module.css";
import AppBar from "../components/header";
import Card from "../components/cards";
import PostCards from "../components/cards_alt";
import fire from "../config/fire-config";
import { useEffect, useState } from "react";

export default function Home() {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        fire
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => setAdmin(doc.data()?.permissions.admin ? true : false));
      }
    });
  });

  return (
    <div className={styles.container}>
      <AppBar />
      <div className={styles.rad}>
        <div className={styles.annonseContainer}>
          <AdminHeadLine admin={admin} />
          <PostCards />
        </div>
      </div>
    </div>
  );
}

function AdminHeadLine(props) {
  const admin = props.admin;

  if (admin) {
    return <h1>Du er logget inn som admin</h1>;
  } else {
    return <></>;
  }
}

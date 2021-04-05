import styles from "../styles/Home.module.css";
import AppBar from "../components/header";
import AddTable from "../components/ad";
import PostCards from "../components/cards_alt";
import fire from "../config/fire-config";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Link from "next/link";

export default function Home() {
  const [admin, setAdmin] = useState(false);
  const [advertiser, setAdvertiser] = useState(false);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        fire
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            setAdmin(doc.data()?.permissions.admin ? true : false);
            setAdvertiser(doc.data()?.permissions.advertiser ? true : false);
          });
      }
    });
  });

  return (
    <>
      <div className={styles.container}>
        <AppBar />
        <AddTable />
        <div className={styles.rad}>
          <div className={styles.annonseContainer}>
            <AdminHeadLine admin={admin} />
            <AdvertiserHeadLine advertiser={advertiser} />
            <PostCards />
          </div>
        </div>
      </div>
    </>
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

function AdvertiserHeadLine(props) {
  const advertiser = props.advertiser;

  if (advertiser) {
    return (
      <div>
        <h1>Du er logget inn som reklamør</h1>
        <Link href="/createAd">
          <a>
            <Button color="secondary" variant="contained" type="submit">
              Opprett reklame
            </Button>
          </a>
        </Link>
      </div>
    );
  } else {
    return <></>;
  }
}

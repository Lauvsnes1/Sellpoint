import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { colors, ThemeProvider } from "@material-ui/core";
import {
  green,
  blue,
  yellow,
  darkGreen,
  lightGreen,
} from "@material-ui/core/colors/green";
import { red } from "@material-ui/core/colors";
import theme from "../src/theme";
import Image from "next/image";
import Link from "next/link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import fire from "../config/fire-config";
import firebase from "../config/fire-config";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  reklameContainer: {
    width: 1200,
    height: 500,
    display: "flex",
    alignSelf: "center",
    paddingLeft: 0,
    flexDirection: "column",
    position: "fixed",
    paddingBottom: 50,
  },

  reklameContainerLeft: {
    position: "fixed",
    top: 130,
    width: 200,
    left: 10,
  },
  reklameContainerRight: {
    position: "fixed",
    top: 130,
    width: 200,
    right: 10,
  },
}));

async function getAds() {
  const snapshot = await firebase.firestore().collection("ads").get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export default function AdCards() {
  const classes = useStyles();
  const [ad, setAd] = useState(null);
  let ads = [];
  let i = 1;

  useEffect(() => {
    getAds()
      .then((stuff) => {
        ads = stuff;
      })
      .then(() => {
        setAd(ads[0]);
      });
    setInterval(function () {
      setAd(ads[i]);
      i = (i + 1) % ads.length;
    }, 3000);
  }, []);

  if (ad) {
    return (
      <div className={classes.reklameContainer}>
        <div className={classes.reklameContainerLeft}>
          <a href={ad.link} rel="noopener noreferrer" target="_blank">
            <Image src={ad.imageUrl} height={575} width={200} />
          </a>
        </div>
        <div className={classes.reklameContainerRight}>
          <a href={ad.link} rel="noopener noreferrer" target="_blank">
            <Image src={ad.imageUrl} height={575} width={200} />
          </a>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

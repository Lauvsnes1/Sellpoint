import fire from "../../config/fire-config";
import AppBar from "../../components/header";
import PostCards from "../../components/cards_alt";
import ReactStars from "react-rating-stars-component";
import React from "react";
import { render } from "react-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export async function getServerSideProps({ res, params }) {
  /*Finner riktig bruker og tilhørende data*/
  const userData = await fire
    .firestore()
    .collection("users")
    .doc(params.id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        res.statusCode = 302;
        console.log("HEI");
        res.setHeader("Location", "/404");
        res.end();
      }
    });

  /*Finner brukerens annonser*/
  const userPosts = await fire
    .firestore()
    .collection("posts")
    .doc(userData.userID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return "";
      }
    });

  return {
    props: {
      userid: params.id,
      userData: userData,
      userPosts: userPosts,
    },
  };
}

const ratingChanged = (newRating) => {
  console.log(newRating);
};

export default function UserProfile({ userid, userData, userPosts }) {
  return (
    <div>
      <style jsx>{`
        .container {
          width: 80%;
          max-width: 1000px;
          margin: auto;
          flex-direction: row;
          justify-content: "flex-start";
        }
        h1 {
          font-family: "helvetica neue";
          font-size: 48pt;
          font-weight: normal;
          margin-top: 5rem;
        }
        .brukerInfo {
          margin-left: 5rem;
          position: fixed;
        }
        .annonser {
          display: flex;
          margin-top: 20rem;
          position: fixed;
          width: 150;
          flex-direction: column;
        }
        .annonseKort {
          display: flex;
          flex-direction: row;
        }
        .giveRating {
          position: fixed;
          margin-left: 50rem;
          margin-top: 5rem;
          margin-right: 5rem;
          align-self: "flex-end";
        }
        .tidligereTilbakemeldinger {
          position: fixed;
          margin-left: 50rem;
          margin-top: 20rem;
          margin-right: 5rem;
          align-self: "flex-end";
        }
        span {
          color: #90cc00;
          font-weight: bold;
        }
        h3,
        h4 {
          color: #90cc00;
          font-weight: bold;
        }
      `}</style>
      <div className="container">
        <div className="brukerInfo">
          <AppBar />
          <h1>Brukerprofil</h1>
          <p>
            <span>Navn: </span> {userData.firstName} {userData.lastName}
          </p>
          <p>
            <span>Mail: </span>
            <a
              href={
                `mailto:${userData.email}?subject=[Sellpoint]%20]` /*sjekk at denne funker*/
              }
              rel="noopener noreferrer"
              target="_blank"
            >
              {userData.email}
            </a>
          </p>
        </div>
        <div className="giveRating">
          <h4>Gi rating til bruker:</h4>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={32}
            activeColor="#ffd700"
            padding-bottom={10}
          />
          <TextField
            id="outlined-required"
            label="Tilbakemelding"
            variant="outlined"
          />

          <Button
            style={{ width: "100%" }}
            color="secondary"
            variant="contained"
            type="submit"
          >
            Send inn rating
          </Button>
        </div>
        <div className="annonser">
          <h4>{userData.firstName + " " + userData.lastName}'s annonser:</h4>
          <div className="annonseKort">
            <PostCards />
          </div>
        </div>
        <div className="tidligereTilbakemeldinger">
          <h4>Tidligere tilbakemeldinger:</h4>
        </div>
      </div>
    </div>
  );
}

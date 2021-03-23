import fire from "../../config/fire-config";
import AppBar from "../../components/header";
import PostCards from "../../components/cards_alt";
import ReactStars from "react-rating-stars-component";
import React from "react";
import { render } from "react-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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

  /*Finner ratings av brukeren*/
  const userRatings = await fire
    .firestore()
    .collection("reviews")
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
      userRatings: userRatings,
    },
  };
}

export default function UserProfile({ userid, userData, userPosts }) {
  const [ratingScore, setRatingScore] = useState(0);
  const [review, setReview] = useState("");
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    //Sets a firebase listener on initial render
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        //Redirects to login if user is not logged in
        router.push("/users/login");
      }
    });
  }, []);

  const handleOnClick = async () => {
    // Create review
    var document = await fire.firestore().collection("reviews").add({
      rating: ratingScore,
      reviewText: review,
      user: user.uid,
      userReviewed: userid,
    });
    await fire
      .firestore()
      .collection("users")
      .doc(userid)
      .update({
        numberOfRatings: userData.numberOfRatings + 1,
      });
    await fire
      .firestore()
      .collection("users")
      .doc(userid)
      .update({ totalRating: userData.totalRating + ratingScore });

    router.reload();
  };

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
          flex-direction: column;
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
            size={32}
            activeColor="#ffd700"
            padding-bottom={10}
            value={ratingScore}
            onChange={(value) => setRatingScore(parseFloat(value))}
          />
          <TextField
            id="outlined-required"
            label="Tilbakemelding"
            variant="outlined"
            value={review}
            onChange={({ target }) => setReview(target.value)}
          />

          <Button
            style={{ width: "100%" }}
            color="secondary"
            variant="contained"
            type="submit"
            onClick={handleOnClick}
          >
            Send inn rating
          </Button>
        </div>
        <div className="tidligereTilbakemeldinger">
          {userData.numberOfRatings != 0 ? (
            <h4>
              Gjennomsnittlig rating:
              {userData.totalRating / userData.numberOfRatings}
            </h4>
          ) : (
            <h4>
              Gjennomsnittlig rating:
              {0}
            </h4>
          )}
        </div>
      </div>
    </div>
  );
}

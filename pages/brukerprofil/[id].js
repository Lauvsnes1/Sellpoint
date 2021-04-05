import fire from "../../config/fire-config";
import AppBar from "../../components/header";
import PostCards from "../../components/cards_alt";
import RatingCards from "../../components/rating";
import ReactStars from "react-rating-stars-component";
import React from "react";
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

  return {
    props: {
      userid: params.id,
      userData: userData,
    },
  };
}

export default function UserProfile({ userid, userData }) {
  const [ratingScore, setRatingScore] = useState(0);
  const [review, setReview] = useState("");
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fire
      .firestore()
      .collection("posts")
      .where("userID", "==", userid)
      .onSnapshot((snapShot) => {
        const posts = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(posts);
      });
  });

  useEffect(() => {
    fire
      .firestore()
      .collection("reviews")
      .where("userReviewed", "==", userid)
      .onSnapshot((snapShot) => {
        const reviews = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRatings(reviews);
      });
  });

  const handleOnClick = async () => {
    setLoading(true);
    const fb = fire.firestore();

    // Create review
    await fb.collection("reviews").add({
      rating: ratingScore,
      reviewText: review,
      user: user.uid,
      userReviewed: userid,
    });

    await fb
      .collection("users")
      .doc(userid)
      .update({
        numberOfRatings: fire.firestore.FieldValue.increment(1),
        totalRating: fire.firestore.FieldValue.increment(ratingScore),
      });

    router.reload();
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div>
        <style jsx>{`
          .container {
            display: flex;
            min-height: 100vh;
            width: 80%;
            max-width: 1000px;
            margin: auto;
            flex-direction: column;
            padding-top: 100px;
          }
          .rad {
            display: flex;
            flex-direction: row;
            margin: auto;
          }
          .element-left {
            display: flex;
            flex-direction: column;
            align-self: flex-start;
            flex: 1;
          }
          .element-right {
            display: flex;
            flex-direction: column;
            align-self: flex-end;
          }
          h1 {
            font-family: "helvetica neue";
            font-size: 48pt;
            font-weight: normal;
            margin-top: 5rem;
          }
          h3,
          h4,
          span {
            color: #90cc00;
            font-weight: bold;
          }
        `}</style>
        <AppBar />
        <div className="container">
          <div className="rad">
            <div className="element-left">
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="element-right">
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
                onClick={() => handleOnClick()}
              >
                Send inn rating
              </Button>
            </div>
          </div>
          <div className="rad">
            <div className="element-left">
              <h3> {userData.firstName}'s annonser</h3>
              <PostCards posts={posts} />
            </div>
            <div className="element-right">
              {userData.numberOfRatings != 0 ? (
                <h4>
                  Gjennomsnittlig rating:
                  {" " +
                    (userData.totalRating / userData.numberOfRatings).toFixed(
                      2
                    )}
                </h4>
              ) : (
                <h4>Ingen ratings enda.</h4>
              )}
              <h4>
                Tidligere ratings av {userData.firstName} ({userid}):
              </h4>
              <RatingCards ratings={ratings} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

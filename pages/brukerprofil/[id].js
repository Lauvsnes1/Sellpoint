import fire from "../../config/fire-config";
import AppBar from "../../components/header";
import PostCards from "../../components/cards_alt";

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

export default function UserProfile({ userid, userData, userPosts }) {
  return (
    <div>
      <style jsx>{`
        .container {
          width: 80%;
          max-width: 700px;
          margin: auto;
        }
        h1 {
          font-family: "helvetica neue";
          font-size: 48pt;
          font-weight: normal;
          margin-top: 5rem;
        }
        .brukerInfo {
          margin-left: 5rem;
        }
        .annonser {
          margin-left: 5rem;
          position: fixed;
          width: 150;
        }
        span {
          color: #90cc00;
          font-weight: bold;
        }
        h3 {
          color: #90cc00;
          font-weight: bold;
        }
      `}</style>

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
      <div className="annonser">
        <h3>{userData.firstName + " " + userData.lastName}'s annonser:</h3>
        <PostCards.userPosts />
      </div>
    </div>
  );
}

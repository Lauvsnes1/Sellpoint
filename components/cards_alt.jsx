import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import theme from "../src/theme";
import firebase from "../config/fire-config";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/Home.module.css";
import { ThemeProvider } from "@material-ui/core";

import Link from "next/link";

const useStyles = makeStyles(() => ({
  subheader: {
    color: "#90CC00", //får det ikke til med theme.palette???
  },

  root: {
    minWidth: 330,
    maxWidth: 330,
    height: 375,
    marginTop: 30,
    alignItems: "flex-start",
  },
  media: {
    height: 100,
    paddingTop: "56.25%", // 16:9
  },

  button: {
    paddingLeft: "100px",
    outlineOffset: "100px",
  },

  avatar: {
    //legg inn profilbilde her senere
    backgroundColor: "secondary",
  },
}));

function usePosts() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .onSnapshot((snapShot) => {
        const newPosts = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPost(newPosts);
      });
  }, []);
  return posts;
}

const PostCards = () => {
  const posts = usePosts();

  const classes = useStyles();
  const [postId, setPostId] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.annonseContainer}>
        {posts.map((post) => (
          <Card className={classes.root}>
            <div>
              <CardHeader
                classes={{
                  subheader: classes.subheader,
                }}
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {/*firebase.firestore().collection('users').doc(post.userID).get().firstName*/}
                  </Avatar>
                }
                title={post.title}
                subheader={post.place}
              />
              <CardMedia
                className={classes.media}
                image={post.imageRefs[0].url}
              />

              {/*<Image src="firebase.storage().ref('/images/' + post.imageRef).getDownloadURL()" //brukt til test
              height='10px'
                width='10px'/>*/}

              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{
                    height: "25px",
                    lineHeight: "25px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.miniDescription}
                </Typography>
                <Typography style={{ textAlign: "right" }}>
                  {post.price} kr
                </Typography>
              </CardContent>
              <CardActions style={{ height: "20px" }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  marginRight="30px"
                  display="inline-block"
                >
                  <Link href={"/annonse/" + post.id} passHref>
                    <a>Annonse</a>
                  </Link>
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  marginLeft="30px"
                  display="inline-block"
                >
                  Selger
                </Button>
              </CardActions>
            </div>
          </Card>
        ))}
      </div>
    </ThemeProvider>

    //endelig formatering blir gjort når vi fikser koblingen til firebase
  );
};

export default PostCards;

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
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/Home.module.css";
import { ThemeProvider } from "@material-ui/core";
import Link from "next/link";
import TextField from "@material-ui/core/TextField";
import DropDownPlace from "./placeDropDown";
import DropDownCategory from "./categoryDropDown"

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
    paddingleft: "100px",
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
      //.where('price', '>', priceContextMin)
      //.where('price', '<', priceContextMax)
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
function SortByPrice(props) {
  const classes = useStyles();
  const minValue = props.minValue;
  const maxValue = props.maxValue;
  const searchCounter = props.searchCounter;
  const searched = props.searched;
  const allPosts = usePosts();
  const place = props.place;
  const category = props.category;

  const [posts, setPost] = useState([]);
  useEffect(() => {
    let query = firebase
      .firestore()
      .collection("posts");
    if (maxValue > 0) {
      query = query.where("price", "<=", maxValue)
        .where("price", ">=", minValue).orderBy("price", "asc");
    }
    if (place != "") { 
      query = query.where("place", "==", place); 
    }
    if (category != "") {
      query = query.where("category", "==", category)
    }


    query.onSnapshot((snapShot) => {
      const newPosts = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPost(newPosts);
    });
  }, [searchCounter]);

  if (searched) {
    //dersom 'søk' knappen er trykket
    return (
      <div className={styles.annonseContainer}>
        {posts.map((post) => (
          <Card className={classes.root} key={post.id}>
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
                image={post.imageRefs[0].url}
                className={classes.media}
              />
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
                  marginright="30px"
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
                  marginleft="30px"
                  display="inline-block"
                >
                  Selger
                </Button>
              </CardActions>
            </div>
          </Card>
        ))}
      </div>
    );
  } else {
    //dersom søk-knappen ikke er trykka
    return (
      <div className={styles.annonseContainer}>
        {allPosts.map((post) => (
          <Card className={classes.root} key={post.id}>
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
                //component='img'
                image={post.imageRefs[0].url}
              />

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
                  marginright="30px"
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
                  marginleft="30px"
                  display="inline-block"
                >
                  Selger
                </Button>
              </CardActions>
            </div>
          </Card>
        ))}
      </div>
    );
  }
}

const PostCards = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [searchCounter, setSearchCounter] = useState(0);
  const classes = useStyles();
  const [postId, setPostId] = useState(0);
  const [searched, setSearched] = useState(false);
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  function handlePriceRange() {
    setSearchCounter(searchCounter + 1);
    setSearched(true); //Varsler for å filtrere kortene
    setMaxValue(parseInt(maxValue, 10)); //OBSOBS parseINT måtte til for å få riktig format på input
    setMinValue(parseInt(minValue, 10));
  }

  return (
    <ThemeProvider theme={theme}>
      {
        //<PriceRangeSlider getValues={handleSlider}/>
      }
      <div style={{ paddingTop: 100 }}>
        <Typography id="range-slider" gutterBottom>
          Prisområde:
        </Typography>
        <div className={classes.textInputContainer}>
          <TextField
            value={minValue}
            id="outlined-basic"
            label="Min pris"
            variant="outlined"
            key={"1"}
            type="number"
            onChange={({ target }) => setMinValue(target.value)}
          />
          <TextField
            value={maxValue}
            id="outlined-basic"
            label="Max pris"
            variant="outlined"
            key={"2"}
            type="number"
            onChange={({ target }) => setMaxValue(target.value)}
          />
          <Button
            variant="contained"
            onClick={handlePriceRange}
            color="secondary"
          >
            Søk
          </Button>
        </div>
        <div style={{flexDirection: 'row'}}>
          <DropDownPlace city={city} valueChanged={setCity} />
          <DropDownCategory category ={category} valueChanged={setCategory}/>
        </div>
      </div>
      <SortByPrice
        searched={searched}
        maxValue={maxValue}
        minValue={minValue}
        searchCounter={searchCounter}
        place={city}
        category={category}
      />
      <div />
    </ThemeProvider>
  );
};

export default PostCards;

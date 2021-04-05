import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/Home.module.css";
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
    paddingleft: "100px",
    outlineOffset: "100px",
  },

  avatar: {
    //legg inn profilbilde her senere
    backgroundColor: "secondary",
  },
}));

const PostCards = ({ posts }) => {
  const classes = useStyles();
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
                 <Link href={"/brukerprofil/" + post.userID} passHref>
                  <a>Selger</a>
                </Link>
              </Button>
            </CardActions>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PostCards;

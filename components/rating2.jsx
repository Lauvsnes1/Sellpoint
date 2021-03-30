import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    color:"#90cc00"
  },
});

const RatingCards = ({ ratings }) => {
  const classes = useStyles();

  return (
    <div>
      {ratings.map((rating) => (
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2"></Typography>
            <Typography className={classes.pos}>
              {"Rating score: "+rating.rating}
            </Typography>
            <Typography variant="body2" component="p">
              {"Gjort av: "+rating.user}
              <br />
              {"Beskrivelse: "+rating.reviewText}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RatingCards;

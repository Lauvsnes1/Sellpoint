import Typography from "@material-ui/core/Typography";
import firebase from "../config/fire-config";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import PostCards from "./cards_alt";
import Button from "@material-ui/core/Button";

const FilterPosts = () => {
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    handlePriceFilter(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  }, []);

  const handlePriceFilter = (min, max) => {
    firebase
      .firestore()
      .collection("posts")
      .where("price", "<=", max)
      .where("price", ">=", min)
      .orderBy("price", "asc")
      .onSnapshot((snapShot) => {
        const newPosts = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(newPosts);
      });
  };

  const onClick = (e) => {
    e.preventDefault();
    const min = minValue.length ? parseInt(minValue) : Number.MIN_SAFE_INTEGER;
    const max = maxValue.length ? parseInt(maxValue) : Number.MAX_SAFE_INTEGER;
    handlePriceFilter(min, max);
  };

  return (
    <div style={{ paddingTop: 100 }}>
      <Typography id="range-slider" gutterBottom>
        Prisområde:
      </Typography>
      <div>
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
        <Button variant="contained" onClick={onClick} color="secondary">
          Søk
        </Button>
      </div>
      <PostCards posts={posts} />
    </div>
  );
};

export default FilterPosts;

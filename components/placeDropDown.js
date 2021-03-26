import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DropDownMenu(props) {
  const classes = useStyles();

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Sted</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.city}
          onChange={(e) => {
            props.valueChanged(e.target.value);
          }}
          label="City"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Trondheim"}> Trondheim </MenuItem>
          <MenuItem value={"Oslo"}> Oslo </MenuItem>
          <MenuItem value={"Bodø"}>Bodø</MenuItem>
          <MenuItem value={"Kristiansand"}>Kristiansand</MenuItem>
          <MenuItem value={"Bergen"}>Bergen</MenuItem>
          <MenuItem value={"Tromsø"}>Tromsø</MenuItem>
          <MenuItem value={"Stavanger"}>Stavanger</MenuItem>
          <MenuItem value={"Ålesund"}>Ålesund</MenuItem>
          <MenuItem value={"Gjøvik"}>Gjøvik</MenuItem>
          <MenuItem value={"Hamar"}>Hamar</MenuItem>
          <MenuItem value={"Kristiansund"}>Kristiansund</MenuItem>
          <MenuItem value={"Fredrikstad"}>Fredrikstad</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

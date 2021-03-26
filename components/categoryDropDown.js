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
        <InputLabel id="demo-simple-select-outlined-label">Kategori</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.category}
          onChange={(e) => {
            props.valueChanged(e.target.value);
          }}
          label="City"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Diverse"}> Diverse </MenuItem>
          <MenuItem value={"Interiør"}> Interiør </MenuItem>
          <MenuItem value={"Klær"}>Klær</MenuItem>
          <MenuItem value={"Kjøretøy"}>Kjøretøy</MenuItem>
          <MenuItem value={"Eiendom"}>Eiendom</MenuItem>
          <MenuItem value={"Kjøkkenutstyr"}>Kjøkkenutstyr</MenuItem>
          <MenuItem value={"Hobby"}>Hobby</MenuItem>
          <MenuItem value={"Sykkel"}>Sykkel</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

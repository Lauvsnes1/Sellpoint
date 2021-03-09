import React from 'react';
import {useState , useEffect} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import { TableRow } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    textInputContainer:{
        width: 1000,
        flexDirection: 'row',
        justifyContent: 'space-between',

    }
});
const PriceSlider = withStyles({
    root: {
    marginTop: 20,
    marginLeft: 20,
      color:"#90CC00",
      width: 300
      
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
          boxShadow: 'inherit',
        },
      },
      active: {},
      valueLabel: {
        left: 'calc(-50% + 4px)',
      },
      track: {
        color: "#90CC00",
        height: 8,
        borderRadius: 4,
      },
      rail: {
        height: 8,
        borderRadius: 4,
      },
  
  })(Slider);

  
  function valuetext(value) {
    return `${value}kr`;
  }
  
  export default function PriceRangeSlider() {
    const classes = useStyles();
    const [key, setKey] = useState(0);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [value, setValue] = useState([10000, 50000]);

    useEffect(() => {
      setKey(1);
    }, []);
    
    
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      
    };

    const handleChangealt = (minvalue, maxvalue) => {
        setMaxValue(maxvalue);
        setMinValue(minvalue);
        setValue([minvalue,maxvalue]);
    };
  
    return (
      <div>
        <Typography id="range-slider" gutterBottom style={{ justifyContent: 'center'}}>
          Prisområde:
        </Typography>
        <div className={classes.textInputContainer} >
        <TextField id="outlined-basic" label="Min pris" variant="outlined" />
        <TextField id="outlined-basic" label="Max pris" variant="outlined"  />
        <Button variant="contained" onClick={handleChangealt}>submit</Button>
        </div>

        <PriceSlider 
          key={key}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          max = {100000}
          min ={1}
          step={10}
        />
      </div>
    );
  }
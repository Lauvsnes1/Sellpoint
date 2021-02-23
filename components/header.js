import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { colors, ThemeProvider} from '@material-ui/core';
import { green, blue, yellow, darkGreen, lightGreen }from '@material-ui/core/colors/green'
import {red}from '@material-ui/core/colors'
import theme from '../src/theme';
import Image from 'next/image'
import Link from 'next/link'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: 'full',
      position: 'relative',
      color: 'transparent',
      flexDirection: 'row'
    },
    
    title: {
      flex: 3,
    },
    button: {
        padding: 5,
        flex: 1,
        marginLeft: 20,
        
        
        

    }
  }));

  


  
  export default function ButtonAppBar() {
    const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {

  };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
            <AppBar color='primary' variant= 'elevation' position='fixed'>
                <Toolbar>
                <div>
                <Link href={'/'}>
                <a>
                <Image src='/Logo.png' height={60} width={200} paddingTop='100px'/>
                </a>
                </Link>
                </div>
                <div style={{width: 1440, flexDirection: 'row', justifySelf: 'flex-end', paddingLeft: 600}}>
                <Button className = {classes.button}> <Link href={'/createPost'}>Opprett annonse</Link></Button>
                <Button className = {classes.button}> Mine annonser</Button>
                <Button className = {classes.button}> Mine favoritter</Button>
                <Button className = {classes.button} variant = 'outlined' color='secondary'
                 aria_controls='simple-menu' aria-haspopup="true" onClick={handleClick}> Min profil</Button>
                 <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  
                >
                  <MenuItem onClick={handleClose}>Profil</MenuItem>
                  <MenuItem onClick={handleClose} color='red'>Logg ut</MenuItem>
                  </Menu>
                </div>
                </Toolbar>
            </AppBar>
            </div>
        </ThemeProvider>
      );
    }
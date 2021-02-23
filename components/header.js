import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { colors, ThemeProvider} from '@material-ui/core';
import { green, blue, yellow, darkGreen, lightGreen }from '@material-ui/core/colors/green'
import theme from '../src/theme';
import Image from 'next/image'
import Link from 'next/link'

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

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
            <AppBar color='primary' variant= 'elevation'>
                <Toolbar>
                <div>
                <Link href={'/'}>
                <a>
                <Image src='/Logo.png' height={75} width={150}/>
                </a>
                </Link>
                </div>
                <div style={{width: 1440, flexDirection: 'row', justifySelf: 'flex-end', paddingLeft: 650}}>
                <Button className = {classes.button}> <Link href={'/createPost'}>Opprett annonse</Link></Button>
                <Button className = {classes.button}> Mine annonser</Button>
                <Button className = {classes.button}> Mine favoritter</Button>
                <Button className = {classes.button} variant = 'outlined' color='secondary'> Min profil</Button>
                </div>
                </Toolbar>
            </AppBar>
            </div>
        </ThemeProvider>
      );
    }
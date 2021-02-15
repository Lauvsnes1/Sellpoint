import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { FormHelperText } from '@material-ui/core';
import theme from '../src/theme';


const useStyles = makeStyles((theme) => ({

    root: {
      maxWidth: 345,
      minWidth: 345,
      alignSelf: 'flex-start',
      
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
 
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
        //legg inn profilbilde her senere
      backgroundColor: 'secondary',
    },
  }));

  
  
  export default function AnnonseCard() {
  
  const classes = useStyles();
  const [tittel,setTittel] = useState('');
  const [lokasjon, setLokasjon] = useState('');
  const [pris, setPris]= useState(0);
  const [beskrivelse, setBeskrivelse] = useState('');
  const [bildesti, setBilde] = useState('');
   
    return (
        
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R {/*legg inn profilbilde til selger her*/ }
              </Avatar>
              
            }
          
            title = {tittel}
            subheader={lokasjon}
          />
          <CardMedia
            className={classes.media}
            image={bildesti}
            //fiks senere
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {beskrivelse}
            </Typography>
            <Typography style={theme.typography.h3}>
              {pris} 
            </Typography>
          </CardContent>
          <CardActions>
            
          </CardActions>

        </Card>

        //endelig formatering blir gjort når vi fikser koblingen til firebase 
      );
    
        };

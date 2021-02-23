import React, { useEffect, useState } from 'react';
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
import { db } from '../config/fire-config';
import firebase from "../config/fire-config";




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



function usePosts(){
  const [posts, setPost] = useState([])

  useEffect(() => {
    firebase
    .firestore()
    .collection('posts')
    .onSnapshot((snapShot) => {
      const newPosts = snapShot.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()
      }) )
      setPost(newPosts);
    } )
  }, [])

  //brukes kanskje senere
  
  return posts
}

  
  
  export default function AnnonseCard() {

    const post = usePosts();

  
  const classes = useStyles();
  const [postId,setPostId] = useState('');
  
  const [tittel,setTittel] = useState('');
  const [lokasjon, setLokasjon] = useState('');
  const [pris, setPris]= useState(0);
  const [beskrivelse, setBeskrivelse] = useState('');
  const [bildesti, setBilde] = useState('');

  {/*useEffect(() =>{
    FirestoreService.getPosts(postId)
    .then(post => { 
      if(post.exists){
        setPost(post.data())
        console.log(post.data());
      }
      else{
        console.log('fant ikke post')
        //setPost();
      }})
    },[postId]);
  */}
    
   
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

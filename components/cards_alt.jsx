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
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../styles/Home.module.css'


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
  
  return posts
}

  
  
 const PostCards = () => {

 const posts = usePosts();

  
  const classes = useStyles();
  const [postId,setPostId] = useState('');
  
  {/*const [tittel,setTittel] = useState('');
  const [lokasjon, setLokasjon] = useState('');
  const [pris, setPris]= useState(0);
  const [beskrivelse, setBeskrivelse] = useState('');
 const [bildesti, setBilde] = useState('');*/}

   
    return (
    <div className={styles.rad}>
     {posts.map((post) => 
        <Card className={classes.root}>
            
            <div>
                <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    S {/*legg inn profilbilde til selger her*/ }
                </Avatar>
                
                }
            
                title = {post.title}
                subheader={post.place}
            />
            <CardMedia
                className={classes.media}
                //image={bildesti}
                //fiks senere
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {post.description}
                </Typography>
                <Typography style={theme.typography.h3}>
                    prisen er:  
                {post.pris} 
                </Typography>
            </CardContent>
            <CardActions>
                
            </CardActions>

          </div>
            
          </Card>
     )}
          </div>

        //endelig formatering blir gjort når vi fikser koblingen til firebase 
      );
    
        };

        export default PostCards

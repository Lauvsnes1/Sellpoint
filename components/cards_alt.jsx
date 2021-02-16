import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
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
      minWidth: 300,
      maxWidth: 300,
      height: 400,
      alignItems: 'flex-start',

      
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

  
i = 0;
 const PostCards = () => {
 const posts = usePosts();

 i+=1;
  const classes = useStyles();
  const [postId,setPostId] = useState('');
  
  {/*const [tittel,setTittel] = useState('');
  const [lokasjon, setLokasjon] = useState('');
  const [pris, setPris]= useState(0);
  const [beskrivelse, setBeskrivelse] = useState('');
 const [bildesti, setBilde] = useState('');*/}

   if(i%3==0){
     <br/>
   }
    return (
    <div className={styles.annonseContainer}>
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
                <Typography style={{textAlign: "right"}}> 
                  {post.pris} kr
                </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant = 'outlined' color='secondary'>
                Annonse
              </Button>
              <Button size="small" variant = 'outlined' color='secondary'>
                Selger
              </Button>
            </CardActions>

          </div>
            
          </Card>
     )}
          </div>

        //endelig formatering blir gjort når vi fikser koblingen til firebase 
      );
    
        };

        export default PostCards

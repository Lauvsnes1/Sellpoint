import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import theme from '../src/theme';
import { db } from '../config/fire-config';
import firebase from "../config/fire-config";
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../styles/Home.module.css'
import { colors, ThemeProvider} from '@material-ui/core';

const useStyles = makeStyles(() => ({

    subheader: {
      color: '#90CC00'//får det ikke til med theme.palette???
    },

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

    button: {
      paddingLeft: '100px',
      outlineOffset: '100px',
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
    <ThemeProvider theme ={theme}>
      <div className={styles.annonseContainer}>
      {posts.map((post) => 
          <Card className={classes.root}>
            
              
              <div>
                  <CardHeader 
                  classes={{
                    subheader: classes.subheader
                  }}

                  avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                      S {/*legg inn profilbilde til selger her eller initialer*/ }
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
                
                <div style={{margin: 'auto', justifyContent: 'space-between'}}>
                <Button size="small" variant = 'outlined' color='secondary' >
                  Annonse
                </Button>
                
                {/*ser jævlig shady ut men ingenting funka*/}
                  
                <Button size="small" variant = 'outlined' color='secondary'>
                  Selger
                </Button>
                </div>
        
              </CardActions>

            </div>
              
            </Card>
      )}
            </div>
          </ThemeProvider>

        //endelig formatering blir gjort når vi fikser koblingen til firebase 
      );
        };
        

        export default PostCards

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
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../styles/Home.module.css'
import { colors, ThemeProvider} from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import PriceRangeSlider from "../components/filters";
import TextField from '@material-ui/core/TextField';
import { createContext } from 'react'
import { useRouter } from 'next/router'


const useStyles = makeStyles(() => ({

    subheader: {
      color: '#90CC00'//får det ikke til med theme.palette???
    },

    root: {
      minWidth: 330,
      maxWidth: 330,
      height: 375,
      marginTop: 30,
      alignItems: 'flex-start',

      
    },
    media: {
      height: 100,
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
    //.where('price', '>', priceContextMin)
    //.where('price', '<', priceContextMax)
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
function usePostsPrice(minValue, maxValue){

  const [posts, setPost] = useState([])
  useEffect(() => {
    firebase
    .firestore()
    .collection('posts')
    .where('price','<', maxValue)
    .where('price','>', minValue)
    .onSnapshot((snapShot) => {
      
      const newPosts = snapShot.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()

      }) )
      setPost(newPosts);
    } )
  
  },[])
  return posts
}

 

 const PostCards = () => {
 const [sortByPrice, setSortByPrice] = useState(false);
 const [minValue, setMinValue] = useState(0);
 const [maxValue, setMaxValue] = useState(30000000);
  const classes = useStyles();
  const [postId,setPostId] = useState('');
  
  function handlePriceRange(){
    setMinValue(minValue);
    setMaxValue(maxValue);
    setSortByPrice(true);
    //post = postFilteredByPrice;
  }
    
    return (

    <ThemeProvider theme ={theme}>
      {//<PriceRangeSlider getValues={handleSlider}/>
 }
      <div style={{paddingTop: 100}}>
        <Typography id="range-slider" gutterBottom >
          Prisområde: {minValue} - {maxValue} 
        </Typography>
        <div className={classes.textInputContainer} >
        <TextField value={minValue} id="outlined-basic" label="Min pris" variant="outlined" key={'1'} onChange={(({target}) => setMinValue(target.value))} />
        <TextField value={maxValue} id="outlined-basic" label="Max pris" variant="outlined" key={'2'} onChange={(({target}) => setMaxValue(target.value))} />
        <Button variant="contained" 
        onClick={handlePriceRange}
        color='secondary'>Søk</Button>
        </div>
        </div>
        <SortByPrice sortByPrice={sortByPrice} maxValue={maxValue} minValue={minValue}/>
        <div/>

          </ThemeProvider>

      );
        };
    
        export default PostCards

        function SortByPrice(props){
          const posts = usePosts();
          const classes = useStyles();
          const sortByPrice = props.sortByPrice;
          const postFilteredByPrice = usePostsPrice(props.minValue,props.maxValue)

          if(sortByPrice){
            return (
              <div className={styles.annonseContainer}>
              {postFilteredByPrice.map((post) => 
                  <Card className={classes.root}>  
                    <div>
                <CardHeader 
                classes={{
                  subheader: classes.subheader
                }}

                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                {/*firebase.firestore().collection('users').doc(post.userID).get().firstName*/}  
                </Avatar>
                
                } 
            
                title = {post.title}
                subheader={post.place}
                
            />
            <CardMedia
                className={classes.media}
                image= {post.imageUrl}
            />

            {/*<Image src="firebase.storage().ref('/images/' + post.imageRef).getDownloadURL()" //brukt til test
            height='10px'
              width='10px'/>*/}
            
            
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" style={{height: "25px", lineHeight: "25px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                {post.miniDescription}
                </Typography>
                <Typography style={{textAlign: "right"}}> 
                  {post.price} kr

                  
                </Typography>
            </CardContent>
            <CardActions style={{height: "20px", }}>
              <Button size="small" variant = 'outlined' color='secondary' marginRight = "30px" display="inline-block">
                <Link href={'/annonse/'+post.id} passHref><a>Annonse</a></Link>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button size="small" variant = 'outlined' color='secondary' marginLeft = "30px" display="inline-block">
                Selger
              </Button>
            </CardActions>

          </div>
            
          </Card>
    )}
          </div>
            );
          }
          else{
            return(
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
                  {/*firebase.firestore().collection('users').doc(post.userID).get().firstName*/}  
                  </Avatar>
                  
                  } 
              
                  title = {post.title}
                  subheader={post.place}
                  
              />
              <CardMedia
                  className={classes.media}
                  image= {post.imageUrl}
              />

              {/*<Image src="firebase.storage().ref('/images/' + post.imageRef).getDownloadURL()" //brukt til test
              height='10px'
                width='10px'/>*/}
              
              
              <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p" style={{height: "25px", lineHeight: "25px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                  {post.miniDescription}
                  </Typography>
                  <Typography style={{textAlign: "right"}}> 
                    {post.price} kr

                    
                  </Typography>
              </CardContent>
              <CardActions style={{height: "20px", }}>
                <Button size="small" variant = 'outlined' color='secondary' marginRight = "30px" display="inline-block">
                  <Link href={'/annonse/'+post.id} passHref><a>Annonse</a></Link>
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="small" variant = 'outlined' color='secondary' marginLeft = "30px" display="inline-block">
                  Selger
                </Button>
              </CardActions>

            </div>
              
            </Card>
      )}
            </div>

            );
          }
        }

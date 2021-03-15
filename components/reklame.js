import React from 'react';
import {useState, useEffect} from 'react';
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
import fire from '../config/fire-config';
import firebase from "../config/fire-config";
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({

    reklameContainer: {
        width: 1200,
        display: "flex",
        alignSelf: "center",
        paddingLeft: 0,
        flexDirection: "column",
        position: "fixed"
    },

    reklameContainerLeft: {
        alignSelf: "flex-start",
        position: "fixed",
        bottom: 0,
        top: 0,
        width: 200,
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft: 0,
        paddingTop:71
    },
    reklameContainerRight: {
        alignSelf: "flex-end",
        position: "fixed",
        bottom: 0,
        top: 0,
        width: 200,
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 0,
        paddingTop:71
    }
}));

function Reklame(){ 
    const [ads, setAd] = useState([])

    useEffect(() => {
        firebase
        .firestore()
        .collection("ads")
        .onSnapshot((snapShot) => {
            const newAds = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setAd(newAds);
        })
    }, [])
    return ads
}

const AdCards = () => {
    const ads = Reklame();
    const classes = useStyles();

    return(
        <div className= {classes.reklameContainer}>
            <div className= {classes.reklameContainerLeft}>
                {ads.map((ad) => 
                    <a href={ad.link}>
                        <Image src={ad.imageUrl} height={113} width={200}/>
                    </a>
                )}
            </div>
            <div className= {classes.reklameContainerRight}>
                {ads.map((ad) => 
                    <a href={ad.link}>
                        <Image src={ad.imageUrl} height={113} width={200}/>
                    </a>
                )}
            </div>
        </div>
        
    );
};

export default AdCards
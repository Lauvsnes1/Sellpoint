import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({

    palette: {
        primary: { 
            light:'#FFFFFF',
            main: '#FAFAFA',
            dark: '#C7C7C7',
            contrastText: '#000'
            //Hvit og grå

        },
        secondary: {
            light:'#FDFF58',
            main: '#C6FF00',
            dark: '#90CC00',
            contrastText: '#000'
            //Limegrønn
        }

    },
    typography: {
        h1:{
            fontFamily: '"Helvetica Neue"',
            fontSize: '48',
            fontWeight: 300,

        },
        h2:{
            fontFamily: '"Helvetica Neue"',
            fontSize: '36',
            fontWeight: 300,

        },
        h3:{
            fontFamily: '"Helvetica Neue"',
            fontSize: '24',
            fontWeight: 300,

        },
        h4:{
            fontFamily: '"Helvetica Neue"',
            fontSize: '18',
            fontWeight: 300,

        },
        paragraph:{
            fontFamily: '"Helvetica Neue"',
            fontSize: '12',
            fontWeight: 400,

        },
        bold:{
            fontFamily: '"Helvetica Neue"',
            fontSize: '12',
            fontStyle: 'bold',

        },
        bold:{
            fontFamily: '"Helvetica Neue"',
            fontSize: '12',
            fontStyle: 'italic',

        },


        button:{
                fontFamily: '"Helvetica Neue"',//kan legge til mer her om vi ønsker v/ hjelp av fontFamily
                //fontStyle: 'italic' 

    }
}


});

export default theme; 
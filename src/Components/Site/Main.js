import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Sidebar from './Sidebar'
import HotLinks from '../Display_Files/hotLinks'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));



const Main = (props) =>{
    const classes = useStyles();

    console.log('hi')
    console.log(props.role)
    console.log(props.token)

    return(
    <div className={classes.root}>
        <Grid container spacing={1}>    
          <Grid item xs={2}>
            <Sidebar className={classes.paper}/>
          </Grid>
          <Grid item xs={10}>
            <HotLinks token={props.token} role={props.role}/>
          </Grid>
        </Grid>
      </div>
    )
}

export default Main
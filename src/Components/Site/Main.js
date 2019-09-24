import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';

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
      width: 200
      
    },

  }));



const Main = (props) =>{
    const classes = useStyles();
    const { width } = props;

    return(
    <div className={classes.root}>
        <Grid container spacing={1}>    
          <Grid item xs={2}>
            <Hidden only={['sm', 'xs']}>
            <Sidebar className={classes.paper}/>
            </Hidden>
          </Grid>
          <Grid item xs={(width!='sm')?10:12}>
            <HotLinks token={props.token} role={props.role}/>
          </Grid>
        </Grid>
      </div>
    )
}

export default Main
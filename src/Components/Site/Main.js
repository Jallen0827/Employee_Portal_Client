//REQUIRED PACKAGES
import React from 'react'
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'
import styled from 'styled-components'

//MATERIAL-UI IMPORTS
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';

//IMPORTED COMPONENTS
import Sidebar from './Sidebar'
import HotLinks from '../Display_Files/hotLinks'
import TimeSheet from '../TimeSheet/timesheet'
import Tasks from '../Tasks/Task'

//STYLED COMPONENTS && MAKESTYLES
const Background = styled.div`
    background: linear-gradient(to bottom, white, #e1e6e2);    
    margin-top: 1.8vh;
    margin-left: .5vw;
    height: 47vh;
    font-size: 1.3em;
`

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
    background:{
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    }

  }));



const Main = (props) =>{
    const classes = useStyles();
    const { width } = props;

    return(
    <div className={classes.root}>
        <Grid container spacing={1}> 
          <Grid item xs={2}>
            <Hidden only={['sm', 'xs']}>
          <Background className={classes.background}>  
            {/* <Sidebar className={classes.paper}/> */}
            
               <ul className='sidebar-list list-unstyled'>
                   <li><Link to='/home'>Home</Link></li>                   
                   <li><Link to='/hotlinks'>Hot Links</Link></li>
                   <li><Link to='/timesheet'>Time Sheet</Link></li>
               </ul>
            
          </Background> 
            </Hidden>
          </Grid>
          <Grid item xs={(width!='sm')?10:12}>
            <Switch>
              <Route exact path="/home"><Tasks token={props.token}/></Route>
              <Route exact path="/"><Tasks token={props.token}/></Route>
              <Route exact path='/hotlinks'><HotLinks token={props.token} role={props.role}/></Route>
              <Route exact path='/timesheet'><TimeSheet/></Route>
            </Switch>
          </Grid>
        </Grid>
      </div>
    )
}

export default Main
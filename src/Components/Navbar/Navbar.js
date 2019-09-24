import React from 'react'
import Logo from '../../Assets/Logo.png'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles(theme => ({
    button: {
      backgroundColor: 'lightgrey',
      color: 'white'
    },
    input: {
      display: 'none',
    },
    logo: {
      height:50,
      // padding: .5em,
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: 'cadetblue'
    },
    navbar:{
      backgroundColor: 'whitesmoke'
    }
  }));

const Navbar = (props)=>{
    const classes = useStyles()

    return(
      <>
        <AppBar className={classes.navbar}position="static">
        <Toolbar>
          <div className={classes.title}>
          <img className={classes.logo} src={Logo} alt='Logo' onClick={props.logoutCount}/>
          </div>
          <Typography variant="h6" className={classes.title}>
            EMPLOYEE PORTAL
          </Typography>
          {props.token?
          <Button className={classes.button} onClick={props.clearToken}>Logout</Button>: ''
          }
        </Toolbar>
      </AppBar>
      </>
    )
}

export default Navbar
import React from 'react'
import './Navbar.css'
import Logo from '../../Assets/Logo.png'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));

const Navbar = (props)=>{
    const classes = useStyles()

    return(
        <nav>
            <img className='nav-img' src={Logo} alt='Logo' onClick={props.logoutCount}/>
            <Typography>EMPLOYEE PORTAL</Typography>
            <Button variant="contained" color="primary" className={classes.button} id='logout' onClick={props.clearToken}>
            <Typography>Logout</Typography>
            </Button>
        </nav>
    )
}

export default Navbar
import React, {useState} from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import './Auth.css'


const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }));

const Auth=(props) =>{
    const classes = useStyles();

    return(
        <form className='card-like'>
            <h1>LOGIN</h1>
            <TextField
                id="standard-required"
                label="Email:"
                margin="normal"
            />
            <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                margin="normal"
            />

            <Button type= 'submit' variant="contained" className={classes.button}>Submit</Button>
            <Button>Sign Up</Button>
        </form>
    )
}

export default Auth
import React, {useState} from 'react'
import APIURL from '../../helpers/env'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
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
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    helper:{
        color: 'red'
    }
  }));

const Auth=(props) =>{
    const [login, setLogin] = useState(true)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailValid, setEmailValid] = useState(true)
    const [passwordValid, setPasswordValid] = useState(true)
    const [firstNameValid, setFirstNameValid] = useState(false)
    const [lastNameValid, setLastNameValid] = useState(false)
    
    const classes = useStyles();

    const changelogin = (e) =>{
        e.preventDefault()
        setLogin(!login)

        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
    }

    const emailValidation = (e) =>{
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(email.match(regex)){
            setEmailValid(true)
        }else{
            setEmailValid(false)
        }
    }

    const passwordValidation = (e) =>{
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(password.length>5){
            setPasswordValid(true)
        }else{
            setPasswordValid(false)
        }
    }

    const handlesubmit =(e) =>{
        e.preventDefault()
        let url = login ?  `${APIURL}/user/signin`: `${APIURL}/user/signup`
        let roleUser = (props.logoutCount >= 5)? 'Admin': null
        // props.setRole(roleUser)
        if(emailValid&&passwordValid){
        fetch(url, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({user:{
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:password,
                role: roleUser
            }})
        }).then(res => res.json())
        .then(data=>{
            let role1 = (data.user)? data.user.role: null
            props.updateToken(data.sessionToken, role1)
        })
    }
}

    return(
        <form  onSubmit={(e)=>handlesubmit(e)}>
            <Box
                boxShadow={3}
                bgcolor="background.paper"
                m={1}
                p={1}
                style={{ width: '20rem', margin: '20vh auto' }}
                className='card-like'
            >

      
            <h1>{login? 'LOG IN' : 'SIGN UP'}</h1>
            <TextField
                required
                label="Email:"
                margin="normal"
                className={classes.helper}
                onChange={(e)=>setEmail(e.target.value)}
                onBlur={(e)=>emailValidation(e)}
                helperText={emailValid? '': 'Invalid Email'}
            />
            <TextField
                required
                label="Password"
                type="password"
                margin="normal"
                onChange={(e)=>setPassword(e.target.value)}
                onBlur={(e)=>{passwordValidation(e)}}
                helperText={passwordValid?'':'Password must be 5 characters long'}
            />

            {login ? null:
                <>
                <TextField
                required
                label="First Name:"
                margin="normal"
                onChange={(e)=>setFirstName(e.target.value)}
                /> 
                <TextField
                required
                label="Last Name:"
                margin="normal"
                onChange={(e)=>setLastName(e.target.value)}
                /> 
                </>
            }

            <Button type= 'submit' variant="contained" className={classes.button}>Submit</Button>
            <Button onClick={(e)=>changelogin(e)}>{login? 'Sign Up': 'Log In'}</Button>
            </Box>
        </form>
    )
}

export default Auth
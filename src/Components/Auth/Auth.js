import React, {useState} from 'react'
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
  }));

const Auth=(props) =>{
    const [login, setLogin] = useState(true)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const classes = useStyles();

    const changelogin = (e) =>{
        e.preventDefault()
        setLogin(!login)

        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
    }

    const handlesubmit =(e) =>{
        e.preventDefault()
        let url = login ?  'http://localhost:3002/user/signin': 'http://localhost:3002/user/signup'
        let roleUser = (props.logoutCount >= 5)? 'Admin': null
        // props.setRole(roleUser)

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
            // props.role(role1)
            console.log('akjdf;akdjg;kadga;dwgjd;agjad;g')
            props.updateToken(data.sessionToken, role1)
        })
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
                onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
                required
                label="Password"
                type="password"
                margin="normal"
                pattern = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                onChange={(e)=>setPassword(e.target.value)}
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
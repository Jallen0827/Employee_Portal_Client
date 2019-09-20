import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components'
import Link from './Link'
import Upload from './upload'


const Background = styled.div`
    background: linear-gradient(to bottom, white, #e1e6e2);
    height: 100%;
`

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper1: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 130,
        width: 200,
    },
    control: {
        padding: theme.spacing(2),
    },
  button: {
    margin: theme.spacing(1),
    position: 'relative',
    top: '100%',
    right: '-90%',
    backgroundColor: 'grey',
    color: 'white'
  },
  input: {
    display: 'none',
  },
  card: {
    maxWidth: 200,
    margin: 30,
    textAlign: 'center'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9

  }
}));

const HotLinks = (props) =>{
    const classes = useStyles();
    const [spacing, setSpacing] = useState(2);
    const [links, setLinks] = useState([])
    const [open, setOpen] = React.useState(false);

    const fetchLinks=()=>{
        fetch('http://localhost:3002/file/all', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then(res=> res.json())
        .then(data => {
            setLinks(data)
            console.log(data[0].id)
        })
    }

    useEffect(()=>{
        fetchLinks()
        
    }, [])

    return( 
        <Background>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={spacing}>
                    {links.map((value, index) => (
                        <Grid key={index} item>
                        <Link info ={value} fetchLinks={fetchLinks} token={props.token} role={props.role}/>
                        </Grid>
                    ))}
                    </Grid>
                </Grid>
            </Grid>
            {(props.role==='Admin')?<Upload fetchLinks={fetchLinks} token={props.token}/>:null}
        </Background>
    )
}

export default HotLinks
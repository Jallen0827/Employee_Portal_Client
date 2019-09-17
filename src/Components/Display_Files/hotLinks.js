import React, {useState, useEffect} from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import styled from 'styled-components'
import Img from '../../Assets/Logo.png'

const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const Background = styled.div`
    background: linear-gradient(to bottom, white, #e1e6e2);
    height: 130%;
`

const useStyles = makeStyles(theme => ({
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
    const [links, setLinks] = useState([])

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
        })
    }

    useEffect(()=>{
        fetchLinks()
        console.log()
    }, [])

    return( 
        <Background>
            Links.map((Link, index)=>{

            })            
            <Row>
                <Column>
                        <Card className={classes.card}>
                            <CardHeader
                                title="File Name"      
                            />
                            <CardMedia
                                className={classes.media}
                                image={Img}
                                title="Logo"
                            />
                        <CardActions>
                            <Button size="small" color="dark">Edit</Button>
                            <Button size="small" color="dark">Delete</Button>
                        </CardActions>
                        </Card>
                </Column>
                <Column>
                        <Card className={classes.card}>
                            <CardHeader
                                title="File Name"      
                            />
                            <CardMedia
                                className={classes.media}
                                image={Img}
                                title="Logo"
                            />
                        <CardActions>
                            <Button variant="contained" color="primary">Edit</Button>
                            <Button variant="contained" color="secondary">Delete</Button>
                        </CardActions>
                        </Card>
                </Column>
                <Column>
                        <Card className={classes.card}>
                            <CardHeader
                                title="File Name"      
                            />
                            <CardMedia
                                className={classes.media}
                                image={Img}
                                title="Logo"
                            />
                        <CardActions>
                            <Button size="small" color="dark">Edit</Button>
                            <Button size="small" color="dark">Delete</Button>
                        </CardActions>
                        </Card>
                </Column>
                <Column>
                        <Card className={classes.card}>
                            <CardHeader
                                title="File Name"      
                            />
                            <CardMedia
                                className={classes.media}
                                image={Img}
                                title="Logo"
                            />
                        <CardActions>
                            <Button size="small" color="dark">Edit</Button>
                            <Button size="small" color="dark">Delete</Button>
                        </CardActions>
                        </Card>
                </Column>
            </Row>
            
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" className={classes.button}>
                <Typography>Upload</Typography>
                </Button>
            </label>        
        </Background>
    )
}

export default HotLinks
import React, {useState, useEffect} from 'react'
import Edit from './editFile'
import APIURL from '../../helpers/env'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Img from '../../Assets/Logo.png'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    input: {
        display: 'none',
    },
    card: {
        width:200,
        margin: 30,
        textAlign: 'center'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9

    }
    }));

const Link = (props) =>{
    const classes = useStyles();
    const [imageURL, setImageURL] = useState('')

    const deleteLink=(linkId) =>{
        fetch(`${APIURL}/file/delete/${linkId}`, {
            method:'DELETE',
            headers: new Headers({
                'Content-Type':'application/json',
                'Authorization':props.token
            })
        })
        .then(()=>props.fetchLinks())
    }

    const downloadLink=(linkId) =>{
        fetch(`${APIURL}/file/awsFile/${linkId}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': props.token
            }
        }).then(res=>res.json())
        .then(data=>{
                console.log(data)
                setImageURL(data.location)
            })
               
    }

    useEffect(()=>{
        downloadLink(props.info.id)
        
    }, [])

    return(
    <>
        <Card className={classes.card} >
            <CardHeader
                title={props.info.title}      
            />
            <a href={imageURL} download>{/*   */}
            <CardMedia
                className={classes.media}
                image={Img}
                title="Logo"
                download
            />
            </a>
            {(props.role==='Admin')? <CardActions>
                <Edit linkId={props.info.id} fetchLinks={props.fetchLinks} token={props.token}/>
                <Button variant="contained" color="secondary" onClick={()=>{deleteLink(props.info.id)}}>Delete</Button>
            </CardActions>: null}
        </Card>
    </>
    )
}

export default Link
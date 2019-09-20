import React, {useState} from 'react'
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
    console.log(props.info.title)

    const deleteLink=(linkId) =>{
        fetch(`http://localhost:3002/file/delete/${linkId}`, {
            method:'DELETE',
            headers: new Headers({
                'Content-Type':'application/json',
                'Authorization':props.token
            })
        })
        .then(()=>props.fetchLinks())
    }

    const downloadLink=(linkId) =>{
        fetch(`http://localhost:3002/file/${linkId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.token
            }
        }).then(res=>res.json())
        .then(data=>console.log(data))
        // .then(blob=>{
        //     console.log(blob.data.data)
        //     showFile(blob.data.data)
        // })
    }

    const showFile=(file)=>{ //Using this function to try and create a file that can be downloaded
        
            
        let fileContents = Buffer.from(file, 'base64')
        console.log(fileContents)
        var decodedData = window.atob(fileContents)
        console.log(decodedData)
          
        
        // let file = new File([blob], "filename.png")
        let newBlob = new Blob([fileContents], {type: 'image/png'})
        newBlob.lastModifiedDate = new Date();
        newBlob.name = 'fileName.png';
        console.log(newBlob)
        // console.log(file)
        let file1 = window.URL.createObjectURL(newBlob)
        console.log(file1)
        setImageURL(file1)

    }

    return(
    <>
        <Card className={classes.card} >
            <CardHeader
                title={props.info.title}      
            />
            <a >{/*   */}
            <CardMedia
                className={classes.media}
                image={Img}
                title="Logo"
                onClick={(e)=>downloadLink(props.info.id)}
                download
            />
            </a>
            {(props.role==='Admin')? <CardActions>
                <Button variant="contained" color="primary">Edit</Button>
                <Button variant="contained" color="secondary" onClick={()=>{deleteLink(props.info.id)}}>Delete</Button>
            </CardActions>: null}
        </Card>
    </>
    )
}

export default Link
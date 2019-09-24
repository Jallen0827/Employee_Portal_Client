import React, {useState} from 'react'
import APIURL from '../../helpers/env'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
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
    button: {
        backgroundColor: '#1976d2',
        color: 'white'
    },
    button1: {
        backgroundColor: 'grey',
        color: 'white'
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

const Edit = (props)=>{
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('')

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const EditFile = (e, linkId) =>{
        e.preventDefault()
        setOpen(false)

        const formData = new FormData()
        formData.append('file', file)
        // formData.append('name',fileName)
        console.log(formData)

        fetch(`${APIURL}/file/update/${linkId}`, {
            method:'PUT',
            headers:new Headers({
                'Authorization': props.token                                
            }),
            body:formData, title: fileName
        }).then(()=>props.fetchLinks())
    }

    return(
        <>
        <Button variant="contained" component="span" className={classes.button} onClick={handleOpen}>
            <Typography>Edit</Typography>
        </Button>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
            <div className={classes.paper1}>
                <form onSubmit={(e)=>{EditFile(e, props.linkId)}}>
                    <h2 id="transition-modal-title">CHANGE FILE</h2>
                    <TextField
                        // accept="image/*"
                        // className={classes.input}
                        name = 'file'
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={e=>setFile(e.target.files[0])}
                    />
                    <br/>
                    <br/>
                    <Button type='submit' className={classes.button1}>UPLOAD</Button>
                </form>
            </div>
            </Fade>
        </Modal> 
        </>  
    )
}

export default Edit
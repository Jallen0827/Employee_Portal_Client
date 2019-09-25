//IMPORT PACKAGES
import React, {useState, useEffect} from 'react'
import APIURL from '../../helpers/env'

//MATERIAL-UI COMPONENTS
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
        margin: theme.spacing(1),
    },
    card: {
        maxWidth: 200,
        margin: 30,
        textAlign: 'center'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9

    },
    title:{
        textAlign:'center',
    }
    }));

const CreateTask = (props) => {
    const [open, setOpen] = useState(false)
    const [newTask, setNewTask] = useState('')
    const classes = useStyles();


    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const addTask = (e) =>{
        e.preventDefault()

        fetch(`${APIURL}/task/create`, {
            method:'POST',
            headers:new Headers({
                'Content-Type':'application/json',
                'Authorization': props.token                                
            }),
            body:JSON.stringify({
                task: newTask,
                type: "To do"
            })
        }).then(()=>{
            setOpen(false)
            props.fetchTasks()
        })
    }

    return (
        <>
        <Button variant="contained" color="primary" className={classes.button} onClick={handleOpen}>
        Create Task
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
                <form onSubmit={(e)=>{addTask(e)}}>
                    <h2 id="transition-modal-title" className={classes.title}>CREATE TASK</h2>
                    <TextField
                        id="standard-textarea"
                        label="ENTER NEW TASK"
                        multiline
                        className={classes.textField}
                        margin="normal"
                        onChange={(e)=>setNewTask(e.target.value)}
                    />
                    <br/>
                    <br/>

                    <Button type='submit' variant="contained" color="primary" className={classes.button}>Create Task</Button>
                </form>
            </div>
            </Fade>
        </Modal> 
        </>  
    )
}

export default CreateTask

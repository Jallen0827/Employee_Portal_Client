import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

//IMPORT COMPONENTS
import APIURL from '../../helpers/env'
import GetTask from './getTasks'
import CreateTask from './createTask'

//MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const Background = styled.div`
    background: linear-gradient(to bottom, white, #e1e6e2);    
    margin-top: 3vh;
    margin-right: 1vw;

`
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 300,
      width: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
    button1: {
        margin: theme.spacing(1),
        backgroundColor: 'lightgrey',
    },
    heading:{
        textAlign: 'center',
        width: 300,
        MinWidth:300,
    }
  }));

const Tasks = (props) => {
    const [toDoTasks, setToDoTasks] = useState([])
    const [inProgressTasks, setInProgressTasks] = useState([])
    const [doneTasks, setDoneTasks] = useState([])
    const classes = useStyles();

    const fetchTasks=()=>{
        fetch(`${APIURL}/task/`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then(res=> res.json())
        .then(data => {
            //DATA RETURNS AN ARRAY OF OBJECTS. EACH OBJECT CONTAINS KEY VALUES REPRESENTING POSTGRES COLUMN NAMES.THE FILTER METHOD HELPS ME LOOP OVER THIS DATA ARRAY AND CREATE NEW ARRAYS. THE CONDITION I AM LOOKING FOR IS WHAT VALUE IS ASSOCIATED WITH THE KEY OF TYPE. ONCE MY NEW ARRAYS ARE CREATED I STORE THEM IN STATE VARIABLES AND USE THEM LATER IN MY CODE TO MAP OVER AND CREATE NEW COMPONENTS
            let todo = data.filter(value=> value.type == 'To do')
            let progress = data.filter(value=> value.type == 'In progress')
            let done = data.filter(value=> value.type == 'Done')
            setInProgressTasks(progress)
            setToDoTasks(todo)
            setDoneTasks(done)
        })
    }

    const clearAll = (e) =>{
        fetch(`${APIURL}/task/delete`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then(res=>res.json())
        .then(data=>{
            fetchTasks()
        })
    }

    useEffect(()=>{
        fetchTasks()
        
    }, [])

    return (
        <Background>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    {/* <Button variant="contained" color="primary" className={classes.button}>
                        CREATE TASK
                    </Button> */}
                    <CreateTask fetchTasks={fetchTasks} token={props.token}/>
                    <Grid container justify="center" spacing={10}>                    
                        <Grid item>
                        <h1 className={classes.heading}>TO DO</h1>
                        <hr/>  
                        {toDoTasks.map((item,index)=>{
                            return(
                            <GetTask key={index} info={item} fetchTasks={fetchTasks} token={props.token}/>)
                        })}                
                        </Grid>
                        <Grid item>
                        <h1 className={classes.heading}>IN PROGRESS</h1>
                        <hr/> 
                        {inProgressTasks.map((item,index)=>{
                            return(
                            <GetTask key={index} info={item} fetchTasks={fetchTasks} token={props.token}/>)
                        })}                        
                        </Grid>
                        <Grid item>
                        <h1 className={classes.heading}>DONE</h1>
                        <hr/> 
                        {doneTasks.map((item,index)=>{
                            return(
                            <GetTask key={index} info={item} fetchTasks={fetchTasks} token={props.token}/>)
                        })}
                        <Button className={classes.button1} onClick={(e)=>clearAll(e)}>Clear All</Button>                       
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Background>
    )
}

export default Tasks

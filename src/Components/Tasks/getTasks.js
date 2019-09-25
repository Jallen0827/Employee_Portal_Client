import React from 'react'
import APIURL from '../../helpers/env'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
      minWidth: 100,
      marginTop: 10,
    },
  });

const GetTask = (props) => {
    const classes = useStyles()

    const updateTask =(e)=>{
      let type = (props.info.type== 'To do')? 'In progress' : (props.info.type=='In progress') ? 'Done' : 'To do'
      fetch(`${APIURL}/task/update/${props.info.id}`,{
        method:'PUT',
        headers:new Headers({
            'Content-Type':'application/json',
            'Authorization': props.token                                
        }),
        body:JSON.stringify({
            type: type
        })
    }).then(()=>{        
        props.fetchTasks()
    })
    }
    

    return (
        <Card className={classes.card} onClick={(e)=>updateTask(e)}>
        <CardContent>
          <Typography component="p">
            {props.info.task}
          </Typography>
        </CardContent>
      </Card>
    )
}

export default GetTask

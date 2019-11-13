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
      //THE VALUE OF THE VARIABLE CALLED TYPE IS SET BY A LONG TERNARY. THIS TERNARY IS PASSED A PROP FROM A PARENT COMPONENT CONTAINING THE VALUE OF AN OBJECT. THE OBJECT HAS A KEY OF TYPE WHICH IS USED CHECK IF ANY OF THE CONDITIONALS IN THE TERNARY ARE TRUE. IF NONE ARE TRUE THEN TYPE GETS A VALUE OF 'TO DO'. IN SHORT THIS TERNARY IS AN IF/ELSE IF/ELSE CHECK.
      let type = (props.info.type== 'To do')? 'In progress' : (props.info.type=='In progress') ? 'Done' : 'To do'
      //PROPS.INFO.TYPE AND PROPS.INFO.ID COME FROM THE PARENT COMPONENT. I KNOW TO SAY PROPS.INFO BECAUSE THAT IS WHAT I CALLED THE ATTRIBUTE WHEN I CALLED THE GETTASK COMPONENT IN THE PARENT COMPONENT. I.E <GetTask key={index} info={item} fetchTasks={fetchTasks} token={props.token}/>). YOU CAN SEE FROM THE EXAMPLE THAT I ALSO PASSED IN PROPS.KEY, PROPS.FETCHTASKS AND PROPS.TOKEN TO THIS CHILD COMPONENT. 
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

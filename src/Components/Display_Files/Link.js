import React from 'react'

const Link = (props) =>{
    
    return(
    <>
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
    </>
    )
}

export default Link
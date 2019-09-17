import React from 'react'
import {
    Route,
    Link,
    Switch
} from 'react-router-dom'


const Sidebar = () =>{
    
    return(
        <div className='sidebar'>
            <div className='sidebar-list-unstyled'>
               <ul className='sidebar-list list-unstyled'>
                   <li><Link to='/hotlinks'>Hot Links</Link></li>
               </ul>
            </div>
            <div className='sidebar-route'>
                <Switch>
                    <Route exact path='/hotlinks'></Route>                    
                </Switch>
            </div>
        </div>
    )   
}

export default Sidebar
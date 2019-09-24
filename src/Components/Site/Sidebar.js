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
                   <li><Link to='/timesheet'>Time Sheet</Link></li>
               </ul>
            </div>
            <div className='sidebar-route'>
                <Switch>
                    <Route exact path='/hotlinks'></Route>
                    <Route exact path='/timesheet'></Route>
                </Switch>
            </div>
        </div>
    )   
}

export default Sidebar
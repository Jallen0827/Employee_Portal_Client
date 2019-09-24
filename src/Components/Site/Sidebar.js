import React from 'react'
import {
    Route,
    Link,
    Switch
} from 'react-router-dom'
import Hotlinks from '../Display_Files/hotLinks'
import TimeSheet from '../TimeSheet/timesheet'


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
                    <Route exact path='/hotlinks'><Hotlinks/></Route>
                    <Route exact path='/timesheet'><TimeSheet/></Route>
                </Switch>
            </div>
        </div>
    )   
}

export default Sidebar
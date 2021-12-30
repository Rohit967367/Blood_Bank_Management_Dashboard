import React from 'react'
import './sidebar.css'
// import { LineStyle } from '@material-ui/icons'
// import { HomeIcon, ListAltIcon, ListIcon, RequestPage } from '@mui/icons-material';
// import n from '@mui/icons-material/RequestPage';
// import  from '@mui/icons-material/FeaturedPlayList';
// import  from '@mui/icons-material/ListAlt';
import { NavLink } from 'react-router-dom'
// import { ListItemIcon } from '@mui/material';


const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebarcontainer">
                <h3 className="sidebartitle">Dashboard</h3>
                <div className="sidebarlist">
                    <ul className="menu">
                        <li className="menuList">
                            <NavLink activeClassName='menuL' exact to='/'>
                                {/* <LineStyle className='sidebaricon' /> */}
                                {/* <HomeIcon /> */}
                                Home
                            </NavLink>
                        </li>

                        <li className="menuList">
                            <NavLink activeClassName='menuL' to='/User'>
                                {/* <LineStyle className='sidebaricon' /> */}
                                {/* <ListAltIcon /> */}
                                Doner Page
                            </NavLink>
                        </li>
                        <li className="menuList">
                            <NavLink activeClassName='menuL' to='/Request'>
                                Request
                            </NavLink>
                        </li>
                        <li className="menuList">
                            <NavLink activeClassName='menuL' to='/BloodStock'>
                                {/* <LineStyle className='sidebaricon' /> */}
                                Blood Stock
                            </NavLink>
                        </li>
                        <li className="menuList">
                            {/* <NavLink activeClassName='sidebarStyle' to='/Register'> */}
                            <NavLink activeClassName='menuL' to='/Register'>
                                {/* <LineStyle className='sidebaricon' /> */}
                                {/* <ListItemIcon/> */}
                                Register
                            </NavLink>
                        </li>
                        <li className="menuList">
                            {/* <NavLink activeClassName='sidebarStyle' to='/AppointmentList'> */}
                            <NavLink activeClassName='menuL' to='/AppointmentList'>
                                {/* <RequestPage /> */}
                                Appointment
                                {/* <LineStyle className='sidebaricon' /> */}
                            </NavLink>
                        </li>
                        <li className="menuList">
                            <NavLink activeClassName='menuL' to='/Email'>
                                Email
                            </NavLink>
                        </li>
                        
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Sidebar

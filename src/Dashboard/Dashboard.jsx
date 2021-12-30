import React, { useContext } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Toolkid from './Toolkid/Toolkid'
import './Dashboard.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import DonorList from '../Page/DonorPage/DonorList'
import DashboardHomePage from '../Page/DashboardHomePage'
import Register from '../Page/Register/Register'
import AppointmeneList from '../Page/AppointmentList/AppointmeneList'
import Email from '../Page/Email/Email'
import Request from '../Page/Request/Request'
import Login from '../Page/Login/Login'
import { AuthContext } from '../Context/AuthContext'
import BloodStock from '../Page/BloodStock/Receive'


const Dashboard = () => {
    let {user} = useContext(AuthContext);
    return (
        <Router>
            <Switch>
                <Route path='/login'>
                    {!user ?
                        <Login /> : <Redirect to="/" />
                    }
                </Route>
                {user ?
                    <>
                        <Toolkid />
                        <div className="containerSidebar">
                            <Sidebar />
                            <Route exact path='/'>
                                <DashboardHomePage />
                            </Route>
                            <Route path='/User'>
                                <DonorList />
                            </Route>

                            {/* forBloodStock */}
                            <Route path='/BloodStock'>
                                <BloodStock />
                            </Route>
                            <Route path='/Register'>
                                <Register />
                            </Route>
                            <Route path='/AppointmentList'>
                                <AppointmeneList />
                            </Route>
                            <Route path='/Email'>
                                <Email />
                            </Route>
                            <Route path='/Request'>
                                <Request />
                            </Route>
                        </div>
                    </>
                    : <Redirect to="/login" />
                }
            </Switch>
        </Router>
    )
}

export default Dashboard

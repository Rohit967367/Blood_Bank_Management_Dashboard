import React, { useContext } from 'react'
// import { Button } from '@material-ui/core'
import './Toolkid.css';
import logo from '../../Picture/logo.png'
import admin from '../../Picture/R (2).jpg'
import { logOut } from '../../Context/AuthAction';
import { AuthContext } from '../../Context/AuthContext';

const Toolkid = () => {
    const { dispatch } = useContext(AuthContext);
    return (
        <div className="toolkid">
            <div className='toolkidContainer'>
                <div className='topLeft'>
                    <span className='logo'>
                        <img src={logo} alt="logo" />
                    </span>
                </div>
                <div className='rightToolkid'>
                    <div className="topbarIcon">
                        <button onClick={() => dispatch(logOut())}>
                            <img src={admin} alt={admin} />
                        </button>
                    </div>
                </div>
                {/* <Button variant="contained" color="primary">button</Button> */}
            </div>
        </div>
    )
}

export default Toolkid;
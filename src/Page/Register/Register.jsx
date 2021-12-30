
import React from 'react'
import './Register.css'
import Registertable from './Registertable'
// import { PersonAddIcon } from '@mui/icons-material';

const Register = () => {
    
    return (
        <div className='register'>
            <div className="registerHeading">
                <div className="leftHeading">
                    Register List
                </div>
                <div className="rightHeading">
                    
                </div>
            </div>
            <Registertable/>
        </div>
    )
}

export default Register

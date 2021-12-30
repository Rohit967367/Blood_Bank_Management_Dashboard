import React from 'react'
import Model from '../../Dashboard/Model'
import './RegisterFormAdd.css'

const RegisterFormAdd = ({ onClose }) => {
    return (
        <Model onClose={onClose}>
            <form className="registerFromAddForm">
                <div className='registerFormAdd'>
                    <div className="registerFormLeft">
                        <div className="reisterFormAddInput">
                            <label htmlFor="firstN">First Name</label>
                            <input type="text" />
                        </div>
                        <div className="reisterFormAddInput">
                            <label htmlFor="LastN">last Name</label>
                            <input type="text" />
                        </div>
                        <div className="reisterFormAddInput">
                            <label htmlFor="Email">Email Id</label>
                            <input type="email" />
                        </div>
                    </div>
                    <div className="registerFormRight">

                        <div className="reisterFormAddInput">
                            <label htmlFor="phoneN">Phone Number</label>
                            <input type="text" />
                        </div>
                        <div className="reisterFormAddInput">
                            <label htmlFor="password">Passworde</label>
                            <input type="text" />
                        </div>
                        <div className="reisterFormAddInput">
                            <label htmlFor="password">Confirm Password</label>
                            <input type="text" />
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                    <button onClick={onClose}>Cancel</button>

                </div>
            </form>
        </Model>
    )
}

export default RegisterFormAdd

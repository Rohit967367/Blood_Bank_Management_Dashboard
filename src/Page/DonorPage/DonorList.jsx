import { PersonAdd } from '@material-ui/icons';
import React, { useState } from 'react'
import DonorForm from './DonorForm';
import './DonorList.css';
import { Button } from '@material-ui/core';
import DonorTable from './DonorTable';
// import Dummy from './Dummy';

const DonorList = () => {
    const [donorForm, setDonorForm] = useState(false);
    let showDonorForm = () => {
        setDonorForm(true);
    }
    let hideDonorForm = () => {
        setDonorForm(false);
    }
    // let [dataa, setData] = useState([]);
    // let DonorData = (firstName) => {
    //     setData((prevData) => {
    //         return [...prevData, {
    //             // userName:userName, 
    //             // lastName:lastName,
    //             firstName: firstName,
    //         }]
    //     })
    // }
    return (
        
        <div className='user'>
            <div className="userList">
                <div className="userListLeft">
                    Donor List
                </div>
                <div className="userListRight">
                    <Button onClick={showDonorForm} variant="contained" >
                        <PersonAdd />
                        <h3>Add Donor</h3>
                    </Button>
                </div>
            </div>
            {donorForm && <DonorForm onClose={hideDonorForm} />}
            <DonorTable  />
        </div>
    )
}

export default DonorList

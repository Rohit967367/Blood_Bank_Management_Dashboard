import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './DashboardHomePage.css';
// import a from '../Picture/P (2).png'
import { DataGrid } from '@mui/x-data-grid'


const DashboardHomePage = () => {

    const columns = [
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 198 },
    ];

    const column = [
        { field: 'firstName', headerName: 'First Name', width: 120 },
        { field: 'componentName', headerName: 'Componenet Name', width: 220 },
        { field: 'price', headerName: 'Price', width: 100 },
    ];

    /////RegisterList
    const [bloodList, setBloodList] = useState([]);
    const GetRegister = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/api/users/list?new=true`, {
                headers: { token: "Bearer " + JSON.parse(localStorage.getItem("isAdmin")).accessToken },
            })
            setBloodList(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    /////RequestList
    const [request, setRequestList] = useState([]);
    const GetUnit = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/api/rForm?new=true`, {
                headers: { token: "Bearer " + JSON.parse(localStorage.getItem("isAdmin")).accessToken },
            })
            setRequestList(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    /////TotalRequest
    const [totalRequest, setTotalRequest] = useState([]);
    const TotalRequest = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/api/rForm`, {
                headers: { token: "Bearer " + JSON.parse(localStorage.getItem("isAdmin")).accessToken },
            })
            setTotalRequest(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const [appoint, setApponit] = useState([])
    const getTotalApponitment = async () => {
        try {
            const res = await axios.get("http://localhost:8800/api/dForm", {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("isAdmin")).accessToken
                }
            })
            setApponit(res.data)
        } catch (error) {
            window.alert(error)
        }
    }

    const [totalDonor, setTotalDonor] = useState([])
    const GetDonor = async () => {
        try {
            const res = await axios.get("http://localhost:8800/api/blood", {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("isAdmin")).accessToken
                },
            })
            setTotalDonor(res.data);
        } catch (error) {
            window.alert(error)
        }
    }

    useEffect(() => {
        GetRegister();
        GetUnit();
        TotalRequest();
        getTotalApponitment();
        GetDonor();
    }, [])

    // const calculateDate =()=> {
    //     const from = new Date(totalDonor.date);
    //     const to = new Date();
    //     const calculate = Math.abs(from - to)
    // }

    return (
        <div className='homepage'>
            {/* <h1>Home page</h1> */}
            <div className="headingCard">
                <div className="heading">
                    {/* <div className="imageCard">
                        <img src={a} alt={a} />
                    </div> */}
                    {/* <div className="total"> */}
                    <div className="count">
                        <h1>{bloodList.length}</h1>
                        {/* </div> */}
                    </div>
                    Registed
                </div>
                <div className="heading Req">
                    <div className="count">
                        <h1>{totalRequest.length}</h1>
                    </div>
                    Request Blood
                </div>
                <div className="heading donor">
                    <div className="count">
                        <h1>{totalDonor.length}</h1>
                    </div>
                    Donor
                </div>
                <div className="heading apponit">
                    <div className="count">
                        <h1>{appoint.length}</h1>
                    </div>
                    Appointment
                </div>
            </div>

            <div className="tableContainer">
                <div className="table">
                    <h5 style={{ textAlign: 'center' }}>New Register List</h5>
                    <div style={{ height: 370, width: 350 }}>
                        <DataGrid
                            rows={bloodList}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            getRowId={(e) => e._id}
                        />
                    </div>
                </div>
                <div className="table">
                    <h5 style={{ textAlign: 'center' }}>New Request List</h5>
                    <div style={{ height: 370, width: 450 }}>
                        <DataGrid
                            rows={request}
                            columns={column}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            getRowId={(e) => e._id}
                        />
                    </div>
                </div>
            </div>

        </div >
    )
}

export default DashboardHomePage;

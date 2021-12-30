import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Appointment.css'
// import { DataGrid } from '@mui/x-data-grid'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";




const AppointmeneList = () => {
    let columns = [
        { field: '_id', headerName: 'ID', Width: 100 },
        { field: 'firstName', headerName: 'First Name', Width: 100 },
        { field: 'adhaarNumber', headerName: 'Phone Number', Width: 100 },
        { field: 'phoneNumber', headerName: 'Phone Number', Width: 100 },
        { field: 'email', headerName: 'Email Id', Width: 300 },
        { field: 'age', headerName: 'Age', Width: 100 },
        { field: 'gender', headerName: 'Gender', Width: 100 },
        { field: 'occupation', headerName: 'Occupation', Width: 100 },
        { field: 'address', headerName: 'Address', Width: 100 },
        { field: 'pinCode', headerName: 'Pin Code', Width: 100 },
        { field: 'date', headerName: 'Date', Width: 100 },
    ]


    const [donor, setDonor] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPer, setRowsPer] = useState(10);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPer(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const getDonor = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/dForm", {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("isAdmin")).accessToken
                    }
                })
                setDonor(res.data)
            } catch (error) {
                window.alert(error)
            }
        }

        getDonor();
    }, [])

    return (
        <div className='appointment'>
            {/* <DataGrid
                rows={donor}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(e) => e._id}
                checkboxSelection
            /> */}

<Paper sx={{ width: '100%', overflow: 'hidden' }} >
                <TableContainer sx={{ maxHeight: 440 }} >
                    <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableCell
                                        key={col.field}
                                        align="center"
                                        style={{ minWidth: col.width }}
                                    >
                                        {col.headerName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {donor
                            .slice(page * rowsPer, page * rowsPer + rowsPer)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((col) => {
                                            const value = row[col.field];
                                            return (
                                                <TableCell key={col.field} align="center">
                                                    {value}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={donor.length}
                    rowsPerPage={rowsPer}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}

export default AppointmeneList

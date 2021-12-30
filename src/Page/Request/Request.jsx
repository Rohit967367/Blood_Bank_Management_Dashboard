import "./Request.css"
import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";

const Request = () => {
    let [received, setReceived] = useState([]);


    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'firstName', headerName: 'First Name', width: 100 },
        { field: 'patientName', headerName: 'Patient Name', width: 100 },
        { field: 'refeName', headerName: 'Refe Name', width: 100 },
        { field: 'componentName', headerName: 'Component Name', width: 150 },
        { field: 'unit', headerName: 'unit', width: 90 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'adhaarNumber', headerName: 'Adhaar Card', width: 150 },
        { field: 'hospitalName', headerName: 'Hospital Name', width: 170 },
        { field: 'phoneNumber', headerName: 'Phone No.', width: 150 },
        { field: 'address', headerName: 'Address', width: 350 },
        { field: 'pinCode', headerName: 'Pin Code', width: 150 },
        { field: 'age', headerName: 'Age', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 150 },
        { field: 'consultantName', headerName: 'Consultant Name', width: 150 },
        { field: 'hospitalNumber', headerName: 'Hospital Number', width: 150 },
        { field: 'consultantNumber', headerName: 'Consultent Number', width: 150 },
        { field: 'bloodG', headerName: 'Blood Name', width: 150 },
        { field: 'price', headerName: 'price', width: 150 },
        { field: 'refeAdhaar', headerName: 'Refe Adhaar', width: 150 },
        { field: 'refeRelation', headerName: 'Refe Relation', width: 150 },
        { field: 'refePhone', headerName: 'Refe Phone NO.', width: 150 },
    ];


    const [page, setPage] = useState(0);
    const [rowsPer, setRowsPer] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPer(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const getReceived = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/rForm", {
                    headers: { token: "Bearer " + JSON.parse(localStorage.getItem("isAdmin")).accessToken },
                })
                setReceived(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getReceived()
    }, [])


    return (
        <div className="request">
            {/* <div style={{ height: 500, width: '70%' }}>
                <DataGrid
                    rows={received}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(e) => e._id}
                    checkboxSelection
                />
            </div> */}
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
                            {received
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
                    count={received.length}
                    rowsPerPage={rowsPer}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>

    )
}





export default Request

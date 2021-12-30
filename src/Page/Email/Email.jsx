// import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Email.css"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";


const Email = () => {

    const columns = [
        { field: '_id', headerName: 'ID', width: 50 },
        { field: 'fullName', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phoneNumber', headerName: 'Phone No.', width: 100 },
        { field: 'subject', headerName: 'Subject', width: 450, innerHeight: 50 },
    ]

    const [contact, setContact] = useState([]);
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
        const getContact = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/cForm", {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("isAdmin")).accessToken
                    }
                })
                setContact(res.data);
            } catch (error) {
                console.log(error);
                window.alert(error);
            }
        }
        getContact()
    }, [])

    return (
        <div className="email">
            {/* <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={contact}
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
                            {contact
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
                    count={contact.length}
                    rowsPerPage={rowsPer}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}

export default Email

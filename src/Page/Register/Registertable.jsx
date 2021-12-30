import React, { useEffect, useState } from 'react'
// import { DataGrid } from '@mui/x-data-grid'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";

import axios from "axios";


const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'phoneNumber', headerName: 'Phone No.', width: 150 },
    // { field: 'isAdmin', headerName: 'Admin',  width: 150 },
];


const Registertable = () => {

    const [register, setRegister] = useState([]);


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
        const getRegisterList = async () => {

            try {
                const req = await axios.get("http://localhost:8800/api/users/list", {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("isAdmin")).accessToken
                    },
                });
                setRegister(req.data);
            } catch (error) {
                console.log(error);
            }
        }

        getRegisterList();
    }, []);

    return (
        // <div style={{ height: 500, width: '100%' }}>
        //     <DataGrid
        //         rows={register}
        //         columns={columns}
        //         pageSize={5}
        //         rowsPerPageOptions={[5]}
        //         getRowId={(e) => e._id}
        //     />
        // </div>
        <>
        
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
                            {register
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
                    count={register.length}
                    rowsPerPage={rowsPer}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </>
    )
}

export default Registertable

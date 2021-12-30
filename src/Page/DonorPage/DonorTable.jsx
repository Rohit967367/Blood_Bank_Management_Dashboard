import React, { useEffect, useState } from 'react'
// import { DataGrid } from '@mui/x-data-grid'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import axios from 'axios';



const DonorTable = () => {

const columns = [
    // { field: '_id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'DOB', headerName: 'Date', width: 150 },
    { field: 'adhaarNumber', headerName: 'Adhaar No.', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'componentName', headerName: 'Component Name', width: 200 },
    { field: 'unit', headerName: 'Unit', width: 150 },
    { field: 'address', headerName: 'Address', width: 350 },
    { field: 'pinCode', headerName: 'Pin Code', width: 150 },
]

const [forDonor, setForDonor] = useState([]);



const [page, setPage] = useState(0);
const [rowsPer, setRowsPer] = useState(10);

const handleChangePage = (event ,newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPer(+event.target.value);
    setPage(0);
};

useEffect(() => {
    const getForDonor = async () => {
        try {
            const res = await axios.get("http://localhost:8800/api/blood", {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("isAdmin")).accessToken
                }
            })
            setForDonor(res.data);
        } catch (error) {
            window.alert(error);
        }
    }

    getForDonor();
}, [])



    return (
        <div>
            {/* <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={forDonor}
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
                            {forDonor
                            .slice(page * rowsPer, page * rowsPer + rowsPer)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
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
                    count={forDonor.length}
                    rowsPerPage={rowsPer}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}

export default DonorTable

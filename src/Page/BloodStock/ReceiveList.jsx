import axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
// import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { BloodStockForm } from './BloodStockForm';
import './ReceiveList.css';

const ReceiveList = () => {
    let [received, setReceived] = useState([])


    const columns = [
        // { field: '_id', headerName: 'ID', width: 50 },
        { field: 'bloodName', headerName: 'Blood Name', width: 100 },
        { field: 'rh', headerName: 'RH', width: 100 },
        { field: 'componentName', headerName: 'Patient Name', width: 100 },
        { field: 'unit', headerName: 'Unit', width: 50 },
        { field: 'price', headerName: 'Email', width: 120 },
    ];


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    useEffect(() => {
        const getReceived = async () => {
            try {
                // const res = await axios.get("http://localhost:8800/api/bloodStock/find", {
                    const res = await axios.get("http://localhost:8800/api/bloodStock/BloodList", {
                    headers: { token: "Bearer " + JSON.parse(localStorage.getItem("isAdmin")).accessToken },
                })
                setReceived(res.data.reverse());
            } catch (error) {
                console.log(error);
            }
        }
        getReceived()
    }, [])

    const [openForm, setForm] = useState(false);
    const forForm = () => {
        setForm(true);
    }
    const forClose = () => {
        setForm(false)
    }
    return (
        <div className="request">
            {openForm && <BloodStockForm onClose={forClose} />}
            <div className="request1">
                <div className="Bloodheading">
                    <h2>Blood Stock List</h2>
                </div>
                <div className="bloodButton">
                    <Button onClick={forForm}>Add Blood</Button>
                </div>
            </div>
            <div className="request2">
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.field}
                                            align="center"
                                            style={{ minWidth: column.width }}
                                        >
                                            {column.field}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {received
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                {columns.map((column) => {
                                                    const value = row[column.field];
                                                    return (
                                                        <TableCell key={column.field} align="center">
                                                            {value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={received.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    )
}

export default ReceiveList

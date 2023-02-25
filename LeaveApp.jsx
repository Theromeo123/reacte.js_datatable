import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import  Typography  from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../Firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Modal from '@mui/material/Modal';
//import Add from './Add'
import Edit from './Edit'
import { useAppStore } from '../../appStore';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LeaveApp() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "Product");
  const [open, setOpen] = useState(false);
  const [formid, setFormid]=useState("")
  const [editopen , setEditOpen] = useState(false);
  //const handleOpen = () => setOpen(true);
  const handleEditOpen =() =>setEditOpen(true);
  //const handleClose =() => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const setRows = useAppStore((state) => state.setRows);
  const rows = useAppStore ((state) => state.rows);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  }

  const deleteApi = async (id) => {
    const userDoc = doc(db, "Product", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };



  const editData=(id,code,name,type,from,to,reason, status)=>{
    const data ={
      id:id,
      name:name,
      code:code,
      type:type,
      from:from,
      to:to,
      reason:reason,
      status:status

    };
    setFormid(data);
    handleEditOpen();
  };

  return (
    <>
    <div>
    <Modal
      open={editopen}
      //onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Edit closeEvent={handleEditClose} fid={formid}/>
      </Box>
    </Modal>
  </div>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Employee Leave Application Details
          </Typography>
          <Divider />
         
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                
                <TableCell align="center"style={{ minWidth: "100px" }} >
                  Employee Code
                </TableCell>
                <TableCell align="center"style={{ minWidth: "100px" }} >
                  Name 
                </TableCell>
                <TableCell align="center"style={{ minWidth: "100px" }} >
                Leave Type
                </TableCell>
                <TableCell align="center"style={{ minWidth: "100px" }} >
                  From Date
                </TableCell>
                <TableCell align="center"style={{ minWidth: "100px" }} >
                  To Date
                </TableCell>
                <TableCell align="center"style={{ minWidth: "100px" }} >
                  ReasonForLeave
                </TableCell>
                <TableCell align="center"style={{ minWidth: "100px" }} >
                  Status
                </TableCell>
                <TableCell align="left"style={{ minWidth: "100px" }} >
                  Action
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} >

                        <TableCell key={row.id} align="center">
                         {row.code}
                        </TableCell>
                        <TableCell key={row.id} align="center">
                         {row.name}
                        </TableCell>
                        <TableCell key={row.id} align="center">
                         {row.type}
                        </TableCell>
                        <TableCell key={row.id} align="center">
                         {row.from}
                        </TableCell>
                        <TableCell key={row.id} align="center">
                         {row.to}
                        </TableCell>
                        <TableCell key={row.id} align="center">
                         {row.reason}
                        </TableCell>
                        <TableCell key={row.id} align="center">
                         {row.status}
                        </TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              // onClick={() => editUser(row.id)}
                              onClick={()=>{
                                editData(row.id, row.code, row.name, row.type, row.from, row.to, row.reason, row.status);
                              }}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}
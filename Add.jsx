import { Typography, Box, Button } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// import MenuItem from '@mui/material/MenuItem';
import { addDoc,collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase-config';
import Swal from "sweetalert2";
import { useAppStore } from '../../appStore';


export default function Add({closeEvent}) {
const[salary, setSalary]=useState("");
const[bank, setBank]=useState("");
const[account, setAccount]=useState("");
const[holder, setHolder]=useState("");
const[ifsc, setIfsc]=useState("");
const[tax, setTax]=useState("");
//const[rows, setRows] = useState([]);
const setRows = useAppStore ((state) => state.setRows);
const empCollectionRef = collection(db, "Product");


const handleSalaryChange=(event)=>{
    setSalary(event.target.value);
};
const handleBankChange=(event)=>{
    setBank(event.target.value);
};
const handleAccountChange=(event)=>{
    setAccount(event.target.value);
};
const handleHolderChange=(event)=>{
    setHolder(event.target.value);
};
const handleIfscChange=(event)=>{
    setIfsc(event.target.value);
};
const handleTaxChange=(event)=>{
    setTax(event.target.value);
};
 const createUser = async()=>{
    await addDoc(empCollectionRef,{
          salary:Number(salary),
          bank:bank,
          account: account,
          holder:holder,
          ifsc:ifsc,
          tax:tax,     
    });
    getUsers();
    closeEvent();
    Swal.fire("Submitted!", "Your file has been submitted.", "success")
    
 };
 const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <>
    <Box sx={{m:2}}/>
    <Typography variant='h5' align='center'>
        Add Salary
    </Typography>
    <IconButton
    style={{position:"absolute", top:"0", right:"0"}}
      onClick={closeEvent}
    >
        <CloseIcon/>
    </IconButton>
    <Box height={20}/>
    <Grid container spacing={2}>
     <Grid item xs={12}>
     <TextField 
     id="outlined-basic"
     label=" Salary" 
     variant="outlined"
     type="number"
     size='small' 
     onChange={handleSalaryChange}
     value={salary}
     sx={{ minWidth:"100%"}} />
     </Grid>

     <Grid item xs={12}>
     <TextField 
     id="outlined-basic" 
     label="Bank Name" 
     variant="outlined"  
     size='small' 
     onChange={handleBankChange}
     value={bank}
     sx={{ minWidth:"100%"}} />
     </Grid>

     <Grid item xs={12}>
     <TextField 
     id="outlined-basic" 
     label="AccountNo" 
     variant="outlined"  
     type="number"
     size='small'
     onChange={handleAccountChange}
     value={account} 
     sx={{ minWidth:"100%"}} />
     </Grid>

     <Grid item xs={12}>
     <TextField 
     id="outlined-basic" 
     label="Account Holder Name" 
     variant="outlined"  
     size='small'
     onChange={handleHolderChange}
     value={holder} 
     sx={{ minWidth:"100%"}} />
     </Grid>

     <Grid item xs={12}>
     <TextField 
     id="outlined-basic" 
     label="IFSC Code" 
     variant="outlined"  
     size='small'
     onChange={handleIfscChange}
     value={ifsc} 
     sx={{ minWidth:"100%"}} />
     </Grid>

     <Grid item xs={12}>
     <TextField 
     id="outlined-basic" 
     label="Tax Deducation" 
     variant="outlined"  
     size='small'
     onChange={handleTaxChange}
     value={tax} 
     sx={{ minWidth:"100%"}}
    />
     </Grid>
    
     <Grid item xs={12}>
        <Typography variant='h5' align='center'>
            <Button variant='contained' onClick={createUser}>
                Submit
            </Button>
        </Typography>

     </Grid>
    </Grid>
     <Box sx={{ mt:4}}/>
    </>
  );
}

import { Typography, Box, Button } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// import MenuItem from '@mui/material/MenuItem';
import { collection, updateDoc, getDocs, doc, get} from 'firebase/firestore';
import { db } from '../../Firebase-config';
import Swal from "sweetalert2";
import { useAppStore } from '../../appStore';

export default function Edit({ fid, closeEvent}) {
const[code, setCode]=useState("");
const[name, setName]=useState("");
const[type, setType]=useState("");
const[from, setFrom]=useState("");
const[to, setTo]=useState("");
const[reason, setReason]=useState("");
const[status, setStatus]=useState("");
const setRows = useAppStore ((state) => state.setRows);
const empCollectionRef = collection(db, "Product");


useEffect(() =>{
    console.log("FID:"+ fid.id);
    setCode(fid.code);
    setName(fid.name);
    setType(fid.type);
    setFrom(fid.from);
    setTo(fid.to);
    setReason(fid.reason);
    setStatus(fid.status);
},[]);

const handleCodeChange=(event)=>{
    setCode(event.target.value);
};
const handleNameChange=(event)=>{
    setName(event.target.value);
};
const handleTypeChange=(event)=>{
    setType(event.target.value);
};
const handleFromChange=(event)=>{
    setFrom(event.target.value);
};
const handleToChange=(event)=>{
    setTo(event.target.value);
};
const handleReasonChange=(event)=>{
    setReason(event.target.value);
};
const handleStatusChange=(event)=>{
    setStatus(event.target.value);
};
 const createUser = async()=>{
   const userDoc = doc(db, "Product", fid.id);
   const newFields={
         
          code:Number(code),
          name:name,
          type:type,
          from:from,
          to:to,
          reason:reason,
          status:status   
    };
    await updateDoc(userDoc, newFields);
    getUsers();
    closeEvent();
    Swal.fire("Submitted!", "Your file has been updated", "success")
    
 };
 const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <>
    <Box sx={{m:2}}/>
    <Typography variant='h5' align='center'>
        Leave Application
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
     label=" Employee Code" 
     variant="outlined"
     type="number"
     size='small' 
     onChange={handleCodeChange}
     value={code}
     sx={{ minWidth:"100%"}} />
     </Grid>

     <Grid item xs={12}>
     <TextField 
     id="outlined-basic" 
     label="Name" 
     variant="outlined"  
     size='small' 
     onChange={handleNameChange}
     value={name}
     sx={{ minWidth:"100%"}} />
     </Grid>

     <Grid item xs={12}>
     <TextField 
     id="outlined-basic" 
     label="Leave Type" 
     variant="outlined"  
     type="number"
     size='small'
     onChange={handleTypeChange}
     value={type} 
     sx={{ minWidth:"100%"}} />
     </Grid>

     <Grid item xs={12}>
     <TextField 
     id="outlined-basic" 
     label="From Date" 
     variant="outlined"  
     size='small'
     onChange={handleFromChange}
     value={from} 
     sx={{ minWidth:"100%"}} />
     </Grid>

     <Grid item xs={12}>
     <TextField 
     id="outlined-basic" 
     label="To Date" 
     variant="outlined"  
     size='small'
     onChange={ handleToChange}
     value={to} 
     sx={{ minWidth:"100%"}} />
     </Grid>

     <Grid item xs={12}>
     <TextField 
     id="outlined-basic" 
     label="ReasonForLeave" 
     variant="outlined"  
     size='small'
     onChange={handleReasonChange}
     value={reason} 
     sx={{ minWidth:"100%"}}/>
     </Grid>
     <Grid item xs={12}>
     <TextField 
     id="outlined-basic" 
     label="Status" 
     variant="outlined"  
     size='small'
     onChange={handleStatusChange}
     value={status} 
     sx={{ minWidth:"100%"}}/>
     </Grid>
    
     <Grid item xs={12}>
        <Typography variant='h5' align='center'>
            <Button variant='contained' onClick={createUser}>
                Update
            </Button>
        </Typography>

     </Grid>
    </Grid>
     <Box sx={{ mt:4}}/>
    </>
  );
}

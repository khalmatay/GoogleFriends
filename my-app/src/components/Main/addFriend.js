import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import * as React from "react";

import Box from "@mui/joy/Box";

import Button from "@mui/material/Button";


const addFriend = () => {
    return( 

    <Box>
      <TextField id="filled-basic" label="введи Id друга"   size="verysmall"
        variant="filled" />
      
      <Button variant="outlined" endIcon={<SendIcon />}>Outlined</Button>
    </Box>    
    )
}
export default addFriend
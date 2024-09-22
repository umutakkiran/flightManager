import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

function CustomTextField() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" variant="standard" />
        </Box>
    )
}

export default CustomTextField
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

const primary = lightBlue[200];

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        minWidth: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        La página que busca no existe
      </Typography>
      <Button variant="contained" href='/'>Ir al inicio</Button>
    </Box>
  );
}

export default NotFound;
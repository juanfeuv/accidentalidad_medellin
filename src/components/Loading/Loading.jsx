import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import React from 'react';
import Typography from '@mui/material/Typography';

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

export default function KeepMountedModal({ open }) {
  return (
    <Modal
      keepMounted
      open={open}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          Cargando...
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          Por favor espere! El sistema esta procesando los datos del cluster
        </Typography>
        <div style={{ textAlign: 'center' }}>
          <img src="/accidente_animation.gif" width={150} alt="GIF accident" />
        </div>
      </Box>
    </Modal>
  );
}

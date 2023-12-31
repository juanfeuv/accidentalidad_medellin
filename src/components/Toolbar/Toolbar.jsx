import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Outlet } from 'react-router-dom';

import Instrucciones from '../../screens/Home/Instrucciones';

const TOOLTIP_CONTENT = (
  <ul>
    <li>Cristian Jaramillo Herrera</li>
    <li>Danilo Giraldo Lopez</li>
    <li>Juan Felipe Usuga Villegas</li>
    <li>Maria Camila Durango Muñoz</li>
</ul>
);

function DrawerAppBar() {
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <img src='/accident.png' alt='imagen-de-accidente' width={50} height={50}/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Accidentalidad en Medellin
            </Typography>
            <Button color="inherit" onClick={() => setTour(true)}>Instrucciones de uso</Button>
            <Button color="inherit" href="https://github.com/juanfeuv/accidentalidad_medellin" target="_blank" rel="noreferrer">Repositorio</Button>
            <Button color="inherit" href="./informe.html" target="_blank" rel="noreferrer">Reporte</Button>
            <Button color="inherit" href="https://www.youtube.com/watch?v=t9REbvpDm30" target="_blank" rel="noreferrer">Video</Button>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <div>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={handleTooltipClose}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={TOOLTIP_CONTENT}
                >
                  <Button onClick={handleTooltipOpen} color="inherit">Integrantes</Button>
                </Tooltip>
              </div>
            </ClickAwayListener>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ padding: '10px' }}>
        <Outlet />
      </div>
      <Instrucciones open={tour} handleClose={() => setTour(false)} />
    </>
  );
}

export default DrawerAppBar;

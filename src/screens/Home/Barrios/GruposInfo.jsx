import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React from "react";
import Typography from '@mui/material/Typography';

import SideModal from '../../../components/SideModal';

const GruposInfo = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  return (
    <SideModal open={open} setOpen={setOpen} anchor='left'>
      <div style={{ padding: '20px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Detalles del Agrupamiento
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h5>Grupo 1: Alto Índice de Accidentalidad (encima del 66.66% de accidentes esperados por barrio)</h5>
            <ul>
              <li><b>Frecuencia de accidentes:</b> Alta</li>
              <li><b>Color:</b> <span style={{ backgroundColor: '#FF342D' }}>Red</span></li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <h5>Grupo 2: Índice de Accidentalidad Medio (por debajo del 66.66% y encima del 33.33% de accidentes esperados por barrio)</h5>
            <ul>
              <li><b>Frecuencia de accidentes:</b> Media</li>
              <li><b>Color:</b> <span style={{ backgroundColor: '#FC9738' }}>Orange</span></li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <h5>Grupo 3: Bajo Índice de Accidentalidad (por debajo del 33.33% de accidentes esperados por barrio)</h5>
            <ul>
              <li><b>Frecuencia de accidentes:</b> Baja</li>
              <li><b>Color:</b> <span style={{ backgroundColor: '#17D401' }}>Green</span></li>
            </ul>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
            >
              Cerrar
            </Button>
          </Grid>
        </Grid>
      </div>
    </SideModal>
  );
};

GruposInfo.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default GruposInfo;
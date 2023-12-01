import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflowY: 'auto',
  height: 600, // Set the desired height
  border: '1px solid #ccc',
  padding: '10px',
};


const Instrucciones = ({ open, handleClose }) => {
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 1100, minHeight: 700 }}>
          <span style={{ float: 'right' }}>
            <IconButton disableRipple onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </span>
          <h2 id="parent-modal-title">Instrucciones de uso</h2>
          <p>Para usar el aplicativo se debe que conocer que se tienen dos funcionalidades principales, Prediccion de accidentes y agrupamiento de accidentes, los cuales se descripbiran a continuacion:</p>
          <h3>Prediccion</h3>
          <ol>
            <li>Para realizar la prediccion, primero debe dar click en el boton abrir filtros</li>
            <img src="/filtro_comunas_prediccion.png" width={800} alt="Filtro comunas" />
            <li>Posteriormente, una vez abierto el filtro selecciona los rangos de fechas sobre los que quieres filtrar y la clase de accidente</li>
            <img src="/filtro_prediccion.png" width={800} alt="Filtro prediccion" />
            <li>Una vez realizada la busqueda podras ver las comunas con el numero de accidentes asociado al rango de fechas y tipo de accidente</li>
            <img src="/resultado_comunas.png" width={800} alt="Resultado filtro" />
          </ol>
          <h3>Agrupamiento</h3>
          <ol>
            <li>Para realizar el agrupamiento por barrios, primero debe dar click panel de Agrupamiento por barrios</li>
            <img src="/panel_agrupamiento.png" width={800} alt="Filtro barrios panel" />
            <li>Posteriormente, selecciona el filtro para realizar la busqueda por agrupamiento</li>
            <img src="/filtro_barrios.png" width={800} alt="Filtro barrios" />
            <li>Posteriormente, una vez abierto el filtro selecciona los rangos de fechas sobre los que quieres filtrar y la clase de accidente</li>
            <img src="/filtro_agrupamiento.png" width={800} alt="Filtro agrupamientp" />
            <li>Una vez realizada la busqueda podras ver los barrios con el numero de accidentes asociado al rango de fechas y tipo de accidente</li>
            <img src="/resultado_barrios.png" width={800} alt="Filtro agrupamientp" />
          </ol>
        </Box>
      </Modal>
  );
};

export default Instrucciones;
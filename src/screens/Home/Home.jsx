import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import React, { useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Barrios from './Barrios/Barrios';
import Comunas from './Comunas/Comunas';
import Instrucciones from './Instrucciones';


const Home = () => {
  const [expanded, setExpanded] = useState(0);
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(panel);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Accordion expanded={expanded === 0} onChange={handleChange(0)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <OnlinePredictionIcon />
              <Typography>Predicción por comunas</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <span class="toto">
                    <span>No se preocupe si ve el mapa vacio, por favor aplique primero filtros:</span>
                  </span>
                  <IconButton disableRipple>
                    <ArrowRightAltIcon />
                  </IconButton>
                  <Tooltip title="Filtrar mapa">
                    <IconButton onClick={() => setOpen(true)} color="primary">
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              {expanded === 0 && <Comunas open={open} setOpen={setOpen} />}
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 1} onChange={handleChange(1)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <BatchPredictionIcon />
              <Typography>Agrupamiento por Barrios</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <span class="toto">
                    <span>No se preocupe si ve el mapa vacio, por favor aplique primero filtros:</span>
                  </span>
                  <IconButton disableRipple>
                    <ArrowRightAltIcon />
                  </IconButton>
                  <Tooltip title="Filtrar mapa">
                    <IconButton onClick={() => setOpen(true)} color="primary">
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              {expanded === 1 && <Barrios open={open} setOpen={setOpen} />}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <Instrucciones open={tour} handleClose={() => setTour(false)} />
    </div>
  );
}

export default Home;

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PublicIcon from '@mui/icons-material/Public';
import React, { useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Barrios from './Barrios/Barrios';
import Comunas from './Comunas/Comunas';

const Home = () => {
  const [expanded, setExpanded] = useState(0);
  const [open, setOpen] = useState(false);

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
              <PublicIcon />
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
              <LocationSearchingIcon />
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
    </div>
  );
}

export default Home;

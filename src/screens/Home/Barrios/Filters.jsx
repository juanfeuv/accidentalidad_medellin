import _ from 'lodash';

import { toast } from 'react-toastify';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import Select from 'react-select'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import SideModal from '../../../components/SideModal';
import getGravedades from './getGravedades';
import getAccidentes from '../Comunas/getAccidentes';

const DEFAULT_FORM = {
  fechaInicial: '2014-07-04',
  fechaFinal: '2020-12-31',
  clase: null,
};

const INITIAL_DATE = '2014-07-04';
const END_DATE = '2020-12-31';

const Filters = ({ open, setOpen, getRawAccidents }) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [accidentes, setAccidentes] = useState([]);
  const [gravedades, setGravedades] = useState([]);

  const handleClose = () => setOpen(false);

  const handlechange = (e) => {
    setForm({
      ...form,
      [e?.target?.name]: e?.target?.value,
    });
  };

  const changeSelect = (name) => value => handlechange({
    target: {
      name,
      value,
    }
  });

  const search = () => {
    getRawAccidents(form);
    toast.success('Filtro aplicado!');
    handleClose();
  };

  useEffect(() => {
    if (open) {
      setForm(DEFAULT_FORM);
    }
  }, [open]);

  useEffect(() => {
    setAccidentes(getAccidentes());
    setGravedades(getGravedades());
    // eslint-disable-next-line
  }, []);

  return (
    <SideModal open={open} setOpen={setOpen}>
      <div style={{ padding: '20px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Filtros de búsqueda
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
            <Typography gutterBottom>Fecha Inicial*</Typography>
            <TextField
              type="date"
              fullWidth
              name='fechaInicial'
              required
              onChange={handlechange}
              value={form?.fechaInicial}
              inputProps={{
                min: INITIAL_DATE,
                max: form?.fechaFinal
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Fecha Final*</Typography>
            <TextField
              type="date"
              fullWidth
              name='fechaFinal'
              required
              onChange={handlechange}
              value={form?.fechaFinal}
              inputProps={{
                min: form?.fechaInicial || INITIAL_DATE,
                MAX: END_DATE
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Clase de Accidente *</Typography>
            <Select
              name='clase'
              value={form?.clase}
              onChange={changeSelect('clase')}
              options={accidentes}
              required
            />
          </Grid>
          {/* <Grid item xs={12}>
            <Typography gutterBottom>Gravedad *</Typography>
            <Select
              name='gravedad'
              value={form?.gravedad}
              onChange={changeSelect('gravedad')}
              options={gravedades}
              required
            />
          </Grid> */}
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="success"
              onClick={search}
              disabled={_.isEmpty(form?.clase) || _.isEmpty(form?.fechaInicial) || _.isEmpty(form?.fechaFinal)}
            >
              Buscar
            </Button>
            &nbsp;
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </div>
    </SideModal>
  );
};

Filters.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  getRawAccidents: PropTypes.func.isRequired,
};

export default Filters;
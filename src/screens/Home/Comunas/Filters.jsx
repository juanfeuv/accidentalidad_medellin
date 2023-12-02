import _ from 'lodash';


import { toast } from 'react-toastify';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import Select from 'react-select'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import getAccidentes from './getAccidentes';
import SideModal from '../../../components/SideModal';

function getCurrentDateFormatted() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const INITIAL_DATE = '2014-07-04';

const DEFAULT_FORM = {
  clase: null,
  fechaInicial: getCurrentDateFormatted(),
  fechaFinal: getCurrentDateFormatted()
};

const Filters = ({ open, setOpen, getRawAccidents, setAccidentesPorDia, setTabla }) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [accidentes, setAccidentes] = useState([]);

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

  const search = async () => {
    const res = await getRawAccidents(form);

    const totalAccidentes = _.sumBy(res.prediction, item => item.properties.value);
    const rawAccidentesPorDia = res.rawDays.map(date => ({date: date.date,  value: _.sumBy(date.prediction, row => row.properties.value || 0) }));
    setAccidentesPorDia(rawAccidentesPorDia);
    setTabla(true);

    toast.success(`${totalAccidentes} accidentes proyectados en Medellín`);
    handleClose();
  };

  useEffect(() => {
    if (open) {
      setForm(DEFAULT_FORM);
    }
  }, [open]);

  useEffect(() => {
    setAccidentes(getAccidentes());
    // eslint-disable-next-line
  }, []);

  return (
    <SideModal open={open} setOpen={setOpen}>
      <div style={{ padding: '20px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Filtros para la predicción
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
                min: form?.fechaInicial || INITIAL_DATE
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Clase *</Typography>
            <Select
              name='clase'
              value={form?.clase}
              onChange={changeSelect('clase')}
              options={accidentes}
              required
            />
          </Grid>
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
  setAccidentesPorDia: PropTypes.func.isRequired,
  setTabla: PropTypes.func.isRequired,
};

export default Filters;
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

const INITIAL_DATE = '2014-07-04';

const DEFAULT_FORM = {
  clase: null,
  fecha: '',
};

const Filters = ({ open, setOpen, getRawAccidents }) => {
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

    const totalAccidentes = _.sumBy(res, item => item.properties.value);

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
          <Grid item xs={12}>
            <Typography gutterBottom>Fecha *</Typography>
            <TextField
              type="date"
              fullWidth
              name='fecha'
              required
              onChange={handlechange}
              value={form?.fecha}
              inputProps={{
                min: INITIAL_DATE
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
              disabled={_.isEmpty(form?.clase) || _.isEmpty(form?.fecha)}
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
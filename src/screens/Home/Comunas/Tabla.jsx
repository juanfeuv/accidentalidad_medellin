import React, { useState } from "react";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


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

const groupDataBy = (dataArray, groupBy) => {
  const groupedData = {};

  dataArray.forEach((item) => {
    const date = new Date(item.date);
    let key;

    switch (groupBy) {
      case 'days':
        key = date.toISOString().split('T')[0]; // Group by day
        break;
      case 'weeks':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay()); // Start of the week (Sunday)
        key = weekStart.toISOString().split('T')[0]; // Group by week
        break;
      case 'months':
        key = date.toISOString().split('-').slice(0, 2).join('-'); // Group by month
        break;
      default:
        throw new Error('Invalid groupBy parameter');
    }

    if (!groupedData[key]) {
      groupedData[key] = { dates: [], sum: 0 };
    }

    groupedData[key].dates.push(item.date);
    groupedData[key].sum += item.value;
  });

  return Object.values(groupedData);
};


const getDateInfo = (dateString) => {
  const date = new Date(dateString);

  const weekNumber = getWeekNumber(date);
  const monthNumber = date.getMonth() + 1; // Months are zero-based, so we add 1
  const yearNumber = date.getFullYear();

  return { weekNumber, monthNumber, yearNumber };
};

// Helper function to get the ISO week number of a date
const getWeekNumber = (date) => {
  const startOfWeek = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startOfWeek) / (24 * 60 * 60 * 1000)) + 1;
  return Math.ceil(days / 7);
};

const getNameFreq = (date, freq) => {
    // Example usage
    const dateInfo = getDateInfo(date);
    
    if (freq === 'months') {
      return `Mes ${dateInfo?.monthNumber}`;
    }

    if (freq === 'weeks') {
      return `Semana ${dateInfo?.weekNumber}`;
    }

    return `Dia ${date}`;
};


const Tabla = ({ open, handleClose, data }) => {
  const [frencuencia, setFrecuencia] = useState('days');

  const handleChange = (event) => {
    setFrecuencia(event.target.value);
  };

  const transformedData = groupDataBy(data, frencuencia);

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
          <h2 id="parent-modal-title">Tabla de frecuencia por tiempo (dia, semana o mes)</h2>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Frequencia</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleChange}
              value={frencuencia}
            >
              <FormControlLabel value="days" control={<Radio />} label="dias" />
              <FormControlLabel value="months" control={<Radio />} label="meses" />
              <FormControlLabel value="weeks" control={<Radio />} label="semanas" />
            </RadioGroup>
          </FormControl>
          <table border="1">
            <thead>
              <tr>
                <th>Frecuencia</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {transformedData.map((item, index) => (
                <tr key={String(index)}>
                  <td>{getNameFreq(item.dates[0], frencuencia)}</td>
                  <td>{item.sum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Modal>
  );
};

export default Tabla;
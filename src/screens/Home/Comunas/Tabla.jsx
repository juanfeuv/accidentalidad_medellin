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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';


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

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Frequencia',
  },
  {
    id: 'sum',
    numeric: true,
    disablePadding: false,
    label: 'Total accidentes',
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <b>{headCell.label}</b>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTable({ rows }) {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('sum');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.sum}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}


const groupAndSumByName = (dataArray) => {
  return dataArray.reduce((result, item) => {
    const { name, sum: value } = item;

    if (!result[name]) {
      result[name] = { name, sum: 0 };
    }

    result[name].sum += value;

    return result;
  }, {});
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

  const grouped = Object.values(groupedData).map(item => ({
    name: getNameFreq(item.dates[0], groupBy),
    sum: item.sum,
  }));

  return Object.values(groupAndSumByName(grouped));
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

const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1); // Months are zero-based, so subtract 1
  return date.toLocaleString('default', { month: 'long' });
};

const getNameFreq = (date, freq) => {
    // Example usage
    const dateInfo = getDateInfo(date);
    
    if (freq === 'months') {
      return `Mes ${getMonthName(dateInfo?.monthNumber)}`;
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
              <FormControlLabel value="weeks" control={<Radio />} label="semanas" />
              <FormControlLabel value="months" control={<Radio />} label="meses" />
            </RadioGroup>
          </FormControl>
          <EnhancedTable rows={transformedData}/>
        </Box>
      </Modal>
  );
};

export default Tabla;
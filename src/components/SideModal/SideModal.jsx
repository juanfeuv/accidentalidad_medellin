import Drawer from '@mui/material/Drawer';
import PropTypes from 'prop-types';
import React from 'react';

import './style.css';

const SideModal = ({ children, open, setOpen }) => {
  const handleClose = () => setOpen(false);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
    >
      <div className='sideModal'>
        {children}
      </div>
    </Drawer>
  );
};

SideModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default SideModal;
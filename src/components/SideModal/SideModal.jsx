import Drawer from '@mui/material/Drawer';
import PropTypes from 'prop-types';
import React from 'react';

import './style.css';

const SideModal = ({ children, open, setOpen, anchor="right" }) => {
  const handleClose = () => setOpen(false);

  return (
    <Drawer
      anchor={anchor}
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
  anchor: PropTypes.string
};

export default SideModal;
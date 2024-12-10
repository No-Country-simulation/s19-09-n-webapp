import React, { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
} from '@mui/material';
import RegisterProperty from '../../page/RegisterProperty'; // Asegúrate de que la ruta sea correcta

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const RegisterPropertyModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Registrar Propiedad</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <RegisterProperty /> 
        </Box>
      </Modal>
    </div>
  );
};

export default RegisterPropertyModal;
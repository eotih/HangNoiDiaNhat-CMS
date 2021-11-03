/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Input,
  Box,
  Modal,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
  Select,
  Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function AccountMoreMenu(AccountID) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };

  const Input = styled('input')({
    display: 'none'
  });
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            if (confirm('Are you sure you want to delete this account')) {
              console.log(AccountID);
            }
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={handleOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <Modal
          open={open}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            '& .MuiSelect-root': { m: 1, width: '10ch' }
          }}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Account
            </Typography>
            <TextField label="FullName" variant="outlined" />
            <TextField label="Phone" variant="outlined" />
            <TextField label="Email" variant="outlined" />
            <TextField label="Password" variant="outlined" />
            <TextField label="Address" variant="outlined" />
            <Select label="Role" variant="outlined" />
            <label htmlFor="contained-button-file">
              <Input
                id="contained-button-file"
                type="file"
                onChange={(e) => {
                  const { files } = e.target;
                  const reader = new FileReader();
                  reader.readAsDataURL(files[0]);
                  reader.onload = (e) => {};
                }}
              />
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
            <LoadingButton fullWidth size="large" type="submit" variant="contained">
              Edit Account
            </LoadingButton>
          </Box>
        </Modal>
      </Menu>
    </>
  );
}

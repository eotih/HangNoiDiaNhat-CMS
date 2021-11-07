/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash from '@iconify/icons-eva/trash-2-outline';
// import { useFormik, Form, FormikProvider } from 'formik';
// import InputAdornment from '@mui/material/InputAdornment';
import external from '@iconify/icons-eva/external-link-fill';
import { Link as RouterLink } from 'react-router-dom';
import pluscirclefill from '@iconify/icons-eva/plus-circle-fill';
import morehorizontalfill from '@iconify/icons-eva/more-horizontal-fill';
import axios from 'axios';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText
  //   Modal,
  //   Button,
  //   Typography,
  //   Box,
  //   TextField,
  //   Stack
} from '@mui/material';

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

export default function ProductMoreMenu(Product) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete')) {
      axios
        .delete(
          `${process.env.REACT_APP_WEB_API}Management/DeleteProduct?ProductID=${Product.ProductID}`
        )
        .then((res) => {
          if (res.data.Status === 'Deleted') {
            alert('Product deleted successfully');
            window.location.reload();
          } else {
            alert('Product not deleted');
          }
        });
    }
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={morehorizontalfill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box sx={style}>
                <Stack spacing={3}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit stock
                  </Typography>
                  <TextField
                    type="number"
                    {...getFieldProps('FullName')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+</InputAdornment>
                    }}
                    label="Stock"
                    variant="outlined"
                  />
                  <Button variant="contained" component={RouterLink}>
                    Edit Stock
                  </Button>
                </Stack>
              </Box>
            </Form>
          </FormikProvider>
        </Modal> */}
        <MenuItem onClick={handleOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={pluscirclefill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Stock" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to={`../products/detail/${Product.name}`}
          onClick={handleOpen}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={external} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Details" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Box,
  Modal,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  TextField,
  Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function ServiceMoreMenu(Payment) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [payment, setPayment] = useState([]);
  const handleClose = () => setOpen(false);
  const formik = useFormik({
    initialValues: {
      PaymentID: '',
      Name: ''
    },
    onSubmit: () => {
      axios
        .post(`${process.env.REACT_APP_WEB_API}Component/AddOrEditPayment`, {
          Name: formik.values.Name,
          PaymentID: formik.values.PaymentID
        })
        .then((res) => {
          if (res.data.Status === 'Updated') {
            alert('Payment Edited');
            window.location.reload();
          } else {
            alert('Edited Fail');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const { handleSubmit, getFieldProps } = formik;
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
  const handleOpen = () => {
    formik.setFieldValue('PaymentID', Payment.dulieu.PaymentID);
    formik.setFieldValue('Name', Payment.dulieu.Name);
    setOpen(true);
  };
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
            if (confirm('Are you sure you want to delete this account?')) {
              axios
                .delete(
                  `${process.env.REACT_APP_WEB_API}Component/DeletePayment?PaymentID=${Payment.dulieu.PaymentID}`
                )
                .then((res) => {
                  if (res.data.Status === 'Deleted') {
                    alert('Payment Deleted');
                    window.location.reload();
                  } else {
                    alert('Deleted Fail');
                  }
                });
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
            '& .MuiTextField-root': { m: 1, width: '25ch' }
          }}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box sx={style}>
                <Stack spacing={3}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Payment
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <TextField label="Name" {...getFieldProps('Name')} variant="outlined" />
                  </Stack>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Edit Payment
                  </LoadingButton>
                </Stack>
              </Box>
            </Form>
          </FormikProvider>
        </Modal>
      </Menu>
    </>
  );
}

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
  Input,
  Box,
  Modal,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  InputLabel,
  FormControl,
  ListItemText,
  Stack,
  Typography,
  TextField,
  Select,
  Button,
  Avatar
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { getAllShipper } from '../../../Functions/Delivery';

// ----------------------------------------------------------------------

export default function ShipperMoreMenu(Shipper) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState([]);
  const [shipper, setShipper] = useState([]);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getAllShipper().then((res) => {
      setShipper(res);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      ShipperID: '',
      FullName: '',
      Password: '',
      Phone: '',
      Email: '',
      BackSideFigure: '',
      FrontFigure: '',
      Address: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`${process.env.REACT_APP_WEB_API}Delivery/AddOrEditShipper`, {
          ShipperID: formik.values.ShipperID,
          FullName: formik.values.FullName,
          Password: formik.values.Password,
          Phone: formik.values.Phone,
          Email: formik.values.Email,
          BackSideFigure: formik.values.BackSideFigure,
          Address: formik.values.Address,
          FrontFigure: formik.values.FrontFigure
        })
        .then((res) => {
          if (res.data.Status === 'Updated') {
            alert('Shipper Edited');
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
  const handleChange = (event) => {
    setRole(event.target.value);
  };
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
    formik.setFieldValue('ShipperID', Shipper.dulieu.ShipperID);
    formik.setFieldValue('FullName', Shipper.dulieu.FullName);
    formik.setFieldValue('Phone', Shipper.dulieu.Phone);
    formik.setFieldValue('Email', Shipper.dulieu.Email);
    formik.setFieldValue('Password', Shipper.dulieu.Password);
    formik.setFieldValue('FrontFigure', Shipper.dulieu.FrontFigure);
    formik.setFieldValue('Address', Shipper.dulieu.Address);
    formik.setFieldValue('BackSideFigure', Shipper.dulieu.BackSideFigure);
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
            if (confirm('Are you sure you want to delete this Shipper?')) {
              axios
                .delete(
                  `${process.env.REACT_APP_WEB_API}Delivery/DeleteShipper?ShipperID=${Shipper.dulieu.ShipperID}`
                )
                .then((res) => {
                  if (res.data.Status === 'Deleted') {
                    alert('Shipper Deleted');
                    window.location.reload();
                  } else {
                    alert('Shipper Not Deleted');
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
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            '& .MuiSelect-root': { m: 1, width: '25ch' }
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
                    Add Shipper
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField label="FullName" {...getFieldProps('FullName')} variant="outlined" />
                    <TextField label="Phone" {...getFieldProps('Phone')} variant="outlined" />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField label="Email" {...getFieldProps('Email')} variant="outlined" />
                    <TextField label="Password" {...getFieldProps('Password')} variant="outlined" />
                    <TextField label="Address" {...getFieldProps('Address')} variant="outlined" />
                  </Stack>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    justifyContent="flex-end"
                  >
                    <Avatar src={formik.values.FrontFigure} sx={{ width: 50, height: 50 }} />
                    <label htmlFor="contained-button-file">
                      <Input
                        id="contained-button-file"
                        type="file"
                        onChange={(e) => {
                          const { files } = e.target;
                          const reader = new FileReader();
                          reader.readAsDataURL(files[0]);
                          reader.onload = (e) => {
                            formik.setFieldValue('FrontFigure', e.target.result);
                          };
                        }}
                      />
                      <Button variant="contained" component="span">
                        Upload FrontFigure
                      </Button>
                    </label>
                    <Avatar src={formik.values.BackSideFigure} sx={{ width: 50, height: 50 }} />
                    <label htmlFor="contained-button-file2">
                      <Input
                        id="contained-button-file2"
                        type="file"
                        onChange={(e) => {
                          const { files } = e.target;
                          const reader = new FileReader();
                          reader.readAsDataURL(files[0]);
                          reader.onload = (e) => {
                            formik.setFieldValue('BackSideFigure', e.target.result);
                          };
                        }}
                      />
                      <Button variant="contained" component="span">
                        Upload BackSideFigure
                      </Button>
                    </label>
                  </Stack>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Add Shipper
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

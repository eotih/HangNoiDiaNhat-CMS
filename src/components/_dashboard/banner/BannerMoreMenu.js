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
  Avatar,
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

export default function BannerMoreMenu(Banner) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const formik = useFormik({
    initialValues: {
      BannerID: '',
      Name: '',
      Image: ''
    },
    onSubmit: () => {
      axios
        .post(`${process.env.REACT_APP_WEB_API}Organization/AddOrEditBanner`, {
          Name: formik.values.Name,
          BannerID: formik.values.BannerID,
          Image: formik.values.Image
        })
        .then((res) => {
          if (res.data.Status === 'Updated') {
            alert('Edit Banner Successfully');
            window.location.reload();
          } else {
            alert('Edit Failed');
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
    formik.setFieldValue('BannerID', Banner.dulieu.BannerID);
    formik.setFieldValue('Name', Banner.dulieu.Name);
    formik.setFieldValue('Image', Banner.dulieu.Image);
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
            if (confirm('Are you sure you want to delete this banner?')) {
              axios
                .delete(
                  `${process.env.REACT_APP_WEB_API}Organization/DeleteBanner?BannerID=${Banner.dulieu.BannerID}`
                )
                .then((res) => {
                  if (res.data.Status === 'Deleted') {
                    alert('Banner Deleted');
                    window.location.reload();
                  } else {
                    alert('Deleted Fail');
                  }
                })
                .catch((err) => {
                  console.log(err);
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
                    Edit Banner
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <TextField label="Name" {...getFieldProps('Name')} variant="outlined" />
                  </Stack>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    justifyContent="flex-end"
                  >
                    <Avatar src={formik.values.Image} sx={{ width: 50, height: 50 }} />
                    <label htmlFor="contained-button-file">
                      <Input
                        id="contained-button-file"
                        type="file"
                        onChange={(e) => {
                          const { files } = e.target;
                          const reader = new FileReader();
                          reader.readAsDataURL(files[0]);
                          reader.onload = (e) => {
                            formik.setFieldValue('Image', e.target.result);
                          };
                        }}
                      />
                      <Button variant="contained" component="span">
                        Upload Image
                      </Button>
                    </label>
                  </Stack>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Edit Banner
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

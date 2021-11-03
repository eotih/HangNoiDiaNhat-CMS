/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Stack,
  Container,
  Typography,
  Card,
  Button,
  Box,
  TextField,
  Avatar,
  Input,
  Select,
  FormControl,
  MenuItem,
  InputLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { infoUserLogin } from 'src/Functions/Organization';
import axios from 'axios';
import Page from '../components/Page';

export default function EditAccount() {
  const [role, setRole] = useState('');
  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const formik = useFormik({
    initialValues: {
      AccountID: '',
      FullName: '',
      Image: '',
      Phone: '',
      Email: '',
      Password: '',
      RoleID: '',
      Address: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`${process.env.REACT_APP_WEB_API}Organization/AddOrEditAccount`, {
          FullName: formik.values.FullName,
          Image: formik.values.Image,
          Phone: formik.values.Phone,
          Email: formik.values.Email,
          Password: formik.values.Password,
          Address: formik.values.Address,
          RoleID: formik.values.RoleID
        })
        .then((res) => {
          if (res.data.Status === 'Success') {
            alert('Thêm thành công');
            window.location.reload();
          } else {
            alert('Thêm thất bại');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const { handleSubmit, getFieldProps } = formik;
  useEffect(() => {
    infoUserLogin().then((res) => {
      console.log(res);
      const data = res.map((item) => {
        formik.setFieldValue('AccountID', item.AccountID);
        formik.setFieldValue('FullName', item.FullName);
        formik.setFieldValue('Image', item.Image);
        formik.setFieldValue('Phone', item.Phone);
        formik.setFieldValue('Email', item.Email);
        formik.setFieldValue('Password', item.Password);
        formik.setFieldValue('Address', item.Address);
        formik.setFieldValue('RoleID', item.Role.RoleID);
      });
    });
  }, []);
  return (
    <Page title="Profile">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Profile
          </Typography>
        </Stack>
      </Container>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box sx={style}>
            <Stack spacing={3}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Account
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField label="FullName" {...getFieldProps('FullName')} variant="outlined" />
                <TextField label="Phone" {...getFieldProps('Phone')} variant="outlined" />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField label="Email" {...getFieldProps('Email')} variant="outlined" />
                <TextField
                  type="password"
                  label="Password"
                  {...getFieldProps('Password')}
                  variant="outlined"
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField label="Address" {...getFieldProps('Address')} variant="outlined" />
                <TextField label="RoleID" {...getFieldProps('RoleID')} variant="outlined" />
              </Stack>
              <LoadingButton fullWidth size="large" type="submit" variant="contained">
                Edit Profile
              </LoadingButton>
            </Stack>
          </Box>
        </Form>
      </FormikProvider>
    </Page>
  );
}

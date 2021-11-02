/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Stack,
  Button,
  MenuItem,
  Container,
  TextField,
  Select,
  Grid,
  Card,
  CardHeader,
  Typography
} from '@mui/material';
// components
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Box from '@mui/material/Box';
import { infoUserLogin } from 'src/Functions/Organization';
import Page from '../components/Page';
import Label from '../components/Label';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function User() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [account, setAccount] = useState([]);
  useEffect(() => {
    infoUserLogin().then((res) => {
      setAccount(res);
      setIsLoaded(true);
    });
  }, []);

  const style = {
    marginBottom: '10px',
    marginTop: '10px'
  };
  const formik = useFormik({
    initialValues: {
      FullName: '',
      Image: '',
      Phone: '',
      Email: '',
      Password: '',
      Address: '',
      remember: true
    },
    onSubmit: () => {
      alert(123);
    }
  });

  const { handleSubmit, getFieldProps } = formik;
  return (
    <Page title="Account | HangnoidiaNhat">
      <Box sx={{ pb: 5 }}>
        <Typography variant="h4">Profile</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField fullWidth label="First name" {...getFieldProps('firstName')} />

                    <TextField fullWidth label="Last name" {...getFieldProps('lastName')} />
                  </Stack>

                  <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="Email address"
                    {...getFieldProps('email')}
                  />

                  <LoadingButton size="large" type="submit" variant="contained">
                    Add Account
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Card>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField fullWidth label="First name" {...getFieldProps('firstName')} />

                    <TextField fullWidth label="Last name" {...getFieldProps('lastName')} />
                  </Stack>

                  <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="Email address"
                    {...getFieldProps('email')}
                  />

                  <LoadingButton size="large" type="submit" variant="contained">
                    Add Account
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
}

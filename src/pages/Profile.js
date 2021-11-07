/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Stack,
  Container,
  Typography,
  Box,
  Modal,
  Avatar,
  Link,
  Button,
  Grid,
  Breadcrumbs,
  Card,
  TextField,
  Select,
  Input,
  FormControl,
  MenuItem,
  InputLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import md5 from 'md5';
import { LoadingButton } from '@mui/lab';
import { infoUserLogin } from 'src/functions/Organization';
import axios from 'axios';
import { getAllRole } from 'src/functions/Component';
import Page from '../components/Page';

export default function EditAccount() {
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleChange = (event) => {
    formik.setFieldValue('RoleID', event.target.value);
    setRole(event.target.value);
  };
  const Input = styled('input')({
    display: 'none'
  });
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
  const formik = useFormik({
    initialValues: {
      AccountID: '',
      FullName: '',
      Image: '',
      Phone: '',
      Email: '',
      RoleID: '',
      Address: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`${process.env.REACT_APP_WEB_API}Organization/AddOrEditAccount`, {
          AccountID: formik.values.AccountID,
          FullName: formik.values.FullName,
          Image: formik.values.Image,
          Phone: formik.values.Phone,
          Email: formik.values.Email,
          Address: formik.values.Address,
          RoleID: formik.values.RoleID
        })
        .then((res) => {
          if (res.data.Status === 'Updated') {
            alert('Account Edit Successfully');
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
  const handleChangePassword = () => {
    const { Password } = formik.values;
    if (oldPassword === '' || newPassword === '' || repeatNewPassword === '') {
      alert('Please fill your password / New Password / Repeat New Password');
    } else if (newPassword !== repeatNewPassword) {
      alert('New Password and Repeat New Password do not match');
    } else if (Password !== md5(oldPassword)) {
      alert('Old Password and New Password do not match');
    } else {
      axios
        .post(`${process.env.REACT_APP_WEB_API}Organization/ChangePassword`, {
          AccountID: formik.values.AccountID,
          Password: newPassword
        })
        .then((res) => {
          if (res.data.Status === 'Updated') {
            alert('Thay đổi mật khẩu thành công');
            window.location.reload();
          } else {
            alert('Thay đổi mật khẩu thất bại');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getAllRole().then((res) => {
      setRoles(res);
    });
    infoUserLogin().then((res) => {
      const data = res.map((item) => {
        setRole(item.Role.RoleID);
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack direction="column" spacing={3}>
              <Typography variant="h5">Change Password</Typography>
              <TextField
                fullWidth
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                label="Old Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
              />
              <TextField
                fullWidth
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
              />
              <TextField
                fullWidth
                onChange={(e) => {
                  setRepeatNewPassword(e.target.value);
                }}
                label="Repeat new password"
                type={showPassword ? 'text' : 'password'}
                // {...getFieldProps('Password')}
                variant="outlined"
              />
              <Button onClick={handleChangePassword} fullWidth variant="contained" component="span">
                Change Password
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Profile
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Dashboard
              </Link>
              <Typography color="text.primary">Edit Profile</Typography>
            </Breadcrumbs>
          </Typography>
        </Stack>

        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ p: 5 }}>
                    <Stack
                      sx={{ mb: 5 }}
                      direction={{ xs: 'column', sm: 'row' }}
                      alignItems="center"
                      justifyContent="center"
                      spacing={2}
                    >
                      <Avatar src={formik.values.Image} sx={{ width: 100, height: 100 }} />
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
                        <Button fullWidth variant="contained" component="span">
                          Upload Thumbnail
                        </Button>
                      </label>
                    </Stack>
                    <Button fullWidth onClick={handleOpen} variant="contained" component="span">
                      Change Password
                    </Button>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ p: 5 }}>
                    <Stack spacing={2}>
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <TextField
                          fullWidth
                          label="FullName"
                          {...getFieldProps('FullName')}
                          variant="outlined"
                        />
                        <TextField
                          fullWidth
                          label="Phone"
                          {...getFieldProps('Phone')}
                          variant="outlined"
                        />
                      </Stack>
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <TextField
                          fullWidth
                          label="Email"
                          {...getFieldProps('Email')}
                          variant="outlined"
                        />
                        <FormControl fullWidth>
                          <InputLabel id="select-label">Role</InputLabel>
                          <Select
                            labelId="select-label"
                            label="Role"
                            {...getFieldProps('RoleID')}
                            variant="outlined"
                            value={role}
                            onChange={handleChange}
                          >
                            {roles.map((item) => (
                              <MenuItem key={item.RoleID} value={item.RoleID}>
                                {item.RoleName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <TextField
                          fullWidth
                          label="Address"
                          {...getFieldProps('Address')}
                          variant="outlined"
                        />
                      </Stack>
                    </Stack>
                  </Card>
                  <LoadingButton
                    fullWidth
                    sx={{ mt: 5 }}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Edit Profile
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

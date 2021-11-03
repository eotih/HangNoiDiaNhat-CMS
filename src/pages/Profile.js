import { useState, handleChange } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Stack,
  Container,
  Typography,
  Card,
  Button,
  TextField,
  Avatar,
  Input,
  Select,
  FormControl,
  MenuItem,
  InputLabel
} from '@mui/material';
import Page from '../components/Page';

export default function EditAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      Name: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      address: ''
    }
  });
  const { errors, touched } = formik;

  const [role, setRole] = useState('');
  const handleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <Page title="Profile">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Account
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 5, mx: 2 }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <Avatar src="" sx={{ mx: 15, mt: 5, width: 100, height: 100 }} />
            <Input type="file" />
            <Typography variant="h3" sx={{ px: 5, my: 5 }}>
              Edit Account
            </Typography>
          </Card>
          <Stack spacing={1}>
            <Card>
              <Stack direction="row" spacing={1} sx={{ px: 1, mt: 1, mx: 3 }}>
                <TextField
                  fullWidth
                  autoComplete="fullname"
                  type="text"
                  label="Name"
                  error={Boolean(touched.Name && errors.Name)}
                  helperText={touched.Name && errors.Name}
                />
                <FormControl fullWidth>
                  <InputLabel id="select-label">Role</InputLabel>
                  <Select labelId="select-label" label="Role" value={role} onChange={handleChange}>
                    <MenuItem value={1}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ px: 1, mt: 1, mx: 3 }}>
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="text"
                  label="Username"
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Stack>
              <Stack direction="row" spacing={1} sx={{ px: 1, mt: 1, mx: 3 }}>
                <TextField
                  fullWidth
                  autoComplete="email"
                  type="email"
                  label="Email address"
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  autoComplete="phone"
                  type="text"
                  label="Phone"
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
              </Stack>
              <Stack direction="row" spacing={1} sx={{ px: 1, mt: 1, mx: 3 }}>
                <TextField
                  fullWidth
                  autoComplete="address"
                  type="text"
                  label="Address"
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Stack>
              <Stack spacing={1} sx={{ p: 1, mb: 2, mx: 3 }}>
                <Button fullWidth size="large" type="submit" variant="contained">
                  Edit
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </Container>
    </Page>
  );
}

/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Container,
  Stack,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Input,
  Button,
  Avatar,
  ListItemText,
  OutlinedInput
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import Page from '../../Page';
import { getAllUtilities, getAllBrands, getAllCategory } from '../../../functions/Component';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function AddProduct() {
  const [openFilter, setOpenFilter] = useState(false);
  const [utilities, setUtilities] = React.useState([]);
  const [utilities2, setUtilities2] = React.useState([]);
  const [brand, setBrand] = React.useState([]);
  const [brand2, setBrand2] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [category2, setCategory2] = React.useState([]);
  const handleChange1 = (event) => {
    setBrand(event.target.value);
  };
  const handleChange2 = (event) => {
    setCategory(event.target.value);
  };
  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setUtilities2(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  useEffect(() => {
    getAllUtilities().then((res) => {
      setUtilities(res);
    });
    getAllBrands().then((res) => {
      setBrand2(res);
    });
    getAllCategory().then((res) => {
      setCategory2(res);
    });
  }, []);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '40%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4
  };
  const styleSelect = {
    position: 'absolute',
    top: '20%',
    left: '60%',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4
  };
  const styleSale = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4
  };
  const Input = styled('input')({
    display: 'none'
  });
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });
  const { resetForm, handleSubmit, getFieldProps } = formik;
  return (
    <Page title="Dashboard: Add Products ">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" sx={{ mb: 5 }}>
            Create a new product
          </Typography>
        </Stack>
      </Container>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box sx={style}>
            <Stack
              sx={{
                '& .MuiTextField-root': { m: 1, mr: 2, width: '40ch' },
                '& .MuiSelect-root': { m: 1, width: '40ch' }
              }}
              spacing={3}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }}>
                <Stack direction={{ xs: 'column' }} spacing={2}>
                  <TextField
                    label="Product Name"
                    {...getFieldProps('Name')}
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    variant="outlined"
                  />
                  <SunEditor
                    height="100%"
                    label="Type something"
                    aria-label="Type something"
                    placeholder="Please type here..."
                    variant="outlined"
                    {...getFieldProps('Details')}
                  />
                </Stack>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }}>
                <Stack direction={{ xs: 'column' }} spacing={2} justifyContent="center">
                  <label htmlFor="contained-button-file">
                    <Input
                      id="contained-button-file"
                      type="file"
                      onChange={(e) => {
                        const { files } = e.target;
                        const reader = new FileReader();
                        reader.readAsDataURL(files[0]);
                        reader.onload = (e) => {
                          formik.setFieldValue('Thumbnail', e.target.result);
                        };
                      }}
                    />
                    <Button variant="contained" component="span">
                      Upload Thumbnail
                    </Button>
                  </label>
                  <Avatar src={formik.values.Thumbnail} sx={{ width: 50, height: 50 }} />
                  <label htmlFor="contained-button-file1">
                    <Input
                      id="contained-button-file1"
                      type="file"
                      onChange={(e) => {
                        const { files } = e.target;
                        const reader = new FileReader();
                        reader.readAsDataURL(files[0]);
                        reader.onload = (e) => {
                          formik.setFieldValue('ImageProduct', e.target.result);
                        };
                      }}
                    />
                    <Button variant="contained" component="span">
                      Upload Image
                    </Button>
                  </label>
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Box sx={styleSelect}>
            <Stack direction={{ xs: 'column' }} spacing={1} sx={{ borderRadius: 2, width: '42ch' }}>
              <FormControl>
                <InputLabel id="demo-multiple-checkbox-label">Utilities</InputLabel>
                <Select
                  sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={utilities2}
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {utilities.map((name, i) => (
                    <MenuItem key={name.UtilityID} value={name.Name}>
                      <Checkbox checked={utilities2.indexOf(name.Name) > -1} />
                      <ListItemText primary={name.Name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ ml: 1 }}>
                <InputLabel id="Brand-label">Brand</InputLabel>
                <Select
                  sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                  labelId="Brand-label"
                  id="Brand"
                  {...getFieldProps('BrandID')}
                  value={brand}
                  label="Brand"
                  onChange={handleChange1}
                >
                  {brand2.map((name, i) => (
                    <MenuItem key={name.BrandID} value={name.Name}>
                      {name.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ ml: 1 }}>
                <InputLabel id="Category-label">Category</InputLabel>
                <Select
                  sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                  labelId="Category-label"
                  id="Brand"
                  {...getFieldProps('CategoryID')}
                  value={category}
                  label="Category"
                  onChange={handleChange2}
                >
                  {category2.map((name, i) => (
                    <MenuItem key={name.CategoryID} value={name.Name}>
                      {name.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Box>
          <Box sx={styleSale}>
            <Stack direction={{ xs: 'row' }} spacing={2} justifyContent="center">
              <Stack
                direction={{ xs: 'column', width: '20ch' }}
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '19ch' }
                }}
                spacing={1}
              >
                <TextField
                  sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                  label="Price"
                  {...getFieldProps('Price')}
                  variant="outlined"
                />
                <TextField
                  sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                  label="Import price"
                  {...getFieldProps('ImportPrice')}
                  variant="outlined"
                />
              </Stack>
              <Stack
                direction={{ xs: 'column', width: '20.5ch' }}
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '19ch' }
                }}
                spacing={2}
              >
                <TextField
                  sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                  label="Discount %"
                  {...getFieldProps('Discount')}
                  variant="outlined"
                />
                <TextField
                  sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                  label="Quantity"
                  {...getFieldProps('Quantity')}
                  variant="outlined"
                />
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ marginTop: '32%', marginLeft: '53%' }}>
            <LoadingButton sx={{ width: '50ch' }} size="large" type="submit" variant="contained">
              Add Product
            </LoadingButton>
          </Box>
        </Form>
      </FormikProvider>
    </Page>
  );
}

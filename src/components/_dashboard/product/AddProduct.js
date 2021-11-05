/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-plusplus */
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
  ImageList,
  CardHeader,
  ImageListItem,
  Button,
  Card,
  Paper,
  Grid,
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
  const [image, setImage] = React.useState([]);
  const handleChange1 = (event) => {
    formik.setFieldValue('BrandID', event.target.value);
    setBrand(event.target.name);
  };
  const handleChange3 = (event) => {
    const html = event.map(
      (res) => `
            <ImageListItem key={index}>
              <img
                src=${res.base64}
                srcSet=${res.base64}
                loading="lazy"
              />
            </ImageListItem>`
    );
    document.getElementById('hinhanh').innerHTML = html;
  };
  const handleChange2 = (event) => {
    formik.setFieldValue('CategoryID', event.target.value);
    setCategory(event.target.value);
  };
  const handleChange5 = (event) => {
    console.log(event.target);
    setUtilities2(
      // On autofill we get a the stringified value.
      typeof event.target.name === 'string' ? event.target.name.split(',') : event.target.name
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

  const Input = styled('input')({
    display: 'none'
  });
  const formik = useFormik({
    initialValues: {
      BrandID: '',
      CategoryID: '',
      UtilityID: '',
      Discount: '',
      Price: '',
      ImportPrice: '',
      Quantity: '',
      Details: '',
      Name: ''
    },
    onSubmit: () => {
      console.log(formik.values);
    }
  });
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    justify: 'center',
    borderRadius: 2,
    boxShadow: 24,
    color: theme.palette.text.secondary
  }));
  const { handleSubmit, getFieldProps } = formik;
  const fileToDataUri = (image) =>
    new Promise((res) => {
      const reader = new FileReader();
      const { type, name, size } = image;
      reader.addEventListener('load', () => {
        res({
          base64: reader.result,
          name,
          type,
          size
        });
      });
      reader.readAsDataURL(image);
    });
  return (
    <Page title="Dashboard: Add Products ">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" sx={{ mb: 5 }}>
            Add product
          </Typography>
        </Stack>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card sx={{ p: 3, pb: 1 }}>
                    <Stack direction={{ xs: 'column' }} spacing={2}>
                      <TextField
                        {...getFieldProps('Name')}
                        label="Product Name"
                        sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                        variant="outlined"
                      />
                      <Typography variant="h7">Product Description</Typography>
                      <SunEditor
                        height="100%"
                        label="Type something"
                        aria-label="Type something"
                        placeholder="Please type here..."
                        variant="outlined"
                        {...getFieldProps('Details')}
                      />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }}>
                      <Stack direction={{ xs: 'column' }} spacing={2} justifyContent="center">
                        <label htmlFor="contained-button-file1">
                          <Input
                            accept="image/*"
                            multiple
                            id="contained-button-file1"
                            type="file"
                            onChange={async (e) => {
                              const { files } = e.target;
                              for (let i = 0; i < files.length; i++) {
                                image.push(fileToDataUri(files[i]));
                              }
                              const data = await Promise.all(image);
                              handleChange3(data);
                            }}
                          />
                          <Button sx={{ mt: 5 }} variant="contained" component="span">
                            Upload Image
                          </Button>
                        </label>
                        <ImageList
                          id="hinhanh"
                          sx={{ width: 500, height: 450 }}
                          cols={3}
                          rowHeight={164}
                        />
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={8} md={4}>
                  <Card sx={{ p: 3, pb: 1 }}>
                    <Stack direction={{ xs: 'column' }} spacing={3}>
                      <FormControl>
                        <InputLabel id="demo-multiple-checkbox-label">Utilities</InputLabel>
                        <Select
                          sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          {...getFieldProps('UtilityID')}
                          value={utilities2}
                          onChange={handleChange5}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                        >
                          {utilities.map((name, i) => (
                            <MenuItem key={name.UtilityID} value={name.UtilityID}>
                              <Checkbox checked={utilities2.indexOf(name.Name) > -1} />
                              <ListItemText primary={name.Name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl>
                        <InputLabel id="Brand-label">Brand</InputLabel>
                        <Select
                          sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                          labelId="Brand-label"
                          id="Brand"
                          {...getFieldProps('BrandID')}
                          value={brand}
                          onChange={handleChange1}
                          input={<OutlinedInput label="Brand" />}
                          MenuProps={MenuProps}
                        >
                          {brand2.map((name, i) => (
                            <MenuItem key={name.BrandID} value={name.BrandID}>
                              <ListItemText primary={name.Name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl>
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
                          {category2 &&
                            category2.map((name, i) => (
                              <MenuItem key={name.CategoryID} value={name.Name}>
                                {name.Name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <Stack direction="row" alignItems="center" justifyContent="center">
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
                        <Avatar
                          src={formik.values.Thumbnail}
                          sx={{ width: '100px', height: '100%', ml: 5 }}
                        />
                      </Stack>
                    </Stack>
                  </Card>
                  <Card sx={{ p: 3, mt: 5 }}>
                    <Stack direction={{ xs: 'row' }} spacing={2} justifyContent="center">
                      <Stack direction={{ xs: 'column' }} spacing={2}>
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
                      <Stack direction={{ xs: 'column' }} spacing={2}>
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
                  </Card>
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ mt: 5 }}
                  >
                    Add Product
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

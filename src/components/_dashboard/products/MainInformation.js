/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Stack,
  TextField,
  Typography,
  Grid,
  Card,
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  Select,
  MenuItem,
  Avatar
} from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import React, { useState, useEffect, memo } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { getAllBrands, getAllCategory } from '../../../functions/Component';
import { infoUserLogin } from '../../../functions/Organization';
//----------------------------------
function MainInformation({ onHandleNext }) {
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand2, setBrand2] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [image, setImage] = useState([]);
  const [show, setShow] = useState(false);
  const handleChange1 = (event) => {
    setBrand(event.target.value);
    formik.setFieldValue('BrandID', event.target.value);
  };
  const handleChange2 = (event) => {
    setCategory(event.target.value);
    formik.setFieldValue('CategoryID', event.target.value);
  };
  const handleEditorChange = (content) => {
    formik.setFieldValue('Details', content);
  };
  const Input = styled('input')({
    display: 'none'
  });
  useEffect(() => {
    infoUserLogin().then((res) => {
      res.map((item) => {
        formik.setFieldValue('AccountID', item.AccountID);
      });
    });
    getAllBrands().then((res) => {
      setBrand2(res);
    });
    getAllCategory().then((res) => {
      setCategory2(res);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      AccountID: '',
      BrandID: '',
      CategoryID: '',
      Thumbnail: '',
      Discount: '',
      Price: '',
      ImportPrice: '',
      Quantity: '',
      Details: '',
      Name: ''
    },
    onSubmit: () => {
      axios
        .post(`${process.env.REACT_APP_WEB_API}Management/AddOrEditProduct`, formik.values)
        .then((res) => {
          if (res.data.Status === 'Success') {
            for (let i = 0; i < image.length; i += 1) {
              uploadImageProduct(image[i].base64, formik.values.Name);
            }
            onHandleNext();
          } else {
            alert('Add Failed');
          }
        });
    }
  });
  const uploadImageProduct = (image, name) => {
    axios
      .post(`${process.env.REACT_APP_WEB_API}Management/AddOrEditProductImage`, {
        Image2: image,
        ProductName: name
      })
      .then((res) => {
        if (res.data.Status === 'Success') {
          console.log('Successfully added');
        } else {
          alert('Add Failed');
        }
      });
  };
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
  const { handleSubmit, getFieldProps } = formik;
  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack direction={{ xs: 'column' }} spacing={2}>
                  <TextField
                    label="Product Name"
                    {...getFieldProps('Name')}
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    variant="outlined"
                  />
                  <Typography variant="h7">Product Description</Typography>
                  <SunEditor
                    onChange={handleEditorChange}
                    autoFocus
                    height="100%"
                    setOptions={{
                      showPathLabel: false,
                      minHeight: '50vh',
                      maxHeight: '50vh',
                      placeholder: 'Enter your text here!!!',
                      buttonList: [
                        ['undo', 'redo'],
                        ['font', 'fontSize', 'formatBlock'],
                        ['paragraphStyle'],
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        ['fontColor', 'hiliteColor'],
                        ['removeFormat'],
                        '/', // Line break
                        ['outdent', 'indent'],
                        ['align', 'horizontalRule', 'list', 'lineHeight'],
                        ['table', 'link', 'image']
                      ],
                      formats: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                      font: [
                        'Arial',
                        'Calibri',
                        'Comic Sans',
                        'Courier',
                        'Garamond',
                        'Georgia',
                        'Impact',
                        'Lucida Console',
                        'Palatino Linotype',
                        'Segoe UI',
                        'Tahoma',
                        'Times New Roman',
                        'Trebuchet MS'
                      ]
                    }}
                    // {...getFieldProps('Details')}
                    variant="outlined"
                  />
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <Card sx={{ p: 3 }}>
                <Stack direction={{ xs: 'column' }} spacing={1}>
                  <FormControl>
                    <InputLabel id="Brand-label">Brand</InputLabel>
                    <Select
                      sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                      labelId="Brand-label"
                      id="Brand"
                      value={brand}
                      label="Brand"
                      onChange={handleChange1}
                    >
                      {brand2.map((name, i) => (
                        <MenuItem key={name.BrandID} value={name.BrandID}>
                          <ListItemText primary={name.Name} />
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
                      value={category}
                      label="Category"
                      onChange={handleChange2}
                    >
                      {category2.map((name, i) => (
                        <MenuItem key={name.CategoryID} value={name.CategoryID}>
                          <ListItemText primary={name.Name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Stack direction={{ xs: 'row' }} spacing={2} justifyContent="center">
                    <Stack direction={{ xs: 'column' }} spacing={1}>
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
                    <Stack direction={{ xs: 'column' }} spacing={1}>
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
                      <Button fullWidth variant="contained" component="span">
                        Upload Thumbnail
                      </Button>
                    </label>
                    <Avatar src={formik.values.Thumbnail} sx={{ width: 50, height: 50, ml: 1 }} />
                  </Stack>
                </Stack>
              </Card>
              <Card sx={{ mt: 5 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card sx={{ p: 5 }}>
                      <Stack direction={{ xs: 'column' }} spacing={2}>
                        <Typography variant="h3">Upload image for product</Typography>
                        <label htmlFor="contained-button-file1">
                          <Input
                            accept="image/*"
                            multiple
                            id="contained-button-file1"
                            type="file"
                            onChange={async (e) => {
                              const { files } = e.target;
                              for (let i = 0; i < files.length; i += 1) {
                                image.push(fileToDataUri(files[i]));
                              }
                              const data = await Promise.all(image);
                              setImage(data);
                            }}
                          />
                          <Button
                            onClick={() => setShow(!show)}
                            variant="contained"
                            component="span"
                          >
                            Upload Image
                          </Button>
                        </label>
                        <Stack direction="row" alignItems="center" justifyContent="center">
                          {show && (
                            <Stack direction="row" spacing={2}>
                              {image.map((item, index) => (
                                <Avatar
                                  sx={{ width: 56, height: 56 }}
                                  key={index}
                                  src={item.base64}
                                  alt="img"
                                />
                              ))}
                            </Stack>
                          )}
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
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
export default memo(MainInformation);
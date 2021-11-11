/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import {
  Container,
  Stack,
  Typography,
  Avatar,
  Box,
  Grid,
  Card,
  Rating,
  Divider,
  Tabs,
  Tab
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Label from '../../Label';
import Page from '../../Page';
import { SelectAllCommentAndStar } from '../../../functions/Management';
import { fDateTimeSuffix } from '../../../utils/formatTime';

function TabPanel(props) {
  const { children, values, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={values !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {values === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  values: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 100,
      height: 100
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  };
}
export default function Review() {
  const { slug } = useParams();
  const [comment, setComment] = useState('');
  const [star, setStar] = useState('');
  const [starCount, setStarCount] = useState('');
  const [product, setProduct] = useState([]);
  const [product2, setProduct2] = useState([]);
  const [values, setValues] = useState(0);
  const handleChange = (event, newValues) => {
    setValues(newValues);
  };
  useEffect(() => {
    SelectAllCommentAndStar().then((res) => {
      let star = 0;
      const filterSlug = res.filter((r) => r.Slug === slug);
      const filterComments = res.filter((r) => r.Comment1);
      const filterStar = res.filter((r) => r.Star);
      const data = {
        Name: filterSlug[0].TenSanPham,
        Thumbnail: filterSlug[0].Thumbnail,
        Description: filterSlug[0].Description
      };
      console.log(data);
      for (let i = 0; i < filterStar.length; i += 1) {
        star += parseInt(filterStar[i].Star, 10);
      }
      const average = star / filterStar.length;
      const roundHalf = Math.round(average * 2) / 2;
      setProduct(filterSlug);
      setProduct2(data);
      setComment(filterComments.length);
      setStarCount(filterStar.length);
      setStar(roundHalf);
    });
  }, []);
  return (
    <Page>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Product Review
          </Typography>
        </Stack>
        {product && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid item xs={12}>
                <Card sx={{ p: 2 }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={8}>
                    <Grid item xs={12} md={6}>
                      <Avatar
                        src={product2.Thumbnail}
                        variant="rounded"
                        sx={{ width: '100%', height: 'auto' }}
                      />
                    </Grid>
                    <Stack direction={{ xs: 'column' }} spacing={2}>
                      <Typography variant="h4" sx={{ mt: 3 }}>
                        {product2.Name}
                      </Typography>
                      <Rating name="read-only" value={star} readOnly size="large" />
                      <Divider variant="middle" />
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <Typography variant="subtitle1">Number of Comments: </Typography>
                        <Typography variant="body1" gutterBottom>
                          {comment}
                        </Typography>
                      </Stack>
                      <Stack direction={{ xs: 'row' }} spacing={3}>
                        <Typography variant="subtitle1">Number of Ratings: </Typography>
                        <Typography variant="body1" gutterBottom>
                          {starCount}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" gutterBottom>
                        {parse(String(product2.Description))}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={12} sx={{ mt: 5 }}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                      value={values}
                      onChange={handleChange}
                      indicatorColor="secondary"
                      textColor="inherit"
                      variant="fullWidth"
                      aria-label="full width tabs example"
                    >
                      <Tab label="Comment" {...a11yProps(0)} />
                    </Tabs>
                  </Box>
                  <TabPanel values={values} index={0}>
                    {product.map((product) => (
                      <>
                        <Grid container spacing={1}>
                          <Grid item xs={12} md={3}>
                            <Stack
                              direction={{ xs: 'column' }}
                              spacing={2}
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Avatar {...stringAvatar(product.KhachHang)} />
                              <Typography variant="subtitle2" noWrap>
                                {product.KhachHang}
                              </Typography>
                              <Typography variant="subtitle2" noWrap>
                                {fDateTimeSuffix(product.CreatedAt)}
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={9}>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                              <Rating name="read-only" value={product.Star} readOnly size="small" />
                            </Stack>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                              {product.Comment1}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider variant="middle" sx={{ mt: 3, mb: 3 }} />
                      </>
                    ))}
                  </TabPanel>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Page>
  );
}

import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Container, Stack, Typography, Link, Breadcrumbs, Button } from '@mui/material';
// components
import Page from '../components/Page';
import {
  PostSort,
  PostList,
  PostCartWidget,
  PostFilterSidebar
} from '../components/_dashboard/post';
//
import { getAllPosts } from '../functions/Article';

// ----------------------------------------------------------------------

export default function Post() {
  const [openFilter, setOpenFilter] = useState(false);
  const [post, setPost] = useState([]);
  useEffect(() => {
    getAllPosts().then((res) => {
      setPost(res);
    });
  }, []);
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

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };
  return (
    <Page title="Dashboard: Post | Hangnoidianhat">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Post
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Dashboard
              </Link>
              <Typography color="text.primary">Post</Typography>
            </Breadcrumbs>
          </Typography>
          <Button
            to="./add"
            variant="contained"
            component={RouterLink}
            startIcon={<Icon icon={plusFill} />}
          >
            New Post
          </Button>
        </Stack>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <PostFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <PostSort />
          </Stack>
        </Stack>

        <PostList products={post} />
        <PostCartWidget />
      </Container>
    </Page>
  );
}

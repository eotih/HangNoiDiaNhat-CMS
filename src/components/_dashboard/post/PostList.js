import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import PostCard from './PostCard';

// ----------------------------------------------------------------------

PostList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function PostList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.PostID} item xs={12} sm={6} md={3}>
          <PostCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

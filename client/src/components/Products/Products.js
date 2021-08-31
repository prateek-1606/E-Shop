import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';

const Products = ({ products, cartproducts, handleAddToCart }) => {

  const user = localStorage.getItem('user');
  const history = useHistory();

  if (!user) {
    history.push('/signin');
  }

  const classes = useStyles();
  console.log(products)
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={8}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} cartproducts={cartproducts} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default Products;
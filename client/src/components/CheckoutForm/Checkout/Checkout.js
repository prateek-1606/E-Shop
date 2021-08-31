import React, { useEffect, useState } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';
import { commerce } from '../../../lib/commerce';
import { Link } from 'react-router-dom';
import { AddOrder } from '../../../api/orders';
const { v4: uuidv4 } = require('uuid');

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {

  const classes = useStyles();
  const [checkoutToken, setcheckoutToken] = useState(null);
  const [activeStep, setactiveStep] = useState(0);
  const [shippingData, setshippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const nextStep = () => setactiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setactiveStep((prevActiveStep) => prevActiveStep - 1);

  const test = (data) => {
    setshippingData(data);

    nextStep();
  }
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

        setcheckoutToken(token);
      } catch (error) {
        console.log(error);
      }
    };

    generateToken();
  }, [cart]);

  const timeout = (orderData) => {
    setTimeout(() => {
      console.log(orderData);
      AddOrder({ cart: orderData.line_items, OrderID: uuidv4(), address: { street: orderData.billing.street, city: orderData.billing.town_city, Zip_code: orderData.billing.postal_zip_code, country_code: orderData.billing.country } })
        .then((res) => console.log(res))
        .catch(err => console.log(err))
      setIsFinished(true);
    }, 3000)
  }

  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : isFinished ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase!</Typography>
        <Divider className={classes.divider} />
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error)
    console.log(error);

  const Form = () => (activeStep === 0 ?
    <AddressForm test={test} checkoutToken={checkoutToken} /> :
    <PaymentForm backStep={backStep} checkoutToken={checkoutToken} nextStep={nextStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />)

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  )
}

export default Checkout;
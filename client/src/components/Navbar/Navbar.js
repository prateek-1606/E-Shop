import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, MenuItem, Select, FormControl, TextField } from '@material-ui/core';
import { AppBar, Toolbar, IconButton, Badge } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assests/commerce.png';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';
import Input from '../input';
import Alert from '@material-ui/lab/Alert'
import { AddProduct } from '../../api/products';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ name: '', description: '', price: '' });
  const [error, setError] = useState(null);
  const [image, setImage] = useState("")
  const [menu, setmenu] = useState(false)
  const matches = useMediaQuery('(max-width:768px)');

  const handleSubmit = () => {
    const formdata = new FormData()
    formdata.append("file", image)
    formdata.append("upload_preset", "ml_default")
    formdata.append("cloud_name", "prateekvarshney")
    fetch("https://api.cloudinary.com/v1_1/prateekvarshney/image/upload", {
      method: "post",
      body: formdata
    })
      .then(res => res.json())
      .then(result => {
        data.Image = result.secure_url;
        AddProduct(data).then((data) => {
          console.log(data);
          setIsOpen(false);
        })
          .catch((err) => {
            console.log(err);
            setError(err.message);
          })
      })
      .catch(err => {
        console.log(err);
        setError(err.message);
      })
  }

  const notloogedRouter = () => {
    return (
      <div className={classes.buttons} >
        <Button onClick={() => history.push('/signin')} className={classes.loginbutton} size="large" variant="outlined" color="secondary" >
          Login
        </Button>
        <Button onClick={() => history.push('/signup')} className={classes.loginbutton} size="large" variant="outlined" color="secondary" >
          Register
        </Button>
      </div>
    )
  }

  const loggedRouter = () => {
    return (
      <div className={classes.buttons} >
        <Button onClick={() => history.push('/history')} className={classes.loginbutton} size="large" variant="outlined" color="secondary" >
          History
        </Button>
        <Button onClick={handlelogout} className={classes.loginbutton} size="large" variant="outlined" color="secondary" >
          Logout
        </Button>
      </div>
    )
  }

  const handlelogout = () => {
    localStorage.clear();
    history.push('/signin');
  }


  return (
    <>
      {matches && menu && (
        <ul >
          <li>1</li>
          <li>2</li>
        </ul>
      )}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar >
          {matches && (
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setmenu(!menu)} >
              {menu ? <div>X</div> : <MenuIcon />}
            </IconButton>
          )}
          <Typography component={Link} to='/' variant="h5" className={classes.title} color="secondary">
            <img src={logo} alt="commerce.js" height="30px" className={classes.image} /> Commerce.js
          </Typography>
          {!matches && (
            <Button onClick={() => history.push('/')} className={classes.shopbutton} size="large" variant="outlined" color="secondary" >
              Shop
            </Button>
          )}
          <div className={classes.grow} />
          {!matches && user === null && notloogedRouter()}
          {!matches && user !== null && loggedRouter()}

          {location.pathname === '/' && (
            <div className={classes.button}>
              <IconButton component={Link} to='/cart' aria-label="Show cart items" color="inherit">
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Dialog open={isOpen} onClose={!isOpen} >
        <DialogTitle className={classes.dialog} >Create New Product</DialogTitle>
        <DialogContent >
          <form onSubmit={handleSubmit} >
            <Input margin="normal" name="Name" label="Name" handleChange={(e) => setData({ ...data, name: e.target.value })} autoFocus />
            <Input margin="normal" name="Price" label="Price" handleChange={(e) => setData({ ...data, price: e.target.value })} autoFocus />
            <Input margin="normal" name="Description" label="Description" handleChange={(e) => setData({ ...data, description: e.target.value })} autoFocus />
            <input type="file" name="file" onChange={(e) => setImage(e.target.files[0])} />
            {error && <Alert severity="error">{error}</Alert>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleSubmit} >Create</Button>
          <Button variant="outlined" color="secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Navbar;
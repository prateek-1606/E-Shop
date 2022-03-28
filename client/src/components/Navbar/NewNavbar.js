import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import useStyles from './styles';
import logo from '../../assests/commerce.png';
import { IconButton, Badge } from "@material-ui/core";
import { ShoppingCart } from '@material-ui/icons';

import './Navbar.css';

const Navbar = ({ totalItems }) => {
    // const [filteredData, setFilteredData] = useState([]);
    // const [wordEntered, setWordEntered] = useState("");
    // const clearInput = () => {
    //     setFilteredData([]);
    //     setWordEntered("");
    // };

    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();;

    const handlelogout = () => {
        localStorage.clear();
        history.push('/signin');
    }

    const loggedin = () => {
        return (
            <>
                <li class="luxbar-item"><a href="/">Shop</a></li>
                <li class="luxbar-item"><a href="/history">History</a></li>
                <li class="luxbar-item"><a onClick={handlelogout} href="/" >Logout</a></li>
            </>
        )
    }

    const notloggedin = () => {
        return (
            <>
                <li class="luxbar-item"><a href="/">Shop</a></li>
                <li class="luxbar-item"><a href="/signin">Login</a></li>
                <li class="luxbar-item"><a href="/signup">Signup</a></li>
            </>
        )
    }


    return (
        <header id="luxbar" class="luxbar-fixed">
            <input type="checkbox" class="luxbar-checkbox" id="luxbar-checkbox" />
            <div class="luxbar-menu luxbar-menu-right luxbar-menu-dark">
                <ul class="luxbar-navigation">
                    <li class="luxbar-header">
                        <img src={logo} alt="commerce.js" height="30px" className={classes.image} />
                        <a href="/" class="luxbar-brand"> Commerce.js</a>
                        <label style={{ color: 'black' }} class="luxbar-hamburger luxbar-hamburger-doublespin"
                            id="luxbar-hamburger" for="luxbar-checkbox"> <span></span> </label>
                    </li>
                    {user === null ? notloggedin() : loggedin()}
                    <li class="luxbar-item">
                        <IconButton component={NavLink} to='/cart' aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
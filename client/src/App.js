import React, { useEffect, useState } from 'react';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Checkout from './components/CheckoutForm/Checkout/Checkout';
import { commerce } from './lib/commerce';
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    const [products, setproducts] = useState([]);
    const [cart, setcart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setproducts(data);
    }

    const fetchCart = async () => {
        setcart(await commerce.cart.retrieve());
    }
    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setcart(cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setcart(cart);
    }

    const handleRemoveCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setcart(cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setcart(cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setcart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            console.log(incomingOrder);
            setOrder(incomingOrder);

            refreshCart();
        } catch (error) {
            console.log(error);
            setErrorMessage(error.data.error.message);
        }
    }
    console.log(cart);
    return (
        <>
            <Router>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} handleAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/cart" >
                        <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleEmptyCart={handleEmptyCart} handleRemoveCart={handleRemoveCart} />
                    </Route>
                    <Route exact path="/checkout" >
                        <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
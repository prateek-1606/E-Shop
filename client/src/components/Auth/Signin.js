import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './signin.css';
import { Typography } from '@material-ui/core';
import { login } from '../../api/auth';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const history = useHistory();
    const [wait, setWait] = useState(false);
    const [error, setError] = useState('');
    if (localStorage.getItem('user')) {
        history.push('/');
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        console.log(data);
        e.preventDefault();
        setWait(true);
        login(data).then((res) => {
            localStorage.setItem('user', JSON.stringify({ ...res?.data }));
            setWait(false);
            window.location.reload();
            history.push('/');
        })
            .catch((err) => {
                setError('Something Went Wrong,Try Again!!');
                setWait(false);
            })
    }

    return (
        <div className='signin'>
            <div className="signin-title" >
                Login
            </div>
            <form className="form" onSubmit={handleSubmit} >
                <input className="input" type="email" name="email" onChange={handleChange} placeholder="Email Address" />
                <input className="input" type="password" name="password" onChange={handleChange} placeholder="Password" />
                <input className="submit" type="submit" value={wait === true ? 'Please wait....' : 'Login'} />
                {error !== '' ? (<Typography color="secondary" style={{ textAlign: 'center', paddingTop: '5px', fontSize: '15px' }} >{error}</Typography>) : null}
            </form>
            <div style={{ marginTop: '15px' }} >
                <span style={{ fontSize: '16px' }} >
                    Don't have an account?
                </span>
                <Link to="/signup" style={{ float: 'right', fontSize: '16px', color: '#363637' }} display="inline" >
                    Create Account
                </Link>
            </div>
        </div >
    )
}

export default SignIn;
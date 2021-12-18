import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './signin.css';
import { Typography } from '@material-ui/core';
import { register } from '../../api/auth';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [data, setData] = useState({ email: '', password: '', name: '' });
    const history = useHistory();
    const [wait, setWait] = useState(false);

    const handleChange = (e) => {
        console.log(e.target.value);
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setWait(true);
        console.log(data);
        register(data)
            .then((res) => {
                localStorage.setItem('user', JSON.stringify({ ...res?.data }));
                setWait(false);
                history.push('/');
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='signin'>
            <div className='signup-title'>Create Account</div>
            <form className='signin-form' onSubmit={handleSubmit} >
                <input onChange={handleChange} type="name" id="name" name="name" placeholder="Your Name.." ></input>
                <br />
                <input onChange={handleChange} type="email" id="email" name="email" placeholder="Your Email id.." ></input>
                <br />
                <input onChange={handleChange} name="password" type="Password" placeholder="Your Password.." id="Password"></input>
                <br />
                <input type="submit" value={wait === true ? 'Please wait...' : 'Create Account'} ></input>
            </form>
            <div style={{ marginTop: '15px' }} >
                <span style={{ fontSize: '16px' }} >
                    Already have an account?
                </span>
                <Link to="/signin" style={{ float: 'right', fontSize: '16px', color: '#363637' }} display="inline" >
                    Login to your Account
                </Link>
            </div>
        </div>
    )
}

export default SignUp;
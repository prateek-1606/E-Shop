import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './signin.css';
import { Typography } from '@material-ui/core';
import { register } from '../../api/auth';

const SignUp = () => {
    const [data, setData] = useState({ email: '', password: '', name: '' });
    const history = useHistory();

    const handleChange = (e) => {
        console.log(e.target.value);
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        console.log(data);
        e.preventDefault();
        register(data)
            .then((res) => {
                localStorage.setItem('user', JSON.stringify({ ...res?.data }));
                history.push('/');
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='signup'>
            <div className='signin-title'><Typography variant="h4" color="secondary">Sign Up</Typography> </div>
            <form className='signin-form' onSubmit={handleSubmit} >
                <label for="name">Name</label>
                <input onChange={handleChange} type="name" id="name" name="name" placeholder="Your Name.." ></input>
                <br />
                <br />
                <label for="EmailId">Email id</label>
                <input onChange={handleChange} type="email" id="email" name="email" placeholder="Your Email id.." ></input>
                <br />
                <br />
                <label for="Password">Password</label>
                <input onChange={handleChange} name="password" type="Password" id="Password"></input>
                <br />
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default SignUp;
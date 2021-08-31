import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './signin.css';
import { Typography } from '@material-ui/core';
import { login } from '../../api/auth';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const history = useHistory();

    const handleChange = (e) => {
        console.log(e.target.value);
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        console.log(data);
        e.preventDefault();
        login(data).then((res) => {
            localStorage.setItem('user', JSON.stringify({ ...res?.data }));
            history.push('/');
        })
    }

    const demouserlogin = () => {
        login({ email: "demo@gmail.com", password: "123456" })
            .then((res) => {
                localStorage.setItem('user', JSON.stringify({ ...res?.data }));
                history.push('/');
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='signin'>
            <div className='signin-title'><Typography variant="h4" color="secondary">Sign In</Typography> </div>
            <form className='signin-form' onSubmit={handleSubmit} >
                <label for="EmailId">Email id</label>
                <input onChange={handleChange} type="email" id="email" name="email" placeholder="Your Email id.." ></input>
                <br />
                <br />
                <label for="Password">Password</label>
                <input onChange={handleChange} name="password" type="Password" id="Password"></input>
                <br />
                <br />
                <input type="submit" value="Submit"></input>
                <br />
                <br />
                <Link onClick={demouserlogin} ><Typography style={{ marginLeft: "125px" }} >Login as a demo user</Typography></Link>
            </form>
        </div>
    )
}

export default SignIn;
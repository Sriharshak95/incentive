import React, {useEffect, useState, useContext, useMemo} from 'react';
import {AuthenticationContext} from '../context';
import Button from '../components/button';
import isTokenExpired from '../utils/commonUtils';

const Navbar = () => {

    const {profile, setProfile} = useContext(AuthenticationContext);

    useEffect(() => {
        fetch('http://localhost:5001/profile', { credentials: 'include' })
          .then(response => {
            if (response.ok) return response.json();
            throw new Error('Authentication failed');
          })
          .then(data => {
            // Store token in localStorage or context
            if(localStorage.getItem('token')!==null) {
                localStorage.setItem('token', data.token);
            }

            setProfile(data.user)
          })
          .catch(error => console.error(error));
      }, []);
    

    const handleLogin = async () => {
        try {
            // const response = await axios.get('http://localhost:5000/login');
            // const authUrl = response.data.url;
            window.location.href = "http://localhost:5001/auth/google";

        } catch (error) {
            console.error('Error initiating Twitter login', error);
        }

    };

    const handleLogOut = () => {
        window.location.href = "http://localhost:5001/logout";
    }

    return (
        <div className='shadow p-4'>
            <div className='text-xl flex justify-between items-center'>
                <p className='logo'>Incentive</p>
                <Button onClick={profile === null ? handleLogin : handleLogOut} label={profile === null ? "Sign In" : "Sign Out"} />
            </div>
        </div>
    );
}

export default Navbar;
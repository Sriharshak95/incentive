import React, { useEffect, useState, useContext, useMemo } from 'react';
import { AuthenticationContext } from '../context';
import Button from '../components/button';
import isTokenExpired from '../utils/commonUtils';
import deleteCookies from '../utils/commonUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar:React.FC<{toggleSidebar: () => void}> = ({toggleSidebar}) => {

    const { profile, setProfile } = useContext(AuthenticationContext);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/profile`, { credentials: 'include' })
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Authentication failed');
            })
            .then(data => {
                // Store token in localStorage or context
                if (localStorage.getItem('token') === null) {
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
            window.location.href = process.env.REACT_APP_API_URL + "/auth/google";

        } catch (error) {
            console.error('Error initiating Twitter login', error);
        }

    };

    const handleLogOut = () => {
        deleteCookies();
        window.location.href = process.env.REACT_APP_API_URL + "/logout";
    }

    return (
        <div className='shadow p-4'>
            <div className='text-xl flex justify-between items-center'>
                <FontAwesomeIcon icon={faBars} onClick={() => toggleSidebar()} className="cursor-pointer p-3 hover:bg-slate-200 hover:rounded md:hidden" />
                <p className='logo'>Incentive</p>
                <Button onClick={profile === null ? handleLogin : handleLogOut} label={profile === null ? "Sign In" : "Sign Out"} />
            </div>
        </div>
    );
}

export default Navbar;
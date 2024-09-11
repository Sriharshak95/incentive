import { jwtDecode } from 'jwt-decode';

// Function to check if the token is expired
const isTokenExpired = (token: string) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp < currentTime;
};

export default isTokenExpired;

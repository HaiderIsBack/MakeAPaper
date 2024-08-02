import { jwtDecode } from "jwt-decode"

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // Treat token as expired if it cannot be decoded
  }
};

export default isTokenExpired
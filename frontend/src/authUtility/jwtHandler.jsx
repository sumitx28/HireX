//@author Rushikumar Patel

import { jwtDecode } from 'jwt-decode';

const jwtToken = localStorage.getItem("JWTToken") || null;
let user;
if (jwtToken != null) {
    user = jwtDecode(jwtToken);
}

export { jwtToken, user };

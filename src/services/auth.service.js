import axios from 'axios';
require('dotenv');
const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
    login(email, password) {
        console.log('API_URL');
        console.log(API_URL);
        return axios.post(API_URL + '/auth/signIn', {
                email,
                password
            })
            .then(response => {
                if(response.data?.data?.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data.data))
                }

                return response.data;
            })
    }

    logout() {
        localStorage.remoteItem('user');
    }

    register(data) {
        return axios.post(API_URL + '/auth/signUp', {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password
        })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
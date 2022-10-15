import axios from 'axios';
import authHeader from './auth-header';
require('dotenv');

const API_URL = process.env.REACT_APP_API_URL;

class UserService {
    createSupplier(body) {
        return axios.post(API_URL + '/create-supplier', body, { headers: authHeader() }).then(response => { return response.data })
    }
    getSuppliers() {
        return axios.post(API_URL + '/get-suppliers', { headers: authHeader() }).then(response => { return response.data })
    }
    deleteSupplier(body) {
        return axios.post(API_URL + '/delete-supplier', body, { headers: authHeader() }).then(response => { return response.data })
    }
    createProduct(body) {
        return axios.post(API_URL + '/create-product', body, { headers: authHeader() }).then(response => { return response.data })
    }
    getProducts() {
        return axios.post(API_URL + '/get-products', { headers: authHeader() }).then(response => { return response.data })
    }
    getProductInfos() {
        return axios.post(API_URL + '/get-product-infos', { headers: authHeader() }).then(response => { return response.data })
    }
    deleteProduct(body) {
        return axios.post(API_URL + '/delete-product', body, { headers: authHeader() }).then(response => { return response.data })
    }
    createStockHistory(body) {
        return axios.post(API_URL + '/create-stock-history', body, { headers: authHeader() }).then(response => { return response.data })
    }
    getStockHistory() {
        return axios.post(API_URL + '/get-stock-history', { headers: authHeader() }).then(response => { return response.data })
    }
}

export default new UserService();
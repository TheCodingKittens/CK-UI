import axios from "axios";
import {getDomain} from "./domain-utils";


let api = axios.create({
    baseURL: getDomain(),
    headers: {'Content-Type': 'application/json'}
});

const getCurrentToken = () => {
    let token = sessionStorage.getItem('token');
    if (!token) {
        token = crypto.randomUUID();
        sessionStorage.setItem('token', token);
    }
    return token;
};

export {
    api,
    getCurrentToken
};
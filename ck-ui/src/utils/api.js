import axios from "axios";
import {getDomain} from "./domain-utils";


const api = axios.create({
    baseURL: getDomain(),
    headers: {'Content-Type': 'application/json'}
});

export {
    api
};
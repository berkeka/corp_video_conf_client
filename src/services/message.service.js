import axios from 'axios'

import authHeader from './auth-header';

const API_URL = "http://localhost:3001/";

class MessageService{
    getMessages(id){
        return axios
        .get(API_URL + "messages/" + id, {headers: authHeader()})
        .then(response => {
            return response;
        });
    }
}

export default new MessageService()

import axios from 'axios'

import authHeader from './auth-header';

const API_URL = "http://localhost:3001/";

class MessageService{
    getMeetings(){
        return axios
        .get(API_URL + "meeting", {headers: authHeader()})
        .then(response => {
            return response;
        });
    }

    getMeeting(id){
        return axios
        .get(API_URL + "meeting/" + id, {headers: authHeader()})
        .then(response => {
            return response;
        });
    }

    createMeeting(){
        return axios
        .post(API_URL + "meeting", {},  {headers: authHeader()})
        .then(response => {
            return response;
        });
    }
}

export default new MessageService()

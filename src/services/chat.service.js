import axios from 'axios'

import authHeader from './auth-header';

const API_URL = "http://localhost:3001/";

class ChatroomService{
    createChatroom(){
        return axios
        .post(API_URL + "conversation", {conversation: {}}, {headers: authHeader()})
        .then(response => {
            return response;
        });
    }

    getChatroom(){
        return axios
        .get(API_URL + "conversation", {headers: authHeader()})
        .then(response => {
            return response;
        });
    }

    getChatroomId(){
        return this.getChatroom()
            .then(res => {
            if(res.data){
                return res.data.data[0].id
            }
        }).catch(e => {
            console.log(e)
        })
        

    }
}

export default new ChatroomService()

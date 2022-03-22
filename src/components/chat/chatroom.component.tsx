import { Component, useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { MessageBox, ChatItem } from "react-chat-elements-typescript";

import ChatroomService from "../../services/chat.service";
import MessageService from "../../services/message.service";
import ChatConnection from "../../services/chat_connection.service";

//import JitsiMeetJS from "lib-jitsi-meet";


import IMessage from "../../types/message.type";

type Props = any;

type State = {
  content: string,
  loading: boolean,
  message: string,
  messages: IMessage[],
  connection: ChatConnection,
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.createChatroom = this.createChatroom.bind(this);
    this.receivedMessage = this.receivedMessage.bind(this);

    this.state = {
      content: "",
      loading: false,
      message: "",
      messages: [],
      connection: new ChatConnection(1, this.receivedMessage)
    };
  }

  receivedMessage(data: IMessage){
    this.setState({
      messages: this.state.messages.concat([data])
    })
  }

  createChatroom() {
    const connection = this.state.connection;
    ChatroomService.getChatroomId().then(id =>{
      connection.openNewRoom(id);
      MessageService.getMessages(id).then(res => {
        if(res && res.data){
          this.setState({
            messages: res.data
          })
          const el = document.getElementById('messages');
          if(el){
            el.scrollIntoView({block: 'end'});
          }
        }
      })
    });
  }

  sendMessage(formValue: { content: string }) {
    const { content } = formValue;

    const connection = this.state.connection;
    if(content !== ""){
      connection.talk(content, 1);
    }
  }

  render() {
    const { loading, message, messages } = this.state;

    const initialValues = {
      content: "",
    };

    const divStyle = {
      height: '50vh',
      overflow: 'auto'
    } 

    return (
        <main className="C">
        <h1 className="h3 mb-3 fw-normal">Chatroom</h1>
        <button className="w-100 mb-3 btn btn-lg btn-primary" onClick={this.createChatroom}>Join Chatroom</button>
        <Formik
          initialValues={initialValues}
          onSubmit={this.sendMessage}
        >
          <Form>
            <div className="form-floating mb-3">
              <Field name="content" type="text" id="floatingcontent" className="form-control" />
              <label htmlFor="floatingcontent">content</label>
              <ErrorMessage
                name="content"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="mb-3" id="messages" style={divStyle}>
              {messages.map((message) => 
                <ChatItem
                  id={message.id}
                  title={message.sender?.toString()}
                  subtitle={message.content?.toString()}
                  date={new Date()}
                />
              )}
            </div>

            <button type="submit" className="w-100 mb-3 btn btn-lg btn-primary" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Send</span>
            </button>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
        </main>
    );
  }
}

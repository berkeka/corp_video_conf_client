import { Component } from "react";
import { Link } from "react-router-dom";

import ChatroomService from "../services/chat.service";

type Props = any;

type State = {
  email: string,
  password: string,
  loading: boolean,
  message: string
};

export default class Dashboard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.createChatroom = this.createChatroom.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  createChatroom(){
    ChatroomService.createChatroom();
  }

  render() {
    const { loading, message } = this.state;

    const initialValues = {
      email: "",
      password: "",
    };

    return (
        <main>
          <h1 className="h3 mb-3 fw-normal">Dashboard</h1>
          <button type="submit" className="w-20 btn btn-lg btn-primary" onClick={this.createChatroom}>
            <span>Create a Chatroom</span>
          </button>
          <br />
          <Link to={"/chatroom"} className="w-20 btn btn-lg btn-primary">Go to Chatroom</Link>
          <br />
          <Link to={"/meeting"} className="w-20 btn btn-lg btn-primary">Create a Meeting</Link>
        </main>
    );
  }
}

import { Component } from "react";
import { Link } from "react-router-dom";

import ChatroomService from "../services/chat.service";
import MeetingService from "../services/meeting.service";

type Props = any;

type State = {
  email: string,
  password: string,
  message: string,
  meetings: any
};

export default class Dashboard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.createChatroom = this.createChatroom.bind(this);
    this.createMeeting = this.createMeeting.bind(this);
    this.fetchMeetings = this.fetchMeetings.bind(this);

    this.state = {
      email: "",
      password: "",
      message: "",
      meetings: []
    };
  }

  createChatroom(){
    ChatroomService.createChatroom();
  }
  
  createMeeting(){
    MeetingService.createMeeting().then((data) => {
      this.componentDidMount();
    })
  }

  fetchMeetings(){
    return MeetingService.getMeetings();
  }

  componentDidMount() {
    this.fetchMeetings().then((meetings) => {
      this.setState({
        meetings: meetings.data,
      })
    });
  }
  
  render() {
    const { meetings } = this.state;

    return (
      <div>
          <h1 className="h3 mb-3 fw-normal">Dashboard</h1>
          <button type="submit" className="w-20 btn btn-lg btn-primary" onClick={this.createChatroom}>
            <span>Create a Chatroom</span>
          </button>
          <br />
          <Link to={"/chatroom"} className="w-20 btn btn-lg btn-primary">Go to Chatroom</Link>
          <br />
          <button type="submit" className="w-20 btn btn-lg btn-primary" onClick={this.createMeeting}>
            <span>Create a Meeting</span>
          </button>
          <hr />
          <h2>Your Meetings</h2>
          <ul>
            {meetings && meetings.map((meeting:any) =>  
              <li key={meeting.id}><Link to={"/meeting?meet_name=" + meeting.name}>{meeting.name}</Link></li>
            )}
          </ul>
      </div>
    );
  }
}

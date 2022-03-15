import { Component } from "react";
import Jitsi from "react-jitsi";

type Props = any;

type State = {
  content: string,
  loading: boolean,
  message: string,
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "",
      loading: false,
      message: ""
    };
  }

  handleAPI = (JitsiMeetAPI: any) => {
    JitsiMeetAPI.executeCommand('toggleVideo')
  }

  render() {
    const { loading, message} = this.state;

    const initialValues = {
      content: "",
    };

    return (
        <main className="C">
        <h1 className="h3 mb-3 fw-normal">Chatroom</h1>

            <Jitsi
                roomName={'test'}
                displayName={'test'}
                password={'test'}
                onAPILoad={this.handleAPI}
            />)
        </main>
    );
  }
}

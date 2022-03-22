import { Component } from "react";
import Jitsi from "react-jitsi";
import { useSearchParams } from 'react-router-dom';

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
    const frame = document.getElementById('react-jitsi-frame')
    if(frame){

      frame.style.display = 'block';
    }
  }

  render() {
    const { loading, message} = this.state;
    const params = new URLSearchParams(window.location.search)
    const initialValues = {
      content: "",
    };

    return (
        <main className="C">
        <h1 className="h3 mb-3 fw-normal">Chatroom</h1>

            <Jitsi
                roomName={params.get('meet_name') || 'backuproomname123'}
                displayName={'test'}
                onAPILoad={this.handleAPI}
                domain={'meet.jit.si'}
            />)
        </main>
    );
  }
}

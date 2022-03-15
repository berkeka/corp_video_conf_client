import { Component } from "react";

//import UserService from "../services/user.service";

type Props = any;

type State = {
  header: string;
  content: string;
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      header: "Oops",
      content: "404 Not found!"
    };
  }

  render() {
    return (
      <div className="container">
          <h2>{this.state.header}</h2>
          <h3>{this.state.content}</h3>
      </div>
    );
  }
}

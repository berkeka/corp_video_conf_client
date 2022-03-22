import { Component } from "react";

type Props = any;

type State = {
  content: string;
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return (
      <div className="container">
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold">Product Troubleshooting</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim molestias cumque quam reiciendis quod praesentium modi mollitia. Similique magnam ut error non, amet accusantium odit ullam fugit, nostrum deserunt architecto.</p>
          </div>
        </div>
      </div>
    );
  }
}

import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import './login.css'

import AuthService from "../../services/auth.service";

type Props = any;

type State = {
  email: string,
  password: string,
  loading: boolean,
  message: string
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  handleLogin(formValue: { email: string; password: string }) {
    const { email, password } = formValue;

    this.setState({
      message: "",
      loading: true
    });


    AuthService.login(email, password).then(
      () => {
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    const { loading, message } = this.state;

    const initialValues = {
      email: "",
      password: "",
    };

    return (
        <main className="form-signin">
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={this.handleLogin}
        >
          <Form>
            <div className="form-floating">
              <Field name="email" type="text" id="floatingEmail" className="form-control" />
              <label htmlFor="floatingEmail">Email</label>
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-floating">
              <Field name="password" type="password" id="floatingPassword" className="form-control" />
              <label htmlFor="floatingPassword">Password</label>
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <button type="submit" className="w-100 btn btn-lg btn-primary" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
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

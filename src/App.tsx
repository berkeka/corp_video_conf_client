import { Component, Fragment } from 'react';
import {   
  BrowserRouter,
  Routes,
  Route,
  Link, } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Home from "./components/auth/home.component";
import Login from "./components/auth/login.component";
import NotFound from "./components/auth/notfound.component";
import Dashboard from "./components/dashboard.component";
import Chatroom from "./components/chat/chatroom.component";

import EventBus from "./common/EventBus";

type Props = any;

type State = {
  currentUser: string | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const {currentUser} = this.state;

    return (
      <div>
        <header className="p-3 bg-dark text-white">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
              </a>
      
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <Link to={"/"} className="nav-link px-2 text-secondary">Home</Link>
              </ul>
      
              <div className="text-end">
              {(currentUser)? (
                <Fragment>
                  <Link to={"/dashboard"} className="btn btn-outline-light me-2">Dashboard</Link>
                  <Link to={"/login"} className="btn btn-warning" onClick={this.logOut}>Logout</Link>
                </Fragment>
              ) : (
                <Fragment>
                  <Link to={"/login"} className="btn btn-outline-light me-2">Login</Link>
                  <Link to={"/signup"} className="btn btn-warning">Sign Up</Link>
                </Fragment>
              )}
              </div>
            </div>
          </div>
        </header>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chatroom" element={<Chatroom />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;

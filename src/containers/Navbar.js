import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';

class Navbar extends Component {
    render() {
        let { user } = this.props;

        return (
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="http://localhost:8080/">VKPLAY</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            {
                                user.fetchStatus.value === 'LOADING' && (
                                    <div> LOADER </div>
                                )
                            }
                            {
                                user.fetchStatus.value === 'FAILED' && (
                                    <div> {this.props.user.fetchStatus.message} </div>
                                )
                            }
                            {
                                user.fetchStatus.value === 'LOADED' && (
                                    <a href={`http://vk.com/id${user.value.id}`} target="_blank">
                                        <span>{user.value.firstName} {user.value.lastName}</span>
                                        <img
                                            src={user.value.userPic}
                                            className="navbar__userpic img-circle"
                                            width="35"
                                            height="35"
                                        />
                                    </a>
                                )
                            }
                        </li>
                    </ul>
                </div>
              </div>
            </nav>
        );
    }
}

Navbar = connect(state => state)(Navbar);

export default Navbar;
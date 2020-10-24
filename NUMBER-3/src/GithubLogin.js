import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import PopupWindow from './popup';
import { toQuery } from './utils';

class GitHubLogin extends Component {
  static propTypes = {
    buttonText: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    clientId: PropTypes.string.isRequired,
    onRequest: PropTypes.func,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    redirectUri: PropTypes.string,
    scope: PropTypes.string,
  };

  static defaultProps = {
    buttonText: 'Sign in with GitHub',
    scope: 'user',
    onRequest: () => {},
    onSuccess: () => {},
    onFailure: () => {},
  };

  state = {
    name: '',
  };

  onBtnClick = () => {
    const { clientId, scope, redirectUri } = this.props;
    const search = toQuery({
      scope,
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: 'http://localhost:3000/',
    });
    const popup = (this.popup = PopupWindow.open(
      'github-oauth-authorize',
      `https://github.com/login/oauth/authorize?${search}`,
      { height: 1000, width: 600 }
    ));

    // console.log(`https://github.com/login/oauth/authorize?${search}`);

    this.onRequest();
    popup.then(
      (data) => this.onSuccess(data),
      (error) => this.onFailure(error)
    );
  };

  onRequest = () => {
    this.props.onRequest();
  };

  onSuccess = (data) => {
    console.log(data);
    if (!data.code) {
      return this.onFailure(new Error("'code' not found"));
    }
    this.setState({ name: 'Hi, Samsul' });
    this.onGetAccessToken(data);
  };

  onFailure = (error) => {
    this.props.onFailure(error);
  };

  onGetAccessToken = (code) => {
    // const { clientId, clientSecret } = this.props;
    const body = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret:
        process.env.REACT_APP_CLIENT_SECRET ||
        '8d8edd59846fc4ccc16d06effbdd75c02664572e',
      code: code.code,
    };
    console.log(body);
    const options = {
      headers: {
        accept: 'application/json',
      },
    };
    axios
      .post(`https://github.com/login/oauth/access_token`, body, options)
      .then((access_token) => {
        console.log(access_token);
        this.onGetProfile(access_token);
      })
      .catch((err) => this.onFailure(err.message));
    // const data = new FormData();
    // data.append('client_id', process.env.REACT_APP_CLIENT_ID);
    // data.append(
    //   'client_secret',
    //   process.env.REACT_APP_CLIENT_SECRET
    // );
    // data.append('code', code);
    // // Request to exchange code for an access token
    // fetch(`https://github.com/login/oauth/access_token`, {
    //   method: 'POST',
    //   headers: new Headers().append('Content-Type', 'text/plain'),
    //   body: data,
    // })
    //   .then((response) => response.text())
    //   .then((paramsString) => {
    //     let params = new URLSearchParams(paramsString);
    //     const access_token = params.get('access_token');
    //     const scope = params.get('scope');
    //     const token_type = params.get('token_type');
    //     // Request to return data of a user that has been authenticated
    //     return fetch(
    //       `https://api.github.com/user?access_token=${access_token}&scope=${scope}&token_type=${token_type}`
    //     );
    //   })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  onGetProfile = (token) => {
    axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        Authorization: 'token ' + token,
      },
    }).then((response) => {
      console.log(response);
      this.props.onSuccess(response.data);
    });
  };

  render() {
    const { className, buttonText, children } = this.props;
    const attrs = { onClick: this.onBtnClick };

    if (className) {
      attrs.className = className;
    }

    return (
      <>
        <h1>{this.state.name}</h1>
        <button {...attrs}>{children || buttonText}</button>
      </>
    );
  }
}

export default GitHubLogin;

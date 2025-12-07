import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', submitError: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({submitError: true, errorMsg: data.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {submitError, errorMsg, username, password} = this.state

    return (
      <>
        <div className="login-bg-container-mobile">
          <div className="login-top-section-container">
            <img
              src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1764486500/mobile-view-tastykitchen-login-image_qdlqwe.png"
              className="login-page-image"
              alt="website login"
            />
            <h1 className="login-heading">Login</h1>
          </div>
          <form onSubmit={this.submitForm} className="login-container">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              id="username"
              value={username}
              onChange={this.onChangeUsername}
              type="text"
              className="user-input"
            />

            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              id="password"
              value={password}
              onChange={this.onChangePassword}
              type="password"
              className="user-input password-input"
            />
            {submitError && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
        <div className="login-bg-container-desktop">
          <div className="login-content-container-desktop">
            <div className="content-left-section-container-desktop">
              <div className="desktop-login-container">
                <img
                  src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1764493337/chef-hat_ze2mcz.png"
                  className="chef-hat-icon"
                  alt="website logo"
                />
                <h1 className="tasty-kitchen-heading-desktop-login-view">
                  Tasty Kitchens
                </h1>
                <h1 className="login-heading-desktop-login-view">Login</h1>
                <form
                  onSubmit={this.submitForm}
                  className="login-form-desktop-view"
                >
                  <label htmlFor="username" className="label-desktop-view">
                    USERNAME
                  </label>
                  <input
                    id="username"
                    value={username}
                    onChange={this.onChangeUsername}
                    type="text"
                    className="user-input-desktop-view"
                  />
                  <label htmlFor="password" className="label-desktop-view">
                    PASSWORD
                  </label>
                  <input
                    id="password"
                    value={password}
                    onChange={this.onChangePassword}
                    type="password"
                    className="user-input-desktop-view password-input-desktop-view"
                  />
                  {submitError && (
                    <p className="error-msg-desktop-view">{errorMsg}</p>
                  )}
                  <button type="submit" className="login-btn-desktop-view">
                    Login
                  </button>
                </form>
              </div>
            </div>
            <div className="content-right-section-container-desktop">
              <img
                src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1764495620/desktop-view-tastykitchen-login-image_vz7udt.png"
                className="tasty-kitchen-desktop-view-image"
                alt="website login"
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Login

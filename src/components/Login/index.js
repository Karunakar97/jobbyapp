import {Component} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', failureError: '', isLoginFailed: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 7})
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({isLoginFailed: true, failureError: errorMsg})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  renderFormContainer = () => {
    const {failureError, isLoginFailed} = this.state
    return (
      <form onSubmit={this.onClickLogin} className="form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="jobby-weSite-logo"
        />
        <div className="user-Input-Container">
          <label htmlFor="userName" className="username-label">
            USERNAME
          </label>
          <input
            type="text"
            id="userName"
            placeholder="Username"
            className="input-el"
            onChange={this.onChangeUsername}
          />
        </div>
        <div className="user-Input-Container">
          <label htmlFor="password" className="username-label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="input-el"
            onChange={this.onChangePassword}
          />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
        {isLoginFailed && <p className="failure-msg">* {failureError}</p>}
      </form>
    )
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-bg-container">
        <div className="jobby-form-container">{this.renderFormContainer()}</div>
      </div>
    )
  }
}

export default withRouter(Login)

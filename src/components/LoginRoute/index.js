import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginRoute extends Component {
  state = {loginError: false, username: '', password: '', errorMsg: ''}

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    this.setState({username: '', password: ''})
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
      this.setState({loginError: false})
    } else {
      this.setState({loginError: true, errorMsg: data.error_msg})
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderFormContainer = () => {
    const {loginError, username, password, errorMsg} = this.state

    return (
      <form onSubmit={this.onSubmitForm} className="form-container">
        <label htmlFor="username" className="label-el">
          USERNAME
        </label>
        <input
          value={username}
          onChange={this.onChangeUserName}
          id="username"
          type="text"
          placeholder="Username"
          className="inp-el"
        />
        {/* Password input */}
        <label htmlFor="password" className="label-el">
          PASSWORD
        </label>
        <input
          value={password}
          onChange={this.onChangePassword}
          id="password"
          type="password"
          placeholder="Password"
          className="inp-el"
        />
        <button type="submit" className="login-btn-el btn-el">
          Login
        </button>
        {loginError && <p className="error-el">*{errorMsg}</p>}
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card-container">
          <img
            className="login-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          {this.renderFormContainer()}
        </div>
      </div>
    )
  }
}

export default LoginRoute

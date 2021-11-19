import {Component} from 'react'

import './index.css'

import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

const initialBackgroundColors = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
  'color6',
]

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    checkboxDefault: false,
    searchInput: '',
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onClickAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const initialBackgroundColorClassNames = `initial-container ${
      initialBackgroundColors[
        Math.ceil(Math.random() * initialBackgroundColors.length - 1)
      ]
    }`

    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      initialClassName: initialBackgroundColorClassNames,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  renderAddPasswordForm = () => {
    const {websiteInput, usernameInput, passwordInput} = this.state
    console.log()
    return (
      <form className="form" onSubmit={this.onClickAddPassword}>
        <h1 className="add-password-heading">Add New Password</h1>
        <div className="input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
            alt="website"
            className="input-img"
          />
          <input
            type="text"
            placeholder="Enter Website"
            className="input"
            value={websiteInput}
            onChange={this.onChangeWebsiteInput}
          />
        </div>
        <div className="input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            alt="username"
            className="input-img"
          />
          <input
            type="text"
            placeholder="Enter Username"
            className="input"
            value={usernameInput}
            onChange={this.onChangeUsernameInput}
          />
        </div>
        <div className="input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
            alt="password"
            className="input-img"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="input"
            value={passwordInput}
            onChange={this.onChangePasswordInput}
          />
        </div>
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
    )
  }

  renderNoPasswords = () => {
    const imgUrl =
      'https://assets.ccbp.in/frontend/react-js/no-passwords-img.png'
    return (
      <div>
        <img src={imgUrl} alt="no passwords" className="no-passwords-img" />
        <p className="no-passwords-text">No Passwords</p>
      </div>
    )
  }

  getSearchList = () => {
    const {passwordsList, searchInput} = this.state
    const searchResults = passwordsList.filter(eachPassword =>
      eachPassword.password.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResults
  }

  renderPasswordsList = () => {
    const {checkboxDefault} = this.state

    const searchList = this.getSearchList()
    return (
      <ul className="passwords-list">
        {searchList.map(eachPassword => (
          <PasswordItem
            key={eachPassword.id}
            passwordDetails={eachPassword}
            onDeletePassword={this.onDeletePassword}
            isChecked={checkboxDefault}
          />
        ))}
      </ul>
    )
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    this.setState({
      passwordsList: passwordsList.filter(
        eachPassword => eachPassword.id !== id,
      ),
    })
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({checkboxDefault: !prevState.checkboxDefault}))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {checkboxDefault} = this.state
    const searchList = this.getSearchList()
    const passwordsCount = searchList.length
    return (
      <div className="app-container">
        <div className="responsive-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="add-password-container">
            {this.renderAddPasswordForm()}

            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-img-sm"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-lg"
            />
          </div>
          <div className="passwords-container">
            <div className="content-container">
              <div className="passwords-count-and-search-container">
                <div className="passwords-count-container">
                  <h1 className="passwords-count-label">Your Passwords</h1>
                  <p className="passwords-count">{passwordsCount}</p>
                </div>
                <div className="search-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-img"
                  />
                  <input
                    type="search"
                    placeholder="Search"
                    className="search-input"
                    onChange={this.onChangeSearchInput}
                  />
                </div>
              </div>
              <hr className="line" />
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={checkboxDefault}
                  onChange={this.onChangeCheckbox}
                  id="checkbox"
                />
                <label htmlFor="checkbox" className="checkbox-label">
                  Show passwords
                </label>
              </div>
              {passwordsCount > 0
                ? this.renderPasswordsList()
                : this.renderNoPasswords()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager

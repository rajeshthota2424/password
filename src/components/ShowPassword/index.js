import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

import AddPassword from '../AddPassword'

class ShowPassword extends Component {
  state = {
    count: 0,
    passwordsList: [],
    userNameInput: '',
    websiteInput: '',
    passwordInput: '',
    searchInput: '',
    deleteImage: false,
  }

  onIncrementCount = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  toggleIsImage = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.map(eachPassword => {
        if (id === eachPassword.id) {
          return {...eachPassword, isStarred: !eachPassword.isStarred}
        }
        return eachPassword
      }),
    }))
  }

  onFilter = () => {
    const {deleteImage} = this.state

    this.setState({
      deleteImage: !deleteImage,
    })
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userNameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onShowPassword = event => {
    event.preventDefault()
    const {userNameInput, websiteInput, passwordInput, searchInput} = this.state
    const newShowPassword = {
      id: v4(),
      userName: userNameInput,
      website: websiteInput,
      password: passwordInput,
      search: searchInput,
      deleteImage: false,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newShowPassword],
      userNameInput: '',
      websiteInput: '',
      passwordInput: '',
      searchInput: '',
    }))
  }

  getShowPasswordsList = () => {
    const {passwordsList, newShowPassword} = this.state
    if (newShowPassword) {
      return passwordsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return passwordsList
  }

  render() {
    const {
      userNameInput,
      websiteInput,
      passwordInput,
      searchInput,
      deleteImage,
    } = this.state
    const deleteClassName = deleteImage ? 'deleted' : 'not-deleted'
    const showPasswordsList = this.getShowPasswordsList()

    return (
      <div className="bg-container">
        <div className="app-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            className="nav_image"
            alt="app logo"
          />
          <div className="responsive-container">
            <div className="appointments-container">
              <div className="add-appointment-container">
                <form className="form" onSubmit={this.onShowPassword}>
                  <h1 className="add-appointment-heading">Add NewPassword</h1>
                  <input
                    type="text"
                    id="title"
                    value={websiteInput}
                    onChange={this.onChangeWebsite}
                    className="input"
                    img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    placeholder="Enter Website"
                  />
                  <input
                    type="text"
                    id="name"
                    value={userNameInput}
                    onChange={this.onChangeUserName}
                    className="input"
                    img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    placeholder="Enter Username"
                  />
                  <input
                    type="text"
                    id="password"
                    value={passwordInput}
                    onChange={this.onChangePassword}
                    className="input"
                    img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    placeholder="Enter Password"
                  />
                  <button
                    type="submit"
                    className="add-button"
                    onClick={this.onIncrementCount}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className={`filter-style ${deleteClassName}`}
                    onClick={this.onFilter}
                  >
                    delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-container">
          <div className="btm">
            <h1 className="head">
              Your Passwords <span className="counter-value">{0}</span>
            </h1>

            <input
              type="search"
              id="search"
              value={searchInput}
              onChange={this.onSearchInput}
              placeholder="search"
            />
          </div>

          <hr className="hr" />
          <div className="img_container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no password"
              className="appointments-img"
            />
            <input type="checkbox" id="chick" onClick={ShowPassword} />
            <label htmlFor="checkbox" className="label">
              Show Passwords
            </label>
          </div>
          <div>
            <ul className="appointments-list">
              {showPasswordsList.map(eachPassword => (
                <AddPassword
                  key={eachPassword.id}
                  passwordDetails={eachPassword}
                  toggleIsImage={this.toggleIsImage}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowPassword

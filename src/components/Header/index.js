import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {IoMenu} from 'react-icons/io5'
import {IoMdCloseCircle} from 'react-icons/io'

import './index.css'

class Header extends Component {
  state = {showMenu: false}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderMenu = () => {
    const location = window.location.pathname
    const isHomeActive = location === '/' ? 'active' : ''
    const isCartActive = location === '/cart' ? 'active' : ''

    return (
      <li className="hamburger-items-container">
        <div className="hamburger-items">
          <Link to="/" className="link-item">
            <p className={`${isHomeActive} home-text`}>Home</p>
          </Link>
          <Link to="/cart" className="link-item">
            <p className={`${isCartActive} cart-text`}>Cart</p>
          </Link>
          <button
            onClick={this.onClickLogout}
            type="button"
            className="logout-btn"
          >
            Logout
          </button>
        </div>
        <button
          onClick={this.onClickHideMenu}
          type="button"
          className="close-btn"
        >
          <IoMdCloseCircle className="close-icon" />
        </button>
      </li>
    )
  }

  onClickShowMenu = () => {
    this.setState({showMenu: true})
  }

  onClickHideMenu = () => {
    this.setState({showMenu: false})
  }

  render() {
    const {showMenu} = this.state

    const location = window.location.pathname
    const isHomeActive = location === '/' ? 'active' : ''
    const isCartActive = location === '/cart' ? 'active' : ''

    return (
      <>
        <ul className="nav-bar">
          <li className="navbar-item">
            <Link to="/" className="link-item">
              <div className="tasty-kitchens-logo-container">
                <img
                  src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1764493337/chef-hat_ze2mcz.png"
                  className="tasty-kitchens-logo"
                  alt="website logo"
                />
                <h1 className="tasty-kitchens-heading">Tasty Kitchens</h1>
              </div>
            </Link>

            <button
              onClick={this.onClickShowMenu}
              type="button"
              className="hamburger-btn"
            >
              <IoMenu className="hamburger-icon" />
            </button>
          </li>
          {showMenu && this.renderMenu()}
        </ul>

        <ul className="desktop-nav-bar">
          <Link to="/" className="link-item">
            <li className="desktop-tasty-kitchens-logo-container">
              <img
                src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1764493337/chef-hat_ze2mcz.png"
                className="tasty-kitchens-logo-desktop"
                alt="website logo"
              />
              <h1 className="tasty-kitchens-heading-desktop">Tasty Kitchens</h1>
            </li>
          </Link>
          <li className="nav-items-container-desktop">
            <Link to="/" className="link-item">
              <p className={`${isHomeActive} home-text`}>Home</p>
            </Link>
            <Link to="/cart" className="link-item">
              <p className={`${isCartActive} cart-text`}>Cart</p>
            </Link>
            <button
              onClick={this.onClickLogout}
              type="button"
              className="logout-btn"
            >
              Logout
            </button>
          </li>
        </ul>
      </>
    )
  }
}

export default withRouter(Header)

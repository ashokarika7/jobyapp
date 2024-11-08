import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcase} from 'react-icons/bs'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      {/* large-container */}

      <div className="large-nav-container">
        <Link className="li-el-header" to="/">
          <img
            className="nav-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>
        <div className="links-container">
          <Link className="li-el-header" to="/">
            <p>Home</p>
          </Link>
          <Link className="li-el-header" to="/jobs">
            <p>Jobs</p>
          </Link>
        </div>
        <button
          onClick={onClickLogout}
          type="button"
          className="btn-el logout-btn"
        >
          Logout
        </button>
      </div>
      {/* small-container */}
      <div className="mobile-container">
        <Link to="/" className="li-el-header">
          <img
            className="nav-logo-sm"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>
        <ul className="links-logout-container">
          <li>
            <Link to="/" className="li-el-header">
              <IoMdHome className="header-react-icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="li-el-header">
              <BsBriefcase className="header-react-icon" />
            </Link>
          </li>
          <li>
            <button
              onClick={onClickLogout}
              type="button"
              aria-label="logout"
              className="btn-el logout-sm-btn"
            >
              <FiLogOut className="header-react-icon" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)

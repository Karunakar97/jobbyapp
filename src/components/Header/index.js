import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-bg-container ">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-web-logo"
        />
      </Link>
      <div className="mobile-view">
        <Link to="/">
          <AiFillHome className="home-icon" />
        </Link>
        <Link to="/jobs">
          <BsFillBriefcaseFill className="home-icon" />
        </Link>
        <FiLogOut className="home-icon" onClick={onClickLogout} />
      </div>
      <ul className="md-lg-view">
        <ul className="home-jobs-cont">
          <Link to="/" className="link">
            <li className="home-jobs-para">Home</li>
          </Link>
          <Link to="/jobs" className="link">
            <li className="home-jobs-para">Jobs</li>
          </Link>
          <li>{}</li>
        </ul>
        <button
          type="button"
          className="logout-button1"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </ul>
    </nav>
  )
}

export default withRouter(Header)

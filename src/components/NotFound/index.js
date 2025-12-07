import {Link} from 'react-router-dom'

import './index.css'

const NotFound = props => {
  const {history} = props

  const onClickRedirectToHomePage = () => {
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1765020632/not-found-image_r6wjhl.png"
        className="not-found-image"
        alt="not found"
      />
      <h1 className="page-not-found-text">Page Not Found</h1>
      <p className="page-not-found-description">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <Link to="/">
        <button type="button" className="home-page-btn">
          Home Page
        </button>
      </Link>
    </div>
  )
}

export default NotFound

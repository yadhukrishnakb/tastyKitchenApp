import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer">
    <div className="website-logo-container-footer">
      <img
        src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1764662819/chef-hat-white_hyf3ha.png"
        className="website-logo-footer"
        alt="website-footer-logo"
      />
      <h1 className="tasty-kitchens-heading-footer">Tasty Kitchens</h1>
    </div>
    <p className="website-about-footer">
      The only thing we are serious about is food. <br /> Contact us on
    </p>
    <div className="social-icons-container-footer">
      <FaPinterestSquare
        testid="pintrest-social-icon"
        className="social-icon pinterest"
      />
      <FaInstagram
        testid="instagram-social-icon"
        className="social-icon instagram"
      />
      <FaTwitter testid="twitter-social-icon" className="social-icon twitter" />
      <FaFacebookSquare
        testid="facebook-social-icon"
        className="social-icon facebook"
      />
    </div>
  </div>
)

export default Footer

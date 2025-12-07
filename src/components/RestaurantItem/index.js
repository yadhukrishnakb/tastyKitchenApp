import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'

import './index.css'

const RestaurantItem = props => {
  const {data} = props
  const {id, imageUrl, cuisine, rating, totalReviews, name} = data

  return (
    <Link to={`/restaurant/${id}`} className="restaurant-link-item">
      <li testid="restaurant-item" className="restaurant-item">
        <img src={imageUrl} className="restaurant-image" alt="restaurant" />
        <div className="restaurant-details-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="restaurant-rating-container">
            <FaStar className="star-icon" />
            <p className="rating-text">
              {rating}
              <span className="restaurant-total-reviews">
                ({totalReviews} ratings)
              </span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem

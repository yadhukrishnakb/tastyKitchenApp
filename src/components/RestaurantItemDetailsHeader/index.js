import {FaStar} from 'react-icons/fa'

import './index.css'

const RestaurantItemDetailsHeader = props => {
  const {data} = props
  const {imageUrl, name, cuisine, location, rating, reviewsCount, costForTwo} =
    data

  return (
    <div className="restaurant-item-details-header">
      <div className="restaurant-item-details-header-content-container">
        <img
          src={imageUrl}
          className="restaurant-item-details-header-image"
          alt="restaurant"
        />
        <div className="estaurant-item-details-header-text-container">
          <h1 className="restaurant-item-details-header-restaurant-name ">
            {name}
          </h1>
          <p className="restaurant-item-details-header-cuisine">{cuisine}</p>
          <p className="restaurant-item-details-header-restaurant-location">
            {location}
          </p>
          <div className="restaurant-item-details-header-rating-cost-for-two-container">
            <div className="restaurant-item-details-header-rating-reviews-container">
              <div className="restaurant-item-details-header-rating-container">
                <FaStar className="restaurant-item-details-header-star-icon" />
                <p className="restaurant-item-details-header-rating">
                  {rating}
                </p>
              </div>
              <p className="restaurant-item-details-header-total-reviews">
                {reviewsCount}+ Ratings
              </p>
            </div>

            <hr className="v-line" />

            <div className="estaurant-item-details-header-cost-for-two-container">
              <p className="cost-for-two">{costForTwo}</p>
              <p className="cost-for-two-text">Cost for two</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantItemDetailsHeader

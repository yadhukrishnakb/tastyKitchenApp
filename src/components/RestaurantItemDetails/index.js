import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import RestaurantItemDetailsHeader from '../RestaurantItemDetailsHeader'
import RestaurantItemDetailsFoodItem from '../RestaurantItemDetailsFoodItem'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantItemDetails extends Component {
  state = {
    restaurantDetails: {},
    apiStatus: apiStatusConstants.inProgress,
    cart: [],
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getCartData = () => {
    const cartData = localStorage.getItem('cartData')

    if (cartData !== null) {
      const parsedData = JSON.parse(cartData)
      console.log(parsedData)
      this.setState({cart: parsedData})
    }
  }

  getRestaurantData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        foodItems: data.food_items.map(eachItem => ({
          cost: eachItem.cost,
          foodType: eachItem.food_type,
          id: eachItem.id,
          imageUrl: eachItem.image_url,
          name: eachItem.name,
          rating: eachItem.rating,
        })),
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }

      this.setState(
        {
          restaurantDetails: updatedData,
          apiStatus: apiStatusConstants.success,
        },
        this.getCartData,
      )
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  addToLocalStorage = () => {
    const {cart} = this.state
    localStorage.setItem('cartData', JSON.stringify(cart))
  }

  onAddItem = foodItem => {
    const {cart} = this.state
    const isIncluded = cart.find(each => each.id === foodItem.id)

    if (isIncluded === undefined) {
      if (foodItem.quantity === 0) {
        return
      }

      this.setState(
        prevState => ({
          cart: [...prevState.cart, foodItem],
        }),
        this.addToLocalStorage,
      )
    }
  }

  onRemoveItem = id => {
    const {cart} = this.state

    const filteredCartList = cart.filter(eachItem => eachItem.id !== id)
    this.setState({cart: filteredCartList}, this.addToLocalStorage)
  }

  getQuantity = id => {
    const {cart} = this.state

    const quantity = cart.find(each => each.id === id)
    if (quantity === undefined) {
      return 0
    }

    return quantity.quantity
  }

  onDecrementQuantity = id => {
    this.setState(
      prevState => ({
        cart: prevState.cart
          .map(eachItem => {
            if (eachItem.id === id) {
              const updatedtQuantity =
                eachItem.quantity > 0 ? eachItem.quantity - 1 : 0
              const updatedtCost =
                (eachItem.cost / eachItem.quantity) * updatedtQuantity
              return {
                cost: updatedtCost,
                quantity: updatedtQuantity,
                id: eachItem.id,
                imageUrl: eachItem.imageUrl,
                name: eachItem.name,
              }
            }
            return eachItem
          })
          .filter(eachItem => eachItem.quantity !== 0),
      }),
      this.addToLocalStorage,
    )
  }

  onIncrementQuantity = id => {
    this.setState(
      prevState => ({
        cart: prevState.cart
          .map(eachItem => {
            if (eachItem.id === id) {
              const updatedQuantity = eachItem.quantity + 1
              const updatedtCost =
                (eachItem.cost / eachItem.quantity) * updatedQuantity
              return {
                cost: updatedtCost,
                quantity: updatedQuantity,
                id: eachItem.id,
                imageUrl: eachItem.imageUrl,
                name: eachItem.name,
              }
            }
            return eachItem
          })
          .filter(eachItem => eachItem.quantity !== 0),
      }),
      this.addToLocalStorage,
    )
  }

  onClickReloadRestaurantItemDetails = () => {
    this.getRestaurantData()
  }

  renderRestaurantItemDetails = () => {
    const {restaurantDetails, cart} = this.state
    const {foodItems} = restaurantDetails

    return (
      <div className="restaurant-item-details-content-container">
        <RestaurantItemDetailsHeader data={restaurantDetails} />
        <div className="restaurant-item-details-food-items-bg-container">
          <ul className="restaurant-item-details-food-items-container">
            {foodItems.map(eachItem => (
              <RestaurantItemDetailsFoodItem
                data={eachItem}
                isItemInCart={cart.some(each => each.id === eachItem.id)}
                onAddItem={this.onAddItem}
                onRemoveItem={this.onRemoveItem}
                itemQuantity={this.getQuantity(eachItem.id)}
                onDecrementQuantity={this.onDecrementQuantity}
                onIncrementQuantity={this.onIncrementQuantity}
                key={eachItem.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div
      className="restaurant-item-details-loader-container"
      testid="restaurant-details-loader"
    >
      <Loader type="Oval" color="#F7931E" height="32" width="32" />
    </div>
  )

  renderFailure = () => (
    <div className="restaurant-item-details-failure-container">
      <button
        onClick={this.onClickReloadRestaurantItemDetails}
        type="button"
        className="restaurant-item-details-reload-btn"
      >
        Reload
      </button>
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="restaurant-item-details-bg-container">
          {this.renderContent()}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantItemDetails

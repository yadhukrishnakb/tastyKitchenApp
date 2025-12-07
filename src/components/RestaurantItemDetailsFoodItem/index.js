import {Component} from 'react'
import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {IoMdCloseCircle} from 'react-icons/io'

import './index.css'

class RestaurantItemDetailsFoodItem extends Component {
  state = {quantity: 1}

  onClickAddBtn = () => {
    const {data, onAddItem} = this.props
    const {cost, id, imageUrl, name} = data
    const {quantity} = this.state
    const recalculatedCost = quantity * cost
    const product = {
      cost: cost * 1,
      quantity: 1,
      id,
      imageUrl,
      name,
    }

    onAddItem(product)
  }

  onClickRemoveItem = () => {
    const {onRemoveItem} = this.props
    const {data} = this.props
    const {id} = data
    onRemoveItem(id)
    this.setState({quantity: 1})
  }

  onClickDecrement = () => {
    const {onDecrementQuantity, data} = this.props
    const {id} = data
    onDecrementQuantity(id)
  }

  onClickIncrement = () => {
    const {onIncrementQuantity, data} = this.props
    const {id} = data
    onIncrementQuantity(id)
  }

  counter = (itemQuantity, isItemInCart) =>
    itemQuantity > 0 ? (
      <div className="restaurant-food-item-counter-container">
        <button
          testid="decrement-count"
          onClick={this.onClickDecrement}
          type="button"
          className={
            isItemInCart
              ? 'quantity-adjuster-btn-food-item'
              : 'quantity-adjuster-btn-food-item'
          }
        >
          -
        </button>
        {itemQuantity > 0 ? (
          <span testid="active-count" className="quantity-food-item">
            {itemQuantity}
          </span>
        ) : null}
        <button
          testid="increment-count"
          onClick={this.onClickIncrement}
          type="button"
          className={
            isItemInCart
              ? 'quantity-adjuster-btn-food-item'
              : 'quantity-adjuster-btn-food-item'
          }
        >
          +
        </button>
      </div>
    ) : null

  render() {
    const {data, isItemInCart, itemQuantity} = this.props
    const {name, imageUrl, rating, cost} = data
    //const {quantity} = this.state

    return (
      <li testid="foodItem" className="restaurant-item-details-food-item">
        <img src={imageUrl} className="food-item-image" alt="food item" />
        <div className="food-item-details-container">
          <h1 className="food-item-name">{name}</h1>
          <span className="food-item-cost ruppe-symbol">₹</span>
          <p className="food-item-cost">{cost}</p>
          <span className="food-item-cost">.00</span>
          <div className="food-item-rating-container">
            <FaStar className="food-item-star-icon" />
            <p className="food-item-rating">{rating}</p>
          </div>
          <div>
            {itemQuantity === 0
              ? null
              : this.counter(itemQuantity, isItemInCart)}

            <div className="btn-link-item-container">
              <button
                onClick={this.onClickAddBtn}
                type="button"
                className={
                  isItemInCart ? 'food-item-add-btn' : 'food-item-add-btn'
                }
              >
                Add
              </button>
              {itemQuantity !== 0 ? (
                <div className="link-item-close-icon-container">
                  <Link className="go-to-car-link-item" to="/cart">
                    In Cart {`Qt: ${itemQuantity}`}
                  </Link>
                  <button
                    type="button"
                    onClick={this.onClickRemoveItem}
                    className="close-btn"
                  >
                    <IoMdCloseCircle className="close-icon" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default RestaurantItemDetailsFoodItem

/* const RestaurantItemDetailsFoodItem = props => {
  const {
    data,
    toggleBtnCounter,
    onAddItem,
    itemQuantity,
    onDecrementQuantity,
    onIncrementQuantity,
  } = props
  const {cost, foodType, id, imageUrl, name, rating} = data

  const onClickAddBtn = () => {
    const foodItem = {
      cost,
      quantity: 1,
      id,
      imageUrl,
      name,
    }

    onAddItem(foodItem)
  }

  const onClickDecrementBtn = () => {
    onDecrementQuantity(id)
  }

  const onClickIncrementBtn = () => {
    onIncrementQuantity(id)
  }

  const counter = () => (
    <div className="restaurant-food-item-counter-container">
      <button
        data-testid="decrement-count"
        onClick={onClickDecrementBtn}
        type="button"
        className="quantity-adjuster-btn-food-item"
      >
        -
      </button>
      <span data-testid="active-count" className="quantity-food-item">
        {itemQuantity}
      </span>
      <button
        data-testid="increment-count"
        onClick={onClickIncrementBtn}
        type="button"
        className="quantity-adjuster-btn-food-item"
      >
        +
      </button>
    </div>
  )

  return (
    <li data-testid="foodItem" className="restaurant-item-details-food-item">
      <img src={imageUrl} className="food-item-image" alt="food item" />
      <div className="food-item-details-container">
        <h1 className="food-item-name">{name}</h1>
        <p className="food-item-cost">₹ {cost}.00</p>
        <div className="food-item-rating-container">
          <FaStar className="food-item-star-icon" />
          <p className="food-item-rating">{rating}</p>
        </div>
        {toggleBtnCounter ? (
          counter()
        ) : (
          <button
            onClick={onClickAddBtn}
            type="button"
            className="food-item-add-btn"
          >
            Add
          </button>
        )}
      </div>
    </li>
  )
} */

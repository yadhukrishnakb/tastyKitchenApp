import {Component} from 'react'

import Header from '../Header'
import CartItem from '../CartItem'
import Footer from '../Footer'

import './index.css'

class Cart extends Component {
  state = {cartData: [], isOrderPlaced: false}

  componentDidMount() {
    this.getCartData()
  }

  updateLocalStorage = () => {
    const {cartData} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartData))
  }

  clearLocalStorage = () => {
    localStorage.removeItem('cartData')
  }

  getCartData = () => {
    this.setState({isOrderPlaced: false})
    const cartData = localStorage.getItem('cartData')

    if (cartData !== null) {
      const parsedData = JSON.parse(cartData)
      this.setState({
        cartData: parsedData,
      })
    } else {
      this.setState({cartData: []})
    }
  }

  onDecrementQuantity = id => {
    this.setState(
      prevState => ({
        cartData: prevState.cartData.map(eachItem => {
          if (eachItem.id === id) {
            const updatedQuantity =
              eachItem.quantity > 1 ? eachItem.quantity - 1 : 1
            const updatedCost =
              (eachItem.cost / eachItem.quantity) * updatedQuantity

            return {...eachItem, cost: updatedCost, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }),
      this.updateLocalStorage,
    )
  }

  onIncrementQuantity = id => {
    this.setState(
      prevState => ({
        cartData: prevState.cartData.map(eachItem => {
          if (eachItem.id === id) {
            const updatedQuantity = eachItem.quantity + 1
            const updatedCost =
              (eachItem.cost / eachItem.quantity) * updatedQuantity
            return {
              ...eachItem,
              quantity: updatedQuantity,
              cost: updatedCost,
            }
          }
          return eachItem
        }),
      }),
      this.updateLocalStorage,
    )
  }

  getTotalCost = () => {
    const {cartData} = this.state

    const totalCost = cartData.reduce((sum, each) => sum + each.cost, 0)

    return totalCost
  }

  onClickPlaceOrder = () => {
    this.setState({isOrderPlaced: true, cartData: []}, this.clearLocalStorage)
  }

  onClickRedirectToHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  emptyCartView = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1764927721/cooking_image_cart_xudyrv.png"
        className="empty-cart-image"
        alt="empty cart"
      />
      <h1 className="empty-cart-heading">No Orders Yet!</h1>
      <p className="empty-cart-description">
        Your cart is empty. Add something from the menu.
      </p>
      <button
        type="button"
        onClick={this.onClickRedirectToHome}
        className="order-now-btn"
      >
        Order Now
      </button>
    </div>
  )

  orderPlacedView = () => (
    <div className="order-placed-container">
      <img
        src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1764996246/order-placed-image_iwfrvi.png"
        className="order-placed-image"
        alt="payment success"
      />
      <h1 className="payment-successful-text">Payment Successful</h1>
      <p className="greeting-text">
        Thank you for ordering <br />
        Your payment is successfully completed.
      </p>
      <button
        type="button"
        onClick={this.onClickRedirectToHome}
        className="go-to-home-page-btn"
      >
        Go To Home Page
      </button>
    </div>
  )

  renderCartDetails = () => {
    const {cartData, isOrderPlaced} = this.state
    console.log(cartData.length)

    if (isOrderPlaced === true) {
      return this.orderPlacedView()
    }

    if (cartData.length === 0) {
      return this.emptyCartView()
    }

    return (
      <div className="cart-content-container">
        <div className="cart-item-headers-container">
          <h1 className="cart-item-header item">Item</h1>
          <h1 className="cart-item-header quantity-header">Quantity</h1>
          <h1 className="cart-item-header price">Price</h1>
        </div>
        <ul className="cart-items-container">
          {cartData.map(eachItem => (
            <CartItem
              data={eachItem}
              onDecrementQuantity={this.onDecrementQuantity}
              onIncrementQuantity={this.onIncrementQuantity}
              key={eachItem.id}
            />
          ))}
        </ul>
        <div className="cart-total-price-container">
          <p className="order-total-text">Order Total : </p>
          <p className="cart-total-price">₹{this.getTotalCost()}.00</p>
        </div>
        <div className="place-order-btn-container">
          <button
            type="button"
            onClick={this.onClickPlaceOrder}
            className="place-order-btn"
          >
            Place Order
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="cart-bg-container">{this.renderCartDetails()}</div>
        <Footer />
      </>
    )
  }
}

export default Cart

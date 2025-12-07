import './index.css'

const CartItem = props => {
  const {data, onDecrementQuantity, onIncrementQuantity} = props
  const {cost, quantity, id, imageUrl, name} = data

  const onClickDecrementQuantity = () => {
    onDecrementQuantity(id)
  }

  const onClickIncrementQuantity = () => {
    onIncrementQuantity(id)
  }

  return (
    <li testid="cartItem" className="cart-item">
      <img src={imageUrl} className="cart-item-image" alt="cart item" />
      <div className="cart-item-details-container">
        <h1 className="cart-item-name">{name}</h1>
        <div className="cart-item-quantity-adjuster-container">
          <button
            testid="decrement-quantity"
            onClick={onClickDecrementQuantity}
            className="cart-item-decrement-quantity-btn"
            type="button"
          >
            -
          </button>
          <span testid="item-quantity" className="cart-item-quantity">
            {quantity}
          </span>
          <button
            testid="increment-quantity"
            onClick={onClickIncrementQuantity}
            className="cart-item-increment-quantity-btn"
            type="button"
          >
            +
          </button>
        </div>
        <div className="cart-item-cost-container">
          <span>₹</span>
          <p className="cart-item-cost">{cost}</p>
          <span>.00</span>
        </div>
      </div>
    </li>
  )
}

export default CartItem

import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

class Cart extends Component {
  state = {cartData: []}

  componentDidMount() {
    this.getCartData()
  }

  getCartData = () => {
    const cartData = localStorage.getItem('cartData')

    if (cartData !== null) {
      const parsedData = JSON.stringify(cartData)
      this.setState({cartData: parsedData})
    }
  }

  render() {
    return (
      <>
        <Header />
      </>
    )
  }
}

export default Cart

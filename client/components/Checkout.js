import React, {Component} from 'react'
import {connect} from 'react-redux'

import DeliveryForm from './DeliveryForm'
import {getCart} from '../store/order'

class Checkout extends Component {
  async componentDidMount() {
    try {
      await this.props.getCart()
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {cart} = this.props || {}
    return (
      <div>
        <h1>Confirm Cehckout</h1>
        <div>
          <DeliveryForm />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.order.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: userId => dispatch(getCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Elements, StripeProvider} from 'react-stripe-elements'
import DeliveryForm from './DeliveryForm'
import {checkOutCart} from '../store/order'

class Checkout extends Component {
  async componentDidMount(id) {
    try {
      await this.props.checkOutCart(id)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        <h1>Confirm Checkout</h1>
        <div>
          <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
            <Elements>
              <DeliveryForm />
            </Elements>
          </StripeProvider>
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
    checkOutCart: userId => dispatch(checkOutCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

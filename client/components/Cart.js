import React, {Component} from 'react'
import CartItems from './CartItems'
import {connect} from 'react-redux'
import {gotCart, getCart} from '../store/order'
import {withRouter} from 'react-router'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
  }
  handleSubmit(evt) {
    console.log('Yoohoo', evt.target.id)
  }
  render() {
    return (
      <div>
        <CartItems />
        <button onClick={this.handleSubmit}>Change my cart</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('STATE', state)
  return {
    cart: state.order.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCart())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))

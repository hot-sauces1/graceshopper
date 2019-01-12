import React, {Component} from 'react'
// import {connect} from 'react-redux'

// import {getCart} from '../store/order'

export default class DeliveryForm extends Component {
  constructor() {
    super()
    this.state = {
      billName: '',
      billAddress: '',
      shipName: '',
      shipAddress: ''
    }
  }

  async componentDidMount() {
    await this.props.getCart()
    // this.setState({cart: this.props.cart})
  }

  render() {
    const {cart} = this.props || {}
    return (
      <div>
        <h1>Confirm</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <p>Billing</p>
            <label>Name</label>
            <input name="billName" value={this.state.billingbillName} />
            <label>Address</label>
            <input name="billAddress" value={this.state.billing.address} />
            <p>Shipping</p>
            <label>Name</label>
            <input name="ship-name" value={this.state.shipping.name} />
            <label>Address</label>
            <input name="ship-address" value={this.state.shipping.address} />
          </form>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     cart: state.order.cart
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     getCart: userId => dispatch(getCart(userId)),
//    }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import CartItems from './CartItems'
import {getCart, removeItem, updateItem} from '../store/order'
import {withRouter} from 'react-router'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.increase = this.increase.bind(this)
    // this.decrease = this.decrease.bind(this)
  }
  async componentDidMount() {
    await this.props.getCart()
    this.setState({cart: this.props.cart})
  }

  increase(num, evt) {
    updateItem(num, evt)
  }

  decrease(prodId) {}

  handleClick(item) {
    return () => {
      event.preventDefault()
      this.props.removeItem(item)
    }
  }

  handleSubmit(item) {
    return () => {
      event.preventDefault()
      this.props.updateItem(item)
    }
  }

  render() {
    const cart = this.state.cart || []
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((val, idx) => {
              if (val.products && val.products.length) {
                return (
                  <tr key={val.products[0].id}>
                    <td>
                      <img
                        src={val.products[0].image}
                        alt={val.products[0].name}
                        width="50px"
                        height="50px"
                      />
                    </td>
                    <td>{val.products[0].name}</td>
                    <td>${val.products[0].price / 100}</td>
                    <td>1</td>
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          this.setState({
                            cart: this.state.cart.map(
                              cartItem =>
                                cartItem.id === val.id
                                  ? cartItem.quantity++
                                  : cartItem
                            )
                          })
                        }
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          this.setState({
                            cart: [
                              this.state.cart.map(
                                cartItem =>
                                  cartItem.id === val.id
                                    ? cartItem.quantity++
                                    : cartItem
                              )
                            ]
                          })
                        }
                      >
                        -
                      </button>
                    </td>
                    <td>
                      {' '}
                      <button type="button" onClick={this.handleClick(val.id)}>
                        &times;
                      </button>
                    </td>
                  </tr>
                )
              } else {
                // return(
                //   <tr>Your cart is empty! Go fill it up!</tr>
                // )
              }
            })}
          </tbody>
        </table>
        <Link className="link" to="/checkout">
          Checkout
        </Link>
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
    getCart: () => dispatch(getCart()),
    updateItem: id => dispatch(updateItem(id)),
    removeItem: id => dispatch(id)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))

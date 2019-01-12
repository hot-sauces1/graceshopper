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
      cart: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleOnChange = this.handleOnChange.bind(this)
    // this.delete = this.delete.bind(this)
    this.increase = this.increase.bind(this)
    // this.decrease = this.decrease.bind(this)
  }
  async componentDidMount() {
    await this.props.getCart(this.props.match.params.id)
    this.setState({cart: this.props.cart})
  }

  increase(num, evt) {
    console.log('EVT', evt)
    updateItem(num, evt)
  }

  decrease(prodId) {}

  handleClick(item) {
    return () => {
      event.preventDefault()
      this.props.removeItem(item)
    }
  }
  handleOnChange(evt) {
    console.log('That thing', evt.target.value)
  }

  handleSubmit(item) {
    return () => {
      event.preventDefault()
      this.props.updateItem(item)
    }
  }

  render() {
    this.props.cart.orderItems = this.props.cart.orderItems || []
    console.log('PROPS', this.props)
    console.log('STATE', this.state.cart)
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.orderItems.map((val, inx) => {
              return (
                <tr key={val.id}>
                  <td>
                    <img
                      src={val.image}
                      alt={val.name}
                      width="50px"
                      height="50px"
                    />
                  </td>
                  <td>{val.name}</td>
                  <td>{val.price}</td>
                  <td>
                    Total{' '}
                    {/* {`$${(
                      val.quantity * Number(val.price.replace(/[^0-9.-]+/g, ''))
                    ).toFixed(2)}`} */}
                    {val.price}
                  </td>
                  <td>
                    <input
                      type="text"
                      onChange={this.handleOnChange}
                      placeholder={val.quantity}
                    />
                  </td>
                  <td>
                    {' '}
                    {/* <button type="button" onClick={this.handleSubmit(val.id)}>
                      Update
                    </button> */}
                    {/* <button type="button" onClick={() => this.increase(1, val)}> */}
                    <button
                      type="button"
                      onClick={() =>
                        this.setState({
                          cart: {
                            orderItems: this.state.cart.orderItems.map(
                              cartItem =>
                                cartItem.id === val.id
                                  ? cartItem.quantity++
                                  : cartItem
                            )
                          }
                        })
                      }
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        this.setState({
                          cart: {
                            orderItems: this.state.cart.orderItems.map(
                              cartItem =>
                                cartItem.id === val.id
                                  ? cartItem.quantity++
                                  : cartItem
                            )
                          }
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
            })}
          </tbody>
        </table>
        <Link to="/checkout">Checkout</Link>
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
    getCart: userId => dispatch(getCart(userId)),
    updateItem: id => dispatch(updateItem(id)),
    removeItem: id => dispatch(id)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))

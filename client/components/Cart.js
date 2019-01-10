import React, {Component} from 'react'
import CartItems from './CartItems'
import {connect} from 'react-redux'
import {getCart, removeItem, updateItem} from '../store/order'
import {withRouter} from 'react-router'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.delete = this.delete.bind(this)
  }
  async componentDidMount() {
    await this.props.getCart(this.props.match.params.id)
  }

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
    this.props.cart.orderItems = this.props.cart.orderItems || []
    console.log('PROPS', this.props)
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
            {this.props.cart.orderItems.map(val => {
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
                    <input type="text" placeholder={val.quantity} />
                  </td>
                  <td>
                    {' '}
                    <button type="button" onClick={this.handleSubmit(val.id)}>
                      Update
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

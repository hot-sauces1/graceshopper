import React, {Component} from 'react'
import {gotCart, getCart} from '../store/order'

class CartItems extends Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {
    await this.props.getCart(this.props.match.params.id)
  }

  render() {
    console.log('HEREs PROPS', this.props.cart)
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {this.props.cart.map(val => {
            return (
              <tr key={val.id}>
                <td>{val.quantity}</td>
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
                  {`$${(
                    val.quantity * Number(val.price.replace(/[^0-9.-]+/g, ''))
                  ).toFixed(2)}`}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default CartItems

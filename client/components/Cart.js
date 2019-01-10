import React, {Component} from 'react'
import CartItems from './CartItems'
import {connect} from 'react-redux'
import {gotCart, getCart} from '../store/order'
import {withRouter} from 'react-router'

class Cart extends Component {
  constructor(props) {
    super(props)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.getCart(this.props.match.params.id)
  }
  // handleSubmit(id) {
  //   return () =>{
  //     event.preventDefault();
  //     this.props.(id)
  //     //FINISHING ADDING THIS!!
  //   }
  // }

  render() {
    this.props.cart.orderItems = this.props.cart.orderItems || []
    // console.log("PROPS", this.props.cart.orderItems)
    return (
      <div>
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
            {this.props.cart.orderItems.map(val => {
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
                    {/* {`$${(
                      val.quantity * Number(val.price.replace(/[^0-9.-]+/g, ''))
                    ).toFixed(2)}`} */}
                    {val.price}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <button onClick={this.handleSubmit}>Update</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))

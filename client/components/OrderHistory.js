import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getAllOrders} from '../store/order'

class OrderHistory extends Component {
  async componentDidMount() {
    try {
      await this.props.fetchOrders()
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const orders = this.props.orders || []
    return (
      <div>
        <h1>Past Orders</h1>
        <div>
          {orders.map(order => (
            <div key={order.id}>
              <p>
                <strong>Date:</strong> {order.updatedAt}
              </p>
              <p>
                <strong>Items: </strong>
                <ul>
                  {' '}
                  {order.products.map(product => (
                    <li key={product.id}>product.name</li>
                  ))}
                </ul>
              </p>
              <p>
                <strong>Total:</strong> ${order.total}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(getAllOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)

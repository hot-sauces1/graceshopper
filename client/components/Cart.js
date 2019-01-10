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
  componentDidMount() {
    this.props.getCart()
  }
  // handleSubmit(id) {
  //   return () =>{
  //     event.preventDefault();
  //     this.props.(id)
  //     //FINISHING ADDING THIS!!
  //   }
  // }

  render() {
    return (
      <div>
        <CartItems cart={this.props.cart} />
        <button onClick={this.handleSubmit}>Update</button>
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

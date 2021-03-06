import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getProductById} from '../store/product'
import {addItem} from '../store/order'

class SingleItem extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchSingleProduct(this.props.match.params.id)
  }

  handleSubmit(evt) {
    this.props.addItem(evt.singleProduct)
  }

  render() {
    const {singleProduct} = this.props
    return (
      <div>
        <h1>{singleProduct.name}</h1>
        <img
          src={singleProduct.image}
          alt={singleProduct.name}
          width="300px"
          height="400px"
        />
        <h3>${singleProduct.price / 100}</h3>
        <p>{singleProduct.description}</p>
        <button type="submit" onClick={() => this.handleSubmit(this.props)}>
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.product.singleProduct
})

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(getProductById(id)),
    addItem: id => dispatch(addItem(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)

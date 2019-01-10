import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getProductById} from '../store/product'

class SingleItem extends Component {
  async componentDidMount() {
    await this.props.fetchSingleProduct(this.props.match.params.id)
  }

  // handleSubmit(id) {
  //   return () =>{
  //     event.preventDefault();
  //     this.props.(id)
  //     //FINISHING ADDING THIS!!
  //   }
  // }

  render() {
    const {singleProduct} = this.props
    return (
      <div>
        <h1>{singleProduct.name}</h1>
        <img src={singleProduct.image} alt="Ye and Dave Chappelle" />
        <h3>${singleProduct.price}</h3>
        <p>{singleProduct.description}</p>
        <button type="submit" onClick={() => this.handleSubmit(this.props.id)}>
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.product.singleProduct
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(getProductById(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)

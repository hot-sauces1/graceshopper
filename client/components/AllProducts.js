import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getAllProducts} from '../store/product'

class AllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(id) {
    return this.props.history.push(`/products/${id}`)
  }
  async componentDidMount() {
    try {
      await this.props.fetchProducts()
      const {products} = this.props
      this.setState({products})
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    const {products} = this.state
    return (
      <div>
        <h1>Buy our products!</h1>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map(val => {
              return (
                <tr key={val.id}>
                  <td>
                    <img
                      src={val.image}
                      alt={val.name}
                      width="20px"
                      height="20px"
                      onClick={() => this.handleClick(val.id)}
                    />
                  </td>
                  <td onClick={() => this.handleClick(val.id)}>{val.name}</td>
                  <td onClick={() => this.handleClick(val.id)}>{val.price}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.product.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(getAllProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)

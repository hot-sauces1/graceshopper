import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'
// const REMOVE_USER = 'REMOVE_USER’

/**
 * INITIAL STATE
 */
const initialState = {products: [], singleProduct: {}}

/**
 * ACTION CREATORS
 */
const gotAllProducts = allProducts => ({
  type: GOT_ALL_PRODUCTS,
  allProducts
})

const gotSingleProduct = singleProduct => ({
  type: GOT_SINGLE_PRODUCT,
  singleProduct
})

/**
 * THUNK CREATORS
 */
export const getAllProducts = () => async dispatch => {
  try {
    const {data: allProducts} = await axios.get('/api/product')
    console.log('thunk:: ', allProducts)
    dispatch(gotAllProducts(allProducts))
  } catch (err) {
    console.error(err)
  }
}

export const getProductById = productId => async dispatch => {
  try {
    const {data: singleProduct} = await axios.get(`/api/product/${productId}`)
    dispatch(gotSingleProduct(singleProduct))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {
        ...state,
        products: action.allProducts
      }
    case GOT_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.singleProduct
      }
    default:
      return state
  }
}

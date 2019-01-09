import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const initialState = {products: [], singleProduct: {}}

/**
 * ACTION CREATORS
 */
const getAllProducts = allProducts => ({type: GET_ALL_PRODUCTS, allProducts})
const getSingleProduct = singleProduct => ({
  type: GET_SINGLE_PRODUCT,
  singleProduct
})

/**
 * THUNK CREATORS
 */
export const gettingAllProducts = () => async dispatch => {
  try {
    const {data: allProducts} = await axios.get('/api/product')
    dispatch(getAllProducts(allProducts))
  } catch (err) {
    console.error(err)
  }
}

export const gettingProductById = productId => async dispatch => {
  try {
    const {data: singleProduct} = await axios.get(`/api/product/${productId}`)
    dispatch(getSingleProduct(singleProduct))
  } catch (err) {
    console.error(err)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
const GOT_SINGLE_ORDER = 'GOT_SINGLE_ORDER'
const GOT_CART = 'GOT_CART'
// const REMOVE_USER = 'REMOVE_USER’

/**
 * INITIAL STATE
 */
const initialState = {orders: [], singleOrder: {}, cart: []}

/**
 * ACTION CREATORS
 */
const gotAllOrders = allOrders => ({
  type: GOT_ALL_ORDERS,
  allOrders
})

const gotSingleOrder = singleOrder => ({
  type: GOT_SINGLE_ORDER,
  singleOrder
})

const gotCart = cart => ({
  type: GOT_CART,
  cart
})

/**
 * THUNK CREATORS
 */
export const getAllOrders = () => async dispatch => {
  try {
    const {data: allOrders} = await axios.get('/api/order')
    dispatch(gotAllOrders(allOrders))
  } catch (err) {
    console.error(err)
  }
}

export const getOrderById = orderId => async dispatch => {
  try {
    const {data: singleOrder} = await axios.get(`/api/order/${orderId}`)
    dispatch(gotSingleOrder(singleOrder))
  } catch (err) {
    console.error(err)
  }
}

export const getCart = () => async dispatch => {
  try {
    const {data: cart} = await axios.get('/api/order/cart')
    dispatch(gotCart(cart))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_ORDERS:
      return {
        ...state,
        orders: action.allOrders
      }
    case GOT_SINGLE_ORDER:
      return {
        ...state,
        singleOrder: action.singleOrder
      }
    case GOT_CART:
      return {
        ...state,
        cart: action.cart
      }
    default:
      return state
  }
}

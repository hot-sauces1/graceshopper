import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
const GOT_SINGLE_ORDER = 'GOT_SINGLE_ORDER'
const GOT_CART = 'GOT_CART'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART'
const CLEAR_CART = 'CLEAR_CART'
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

const addItemToCart = item => ({
  type: ADD_ITEM_TO_CART,
  item
})

const removeItemFromCart = item => ({
  type: REMOVE_ITEM_FROM_CART,
  item
})

const updateItemFromCart = item => ({
  type: UPDATE_ITEM_IN_CART,
  item
})

const clearCart = () => ({
  type: CLEAR_CART
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

export const getCart = userId => async dispatch => {
  try {
    const {data: cart} = await axios.get(`/api/order/cart/${userId}`)
    dispatch(gotCart(cart))
  } catch (err) {
    console.error(err)
  }
}

export const addItem = (userId, item) => async dispatch => {
  try {
    //clear whether this is item or itemId
    const {data} = await axios.post(`api/order/cart/${userId}`, item)
    dispatch(addItemToCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const removeItem = (userId, itemId) => async dispatch => {
  try {
    //delete from db
    await axios.delete(`api/order/cart/${userId}/${itemId}`)
    //delete on frontend
    dispatch(removeItemFromCart(itemId))
  } catch (error) {
    console.error(error)
  }
}

export const updateItem = (userId, item) => async dispatch => {
  try {
    const {data} = await axios.put(`api/order/cart/${userId}`, item)
    dispatch(updateItemFromCart(data))
  } catch (error) {
    console.error(error)
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
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.item]
      }
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.itemId)
      }
    case UPDATE_ITEM_IN_CART:
      return {
        ...state,
        cart: state.cart.map(
          item => (action.item.id === item.id ? action.item : item)
        )
      }
    default:
      return state
  }
}

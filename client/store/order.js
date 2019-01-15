import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
const GOT_SINGLE_ORDER = 'GOT_SINGLE_ORDER'
const GOT_CART = 'GOT_CART'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const CHECK_OUT = 'CHECK_OUT'

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

const gotCart = cart => ({
  type: GOT_CART,
  cart
})

const checkOut = cart => ({
  type: CHECK_OUT,
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
    const {data: singleOrder} = await axios.post(`/api/order`, orderId)
    dispatch(gotSingleOrder(singleOrder))
  } catch (err) {
    console.error(err)
  }
}

export const getCart = () => async dispatch => {
  try {
    const {data: cart} = await axios.get(`/api/user/cart`)
    dispatch(gotCart(cart))
  } catch (err) {
    console.error(err)
  }
}

export const addItem = item => async dispatch => {
  try {
    const res = await axios.post(`/api/user/cart`, item)
    dispatch(addItemToCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const removeItem = itemId => async dispatch => {
  try {
    await axios.delete(`/api/user/cart`, itemId)
    dispatch(removeItemFromCart(itemId))
  } catch (error) {
    console.error(error)
  }
}

export const checkOutCart = userId => async dispatch => {
  try {
    const {data} = await axios.put(`/api/checkout`, userId)
    dispatch(checkOut(data))
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
        cart: [action.cart]
      }
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.item[0]]
      }
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.itemId)
      }
    case CHECK_OUT:
      return {
        ...state,
        cart: []
      }
    default:
      return state
  }
}

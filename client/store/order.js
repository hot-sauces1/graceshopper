import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
const GOT_SINGLE_ORDER = 'GOT_SINGLE_ORDER'
const GOT_CART = 'GOT_CART'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
// const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART'
// const CLEAR_CART = 'CLEAR_CART'
// const REMOVE_USER = 'REMOVE_USER’

/**
 * INITIAL STATE
 */
//commented out update - we believe we wont need it --> Melanie, Monday 12:04pm
//change cart type from array to object to solve update cart issue --> Jay Friday 4:33 PM.
const initialState = {orders: [], singleOrder: {}, cart: {}}

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

// const updateItemFromCart = item => ({
//   type: UPDATE_ITEM_IN_CART,
//   item
// })

// const clearCart = () => ({
//   type: CLEAR_CART
// })

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
  console.log('ITEM', item)
  try {
    //clear whether this is item or itemId
    const {data} = await axios.post(`/api/user/cart`, item)
    const val = data[0]
    dispatch(addItemToCart(val))
  } catch (error) {
    console.error(error)
  }
}

export const removeItem = itemId => async dispatch => {
  try {
    //delete from db
    await axios.delete(`/api/user/cart`, itemId)
    //delete on frontend
    dispatch(removeItemFromCart(itemId))
  } catch (error) {
    console.error(error)
  }
}

// export const updateItem = (userId, item) => async dispatch => {
//   try {
//     const {data} = await axios.put(`/api/order/cart/${userId}`, item)
//     dispatch(updateItemFromCart(data))
//   } catch (error) {
//     console.error(error)
//   }
// }

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
      console.log('ACTION ITEM', action.item)
      return {
        ...state,
        cart: {
          orderItems: [action.item]
        }
      }
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.itemId)
      }
    // case UPDATE_ITEM_IN_CART:
    //   console.log('ACTION', action.item)
    //   console.log('STATE IN REDUCER \n\n\n\n\n', state)
    //   console.log('STATE.CART IN REDUCER \n\n\n\n\n', state.cart.orderItems)
    //   return {
    //     ...state,
    //     cart: {
    //       orderItems: state.cart.orderItems.map(
    //         item => (action.item.id === item.id ? action.item : item)
    //       )
    //     }
    //   }
    default:
      return state
  }
}

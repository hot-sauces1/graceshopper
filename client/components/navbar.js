import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Welcome to Grace's Slammin Sauces!</h1>
    <nav>
      <div>
        <Link className="link" to="/home">
          Home
        </Link>
        <Link className="link" to="/products">
          Products
        </Link>
        <Link className="link" to="/cart">
          Cart
        </Link>
      </div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <a className="link" href="#" onClick={handleClick}>
            Logout
          </a>
          <Link className="link" to="/order-history">
            Order History
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link className="link" to="/login">
            Login
          </Link>
          <Link className="link" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

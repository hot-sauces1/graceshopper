import React, {Component} from 'react'
import {injectStripe, CardElement} from 'react-stripe-elements'

class DeliveryForm extends Component {
  constructor() {
    super()
    this.state = {
      billFirstName: '',
      billLastName: '',
      billStreet: '',
      billCity: '',
      billState: '',
      billZip: '',
      shipFirstName: '',
      shipLastName: '',
      shipStreet: '',
      shipCity: '',
      shipState: '',
      shipZip: ''
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token)
    })
    this.setState({
      billFirstName: '',
      billLastName: '',
      billStreet: '',
      billCity: '',
      billState: '',
      billZip: '',
      shipFirstName: '',
      shipLastName: '',
      shipStreet: '',
      shipCity: '',
      shipState: '',
      shipZip: ''
    })
  }

  render() {
    const {cart} = this.props || {}
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <h3>Billing</h3>
            <label>First Name</label>
            <input
              required
              name="billFirstName"
              value={this.state.billFirstName}
              onChange={evt => this.setState({billFirstName: evt.target.value})}
            />

            <label>Last Name</label>
            <input
              required
              name="billLastName"
              value={this.state.billLastName}
              onChange={evt => this.setState({billLastName: evt.target.value})}
            />

            <label>Street Address</label>
            <input
              required
              name="billStreet"
              value={this.state.billStreet}
              onChange={evt => this.setState({billStreet: evt.target.value})}
            />

            <label>City</label>
            <input
              required
              name="billCity"
              value={this.state.billCity}
              onChange={evt => this.setState({billCity: evt.target.value})}
            />

            <label>State</label>
            <input
              required
              name="billState"
              value={this.state.billState}
              onChange={evt => this.setState({billState: evt.target.value})}
            />

            <label>Zip Code</label>
            <input
              required
              name="billZip"
              value={this.state.billZip}
              onChange={evt => this.setState({billZip: evt.target.value})}
            />

            <h3>Shipping (if different than billing)</h3>
            <label>First Name</label>
            <input
              name="shipFirstName"
              value={this.state.shipFirstName}
              onChange={evt => this.setState({shipFirstName: evt.target.value})}
            />

            <label>Last Name</label>
            <input
              name="shipLastName"
              value={this.state.shipLastName}
              onChange={evt => this.setState({shipLastName: evt.target.value})}
            />

            <label>Street Address</label>
            <input
              name="shipStreet"
              value={this.state.shipStreet}
              onChange={evt => this.setState({shipStreet: evt.target.value})}
            />

            <label>City</label>
            <input
              name="shipCity"
              value={this.state.shipCity}
              onChange={evt => this.setState({shipCity: evt.target.value})}
            />

            <label>State</label>
            <input
              name="shipState"
              value={this.state.shipState}
              onChange={evt => this.setState({shipState: evt.target.value})}
            />

            <label>Zip Code</label>
            <input
              name="shipZip"
              value={this.state.shipZip}
              onChange={evt => this.setState({shipZip: evt.target.value})}
            />

            <label>
              Card details
              <CardElement style={{base: {fontSize: '18px'}}} />
            </label>
            <button type="submit">Purchase Order</button>
          </form>
        </div>
      </div>
    )
  }
}

export default injectStripe(DeliveryForm)

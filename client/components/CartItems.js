import React, {Component} from 'react'

const cartItems = [
  {
    id: 1,
    title: "Jaygle's Bagels Hot Soy Sauce for Sushi",
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    image: 'http://dummyimage.com/213x206.jpg/cc0000/ffffff',
    price: '$34.45',
    quantity: 18
  },
  {
    id: 2,
    title: 'Sriracha',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    image: 'http://dummyimage.com/195x183.bmp/ff4444/ffffff',
    price: '$121.98',
    quantity: 37
  },
  {
    id: 3,
    title: "Frank's Red Hot Sauce",
    description:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    image: 'http://dummyimage.com/130x229.jpg/cc0000/ffffff',
    price: '$330.72',
    quantity: 113
  }
]

class CartItems extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(val => {
            return (
              <tr key={val.id}>
                <td>{val.quantity}</td>
                <td>
                  <img
                    src={val.image}
                    alt={val.title}
                    width="50px"
                    height="50px"
                  />
                </td>
                <td>{val.title}</td>
                <td>{val.price}</td>
                <td>
                  Total{' '}
                  {`$${(
                    val.quantity * Number(val.price.replace(/[^0-9.-]+/g, ''))
                  ).toFixed(2)}`}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default CartItems

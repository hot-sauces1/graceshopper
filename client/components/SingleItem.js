import React, {Component} from 'react'

class SingleItem extends Component {
  render() {
    return (
      <div>
        <h1>Title</h1>
        <img
          src="https://i.pinimg.com/originals/49/77/9f/49779fdb0331e9671dd974ab2cb300c3.jpg"
          alt="Ye and Dave Chappelle"
        />
        <h3>$29.99</h3>
        <p>
          It really matters and then like it really doesn’t matter. What matters
          is the people who are sparked by it. And the people who are like
          offended by it, it doesn’t matter. Because it's about motivating the
          doers. Because I’m here to follow my dreams and inspire other people
          to follow their dreams, too.
        </p>
        <button onClick={() => console.log('YEEZUS JUST ROSE, AGAIN!!!')}>
          Add To Cart
        </button>
      </div>
    )
  }
}

export default SingleItem

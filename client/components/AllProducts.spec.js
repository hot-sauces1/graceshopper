import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllProducts, {mapState, mapDispatch} from './AllProducts'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import {store} from '../store/index'

const adapter = new Adapter()
enzyme.configure({adapter})

const fakeProducts = [
  {
    id: 10,
    name: 'Alize Sunset',
    description:
      'sed interdum venenatis turpis enim blandit mi in porttitor pede',
    price: 16.12,
    address: '3 Victoria Circle',
    image: 'https://picsum.photos/200/300/?random'
  },
  {
    id: 11,
    name: 'Lettuce - California Mix',
    description:
      'sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget',
    price: 74.47,
    address: '33 Roxbury Center',
    image: 'https://picsum.photos/200/300/?random'
  },
  {
    id: 12,
    name: 'Sardines',
    description:
      'tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare',
    price: 43.64,
    address: '488 Onsgard Parkway',
    image: 'https://picsum.photos/200/300/?random'
  }
]

describe('AllProducts', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<AllProducts store={store} />)
    wrapper.setState({
      products: [
        {
          id: 10,
          name: 'Alize Sunset',
          description:
            'sed interdum venenatis turpis enim blandit mi in porttitor pede',
          price: 16.12,
          address: '3 Victoria Circle',
          image: 'https://picsum.photos/200/300/?random'
        },
        {
          id: 11,
          name: 'Lettuce - California Mix',
          description:
            'sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget',
          price: 74.47,
          address: '33 Roxbury Center',
          image: 'https://picsum.photos/200/300/?random'
        },
        {
          id: 12,
          name: 'Sardines',
          description:
            'tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare',
          price: 43.64,
          address: '488 Onsgard Parkway',
          image: 'https://picsum.photos/200/300/?random'
        }
      ]
    })
    const productImageUrl = wrapper
      .children()
      .find('https://picsum.photos/200/300/?random').props.src
    expect(productImageUrl).to.equal(productImageUrl)
  })
})

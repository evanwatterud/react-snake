import React from 'react'
import ReactDOM from 'react-dom'
import { mount, shallow } from 'enzyme'
import Game from '../components/Game'

describe('Game', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Game />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('handles direction input', () => {
    const eventMap = {
      keydown: null
    }

    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb
    })

    const wrapper = shallow(<Game />)
    const directions = {
      37: 'LEFT', 38: 'UP', 39: 'RIGHT', 40: 'DOWN'
    }

    for (let i = 0; i < 4; i++) {
      eventMap.keydown({ keyCode: i + 37 })
      expect(wrapper.state().direction).toEqual(directions[i + 37])
    }
  })
})

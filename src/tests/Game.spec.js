import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Game from '../components/Game'
import {
  UP, RIGHT, LEFT, DOWN
} from '../helpers/constants'

describe('Game', () => {
  const directions = {
    37: LEFT, 38: UP, 39: RIGHT, 40: DOWN
  }

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

    for (let i = 0; i < 4; i++) {
      eventMap.keydown({ keyCode: 40 - i })
      expect(wrapper.state().direction).toEqual(directions[40 - i])
    }
  })

  it('does not allow the snake to run into itself', () => {
    const eventMap = {
      keydown: null
    }

    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb
    })

    const wrapper = shallow(<Game />)

    eventMap.keydown({ keyCode: 37 })
    expect(wrapper.state().direction).toEqual(RIGHT)

    eventMap.keydown({ keyCode: 38 })
    eventMap.keydown({ keyCode: 40 })
    expect(wrapper.state().direction).toEqual(UP)
  })

  it('allows the game to be paused', () => {
    const eventMap = {
      keydown: null
    }

    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb
    })

    const wrapper = shallow(<Game />)
    eventMap.keydown({ keyCode: 32 })
    expect(wrapper.instance().internalTick).toBeNull()
  })
})

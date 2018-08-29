import React from 'react'
import {
  UP, RIGHT, LEFT, DOWN
} from '../helpers/constants'
import Snake from '../snake'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameArea: Snake.createGameArea(),
      direction: RIGHT
    }
  }

  render() {
    return null
  }
}

export default Game

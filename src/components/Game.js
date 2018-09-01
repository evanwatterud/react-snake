import React from 'react'
import {
  UP, RIGHT, LEFT, DOWN
} from '../helpers/constants'
import Snake from '../snake'
import '../css/game.css'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameArea: Snake.createGameArea(),
      direction: RIGHT
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }

  // Make sure there are no re-renders when direction changes. The only re-renders should be when the internal game tick changes the state of the board, which uses the current direction.
  shouldComponentUpdate(nextProps, nextState) {
    const { direction } = this.state
    if (direction !== nextState.direction) {
      return false
    }
    return true
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress(event) {
    const keys = {
      37: LEFT, 38: UP, 39: RIGHT, 40: DOWN
    }

    if (event.keyCode in keys) {
      this.setState({ direction: keys[event.keyCode] })
    }
  }

  render() {
    const tiles = []
    const { gameArea } = this.state
    let key = 0

    // Create the game area tiles
    for (let row = 0; row < gameArea.length; row++) {
      for (let col = 0; col < gameArea.length; col++) {
        if (gameArea[row][col] === 'S') {
          tiles.push(<div key={key += 1} className="game-tile snake-tile" />)
        } else if (gameArea[row][col] === 'F') {
          tiles.push(<div key={key += 1} className="game-tile fruit-tile" />)
        } else {
          tiles.push(<div key={key += 1} className="game-tile" />)
        }
      }
    }
    return (
      <div className="game-container">
        <span className="game-title">React Snake</span>
        <div className="game-area">
          {tiles}
        </div>
      </div>
    )
  }
}

export default Game

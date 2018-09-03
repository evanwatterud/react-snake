import React from 'react'
import {
  UP, RIGHT, LEFT, DOWN, gameSize
} from '../helpers/constants'
import Snake from '../snake'
import '../css/game.css'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = Snake.initialState
    this.internalTick = null
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
    this.internalTick = setInterval(this.handleGameTick, 75)
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
    clearInterval(this.internalTick)
    this.internalTick = null
  }

  handleKeyPress = (event) => {
    const { direction, snake } = this.state
    const keyPressed = event.keyCode
    const keys = {
      37: LEFT, 38: UP, 39: RIGHT, 40: DOWN
    }
    // Booleans for conditional
    const backwardsRight = direction === LEFT && keyPressed === 39
    const backwardsLeft = direction === RIGHT && keyPressed === 37
    const backwardsDown = direction === UP && keyPressed === 40
    const backwardsUp = direction === DOWN && keyPressed === 38

    if (event.keyCode in keys) {
      // Don't allow the snake to move backwards into itself
      if (snake.length > 0 && (!backwardsRight && !backwardsLeft && !backwardsUp && !backwardsDown)) {
        this.setState({ direction: keys[keyPressed] })
      }
    }
  }

  handleGameTick = () => {
    // Using this.state in the setState call is fine in this case as update isn't mutating state, it returns a new state object based on this.state
    let nextState = Snake.update(this.state) // eslint-disable-line
    if (nextState.snake.length === 0) {
      nextState = Snake.initialState
    }

    this.setState(nextState)
  }

  render() {
    const tiles = []
    const { snake, fruit } = this.state
    let key = 0

    // Create the game area tiles
    for (let row = 0; row < gameSize; row++) {
      for (let col = 0; col < gameSize; col++) {
        if (snake.some((coord) => { return coord.x === col && coord.y === row })) {
          tiles.push(<div key={key += 1} className="game-tile snake-tile" />)
        } else if (row === fruit.y && col === fruit.x) {
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

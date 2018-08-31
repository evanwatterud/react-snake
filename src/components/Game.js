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

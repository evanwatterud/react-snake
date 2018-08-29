import { gameSize } from './helpers/constants'

export default {
  createGameArea() {
    const gameArea = []

    for (let row = 0; row < gameSize; row++) {
      gameArea.push([])
      for (let col = 0; col < gameSize; col++) {
        if (row === 9 && col === 9) {
          gameArea[row].push('S')
        } else {
          gameArea[row].push(' ')
        }
      }
    }

    return gameArea
  }
}

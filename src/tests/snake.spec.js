import Snake from '../snake'

describe('snake.createGameArea', () => {
  it('should create the game board properly', () => {
    const gameArea = Snake.createGameArea()

    expect(gameArea[9][9]).toEqual('S')
  })
})

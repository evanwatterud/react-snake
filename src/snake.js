import {
  gameSize, RIGHT, LEFT, UP, DOWN
} from './helpers/constants'

const initialState = {
  direction: RIGHT,
  snake: [{ x: 9, y: 9 }],
  fruit: { x: 14, y: 15 }
}

const comparePoints = (p1, p2) => { return p1.x === p2.x && p1.y === p2.y }
const randomPos = () => { return { x: Math.floor(Math.random() * gameSize), y: Math.floor(Math.random() * gameSize) } }

const nextHead = (state) => {
  const X = state.snake[0].x + state.direction.x
  const Y = state.snake[0].y + state.direction.y
  const nextX = X >= gameSize ? 0 : (X === -1 ? gameSize - 1 : X)
  const nextY = Y >= gameSize ? 0 : (Y === -1 ? gameSize - 1 : Y)

  return { x: nextX, y: nextY }
}
const willCrash = (state) => { state.snake.find((pt) => { return comparePoints(nextHead(state), pt) }) }
const willEat = (state) => { return comparePoints(nextHead(state), state.fruit) }

const nextSnake = (state) => {
  return willCrash(state)
    ? [] : (
      willEat(state)
        ? [nextHead(state)].concat(state.snake) : [nextHead(state)].concat(state.snake.slice(0, state.snake.length - 1))
    )
}
const nextFruit = (state) => { return willEat(state) ? randomPos() : state.fruit }

const update = (state) => {
  return {
    direction: state.direction,
    snake: nextSnake(state),
    fruit: nextFruit(state)
  }
}

export default { initialState, update }

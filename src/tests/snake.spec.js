import Snake from '../snake'
import {
  UP, RIGHT, DOWN
} from '../helpers/constants'

describe('Snake', () => {
  let state
  beforeEach(() => {
    state = {
      direction: RIGHT,
      snake: [{ x: 9, y: 9 }],
      fruit: Snake.initialState.fruit
    }
  })

  describe('Snake.initialState', () => {
    it('returns the correct initialState', () => {
      expect(state).toEqual(Snake.initialState)
    })
  })

  describe('Snake.update()', () => {
    it('updates single chain snake correctly based on different directions', () => {
      expect(Snake.update(state).snake).toEqual([{ x: 10, y: 9 }])
      state.direction = UP
      expect(Snake.update(state).snake).toEqual([{ x: 9, y: 8 }])
    })

    it('updates mutli chain snake correctly based on different directions', () => {
      state.snake.push({ x: 8, y: 9 }, { x: 7, y: 9 })
      expect(Snake.update(state).snake).toEqual([{ x: 10, y: 9 }, { x: 9, y: 9 }, { x: 8, y: 9 }])
      state.direction = DOWN
      expect(Snake.update(state).snake).toEqual([{ x: 9, y: 10 }, { x: 9, y: 9 }, { x: 8, y: 9 }])
    })

    it('adds a chain to single chain snake when a fruit is eaten', () => {
      state.fruit = { x: 10, y: 9 }
      expect(Snake.update(state).snake.length).toEqual(2)
    })

    it('adds a chain to multi chain snake when a fruit is eaten', () => {
      state.snake.push({ x: 8, y: 9 }, { x: 7, y: 9 })
      state.fruit = { x: 10, y: 9 }
      expect(Snake.update(state).snake).toEqual([{ x: 10, y: 9 }, ...state.snake])
    })

    it('does not change fruit position when not eaten', () => {
      state.fruit = { x: 12, y: 12 }
      expect(Snake.update(state).fruit).toEqual(state.fruit)
    })

    it('changes the fruit position when the fruit is eaten', () => {
      state.fruit = { x: 10, y: 9 }
      expect(Snake.update(state).fruit).not.toBe(state.fruit)
    })

    it('returns an empty snake when it crashes', () => {
      state.snake.push({ x: 8, y: 9 }, { x: 8, y: 10 }, { x: 9, y: 10 }, { x: 10, y: 10 })
      state.direction = DOWN
      expect(Snake.update(state).snake).toEqual([])
    })
  })
})

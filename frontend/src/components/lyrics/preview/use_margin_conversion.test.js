import {renderHook, act, rerender} from '@testing-library/react-hooks'
import useMarginConversion from 'components/lyrics/preview/use_margin_conversion'
test('diff of zero (the time of this syncedLyric and the duration of the video) are equal, and the margin should be 50%', () => {
  const {result} = renderHook(() => useMarginConversion(0, false))
  expect(result.current.marginLeft).toBe('40%')
})
test('diff of -5 should give 0% margin', () => {
  const {result} = renderHook(() => useMarginConversion(-5, false))
  expect(result.current.marginLeft).toBe('0%')
})
test('diff of 5 should give 80% margin', () => {
  const {result} = renderHook(() => useMarginConversion(5, false))
  expect(result.current.marginLeft).toBe('80%')
})
test('marginLeft shouldn\'t change when the element is being dragged but otherwise should', () => {
  var diff = -3
  var dragging = false
  const {result, rerender} = renderHook(() => useMarginConversion(diff, dragging))

  expect(result.current.marginLeft).toBe('16%')

  //change diff
  diff = 3
  rerender()

  //diff should have changed
  expect(result.current.marginLeft).toBe('64%')

  dragging = true
  rerender()
  diff = -3
  rerender()

  //diff should not have changed
  expect(result.current.marginLeft).toBe('64%')
})

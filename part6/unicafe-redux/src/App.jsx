import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const goodCount = useSelector((state) => state.good)
  const okCount = useSelector((state) => state.ok)
  const badCount = useSelector((state) => state.bad)

  const good = () => {
    dispatch({
      type: 'GOOD',
    })
  }

  const ok = () => {
    dispatch({
      type: 'OK',
    })
  }

  const bad = () => {
    dispatch({
      type: 'BAD',
    })
  }

  const reset = () => {
    dispatch({
      type: 'ZERO',
    })
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {goodCount}</div>
      <div>ok {okCount}</div>
      <div>bad {badCount}</div>
    </div>
  )
}

export default App

import { useState } from 'react'

const Display = ({ totalGood, totalNeutral, totalBad }) => {
  return (
    <section>
      <p>
        <b>Good:</b> {totalGood}
      </p>
      <p>
        <b>Neutral:</b> {totalNeutral}
      </p>
      <p>
        <b>Bad:</b> {totalBad}
      </p>
    </section>
  )
}

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text={'good'} />
      <Button handleClick={handleNeutralClick} text={'neutral'} />
      <Button handleClick={handleBadClick} text={'bad'} />
      <h2>stadistics</h2>
      <Display totalGood={good} totalNeutral={neutral} totalBad={bad} />
    </>
  )
}

export default App

import { useState } from 'react'

const Stadistics = ({ totalGood, totalNeutral, totalBad }) => {
  const totalFeedback = totalGood + totalNeutral + totalBad
  const average =
    (totalGood * 1 + totalNeutral * 0 + totalBad * -1) / totalFeedback
  const positive = (totalGood / totalFeedback) * 100

  return (
    <section>
      <StadisticData text={'Good'} value={totalGood} />
      <StadisticData text={'Neutral'} value={totalNeutral} />
      <StadisticData text={'Bad'} value={totalBad} />
      <StadisticData text={'Total'} value={totalFeedback} />
      <StadisticData
        text={'Average'}
        value={isNaN(average) ? 0 : average.toFixed(2)}
      />
      <StadisticData
        text={'Positive'}
        value={isNaN(positive) ? 0 : positive.toFixed(2) + '%'}
      />
    </section>
  )
}

const StadisticData = ({ text, value }) => {
  return (
    <p>
      <b>{text}:</b> {value}
    </p>
  )
}

const Button = ({ text, handleClick }) => {
  const buttonStyle = {
    margin: '2px',
  }

  return (
    <button style={buttonStyle} onClick={handleClick}>
      {text}
    </button>
  )
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
      <Stadistics totalGood={good} totalNeutral={neutral} totalBad={bad} />
    </>
  )
}

export default App

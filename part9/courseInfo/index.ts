import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express()
app.use(express.json());

app.get('/ping', (_req ,res) => {
  res.send('pong')
})

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const {weight, height} = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: "malformatted parameters"});
  } else {
    const bmi = bmiCalculator(Number(weight), Number(height))
    res.json({weight, height, bmi})
  }
});

app.post('/exercises', (req, res) => {
  const { dailyExercises, goal } = req.body

  if (!dailyExercises || !goal) {
    res.status(400).json({ error: 'parameters missing'})
  }

  if (
    !Array.isArray(dailyExercises) ||
    dailyExercises.some((value) => isNaN(Number(value))) ||
    isNaN(Number(goal))
  ) {
    res.status(400).json({ error: 'malformatted parameters'})
  }

  const result = calculateExercises(dailyExercises.map(Number), Number(goal))
  res.json(result)
})


const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
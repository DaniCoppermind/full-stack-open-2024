interface Result {
  periodLength: number,
  trainingDays: number,
  sucess: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface exerciseCalculator { 
  dailyRoutine: number[], 
  goal: number
}

const parseArguments = (args: string[]): exerciseCalculator => {
  if (args.length < 4) throw new Error('Not enough arguments')
  const goal = Number(args[2])
  const dailyRoutine = args.slice(3).map((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error('All arguments must be numbers')
    }
    return Number(arg)
  })

  return { dailyRoutine, goal }
}

export const calculateExercises = (dailyRoutine: number[], goal: number): Result => {
  let trainingDays = 0;
  let totalHours= 0;

  for (let i = 0; i < dailyRoutine.length; i++) {
    if (dailyRoutine[i] > 0) {
      trainingDays++
    }
    totalHours += dailyRoutine[i]
  }

  const average = totalHours / dailyRoutine.length

  let rating: number;
  let ratingDescription: string;

  if (average >= goal) {
    rating = 3
    ratingDescription = 'Great Work! you complete your goal'
  } else if (average >= goal - 0.7) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 1
    ratingDescription = "Mision failed, you didn't reach your goal"
  }
  
  return {
    periodLength: dailyRoutine.length,
    trainingDays,
    sucess: average > goal ? true : false,
    rating,
    ratingDescription,
    target: goal,
    average
  };
};

try {
  const { dailyRoutine, goal } = parseArguments(process.argv);
  console.log(calculateExercises(dailyRoutine, goal));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' ' + error.message;
  }
  console.log(errorMessage);
}
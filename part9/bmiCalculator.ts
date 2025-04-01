interface bmiValues {
  value1: number,
  value2: number
}

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const bmiCalculator = (weight: number, height: number) => {
  const formatedHeight = height / 100
  const bmi = weight / Math.pow(formatedHeight, 2)

  if (bmi < 18.5) {
    console.log("Low (bad weight)")
  } else if (bmi > 18.5 && bmi < 24.9) {
    console.log("Normal (healthy weight)")
  } else if (bmi > 25.0 && bmi < 29.9) {
    console.log("overweight (bad weight)")
  } else {
    console.log("Obesity (dangerous weight)")
  }
}

try {
  const { value1, value2 } = parseArguments(process.argv)
  bmiCalculator(value1, value2)
} catch (error) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
interface totalProps {
  totalExercises: number;
}

export const Total = ({ totalExercises }: totalProps) => {
  return <div>Total Exercises: {totalExercises}</div>;
};

interface contentProps {
  courseParts: CoursePart[];
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

export const Content = ({ courseParts }: contentProps) => {
  return (
    <>
      {courseParts.map((part, index) => (
        <p key={index}>
          {part.name}: {part.exerciseCount}
        </p>
      ))}
    </>
  );
};

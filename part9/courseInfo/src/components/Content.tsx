import { CoursePart } from '../types';
import { Part } from './Part';

interface contentProps {
  courseParts: CoursePart[];
}

export const Content = ({ courseParts }: contentProps) => {
  return (
    <>
      {courseParts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </>
  );
};

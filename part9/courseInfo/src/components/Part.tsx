import { CoursePart } from '../types';
import { assertNever } from '../utils/helpers';

interface partProps {
  part: CoursePart;
}

export const Part = ({ part }: partProps) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div className='part'>
          <p className='title'>
            {part.name} {part.exerciseCount}
          </p>
          <p className='description'>{part.description}</p>
        </div>
      );
    case 'group':
      return (
        <div className='part'>
          <p className='title'>
            {part.name} {part.exerciseCount}
          </p>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div className='part'>
          <p className='title'>
            {part.name} {part.exerciseCount}
          </p>
          submit to {part.backgroundMaterial}
        </div>
      );
    case 'special':
      return (
        <div className='part'>
          <p className='title'>
            {part.name} {part.exerciseCount}
          </p>
          <p className='description'>{part.description}</p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
      );
    default:
      assertNever(part);
  }
};

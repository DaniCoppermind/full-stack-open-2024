import { NonSensitiveDiary } from '../../types';
import './Diaries.css';
interface DiariesProps {
  diaries: NonSensitiveDiary[];
}

export const Diaries = ({ diaries }: DiariesProps) => {
  return (
    <>
      <h1>Diary Entries</h1>
      <section className='grid-diary'>
        {diaries.map((diary) => (
          <div className='diary' key={diary.id}>
            <time dateTime={diary.date}>{diary.date}</time>
            <p>Visibility: {diary.visibility}</p>
            <p>Weather: {diary.weather}</p>
          </div>
        ))}
      </section>
    </>
  );
};

import { useEffect, useState } from 'react';
import { NonSensitiveDiary } from './types';
import { getAllDiaries } from './services/DiaryServices';

import { Diaries } from './components/Diaries/Diaries';
import { DiaryForm } from './components/DiaryForm/DiaryForm';

export const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllDiaries();
      setDiaries(data);
    };

    fetchData();
  }, []);

  return (
    <main>
      <DiaryForm />
      <Diaries diaries={diaries} />
    </main>
  );
};

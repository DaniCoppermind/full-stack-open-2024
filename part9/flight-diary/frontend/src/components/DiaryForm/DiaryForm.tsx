import { SyntheticEvent, useState } from 'react';
import { createDiary } from '../../services/DiaryServices';
import { NewDiary, Visibility, Weather } from '../../types';
import './DiaryForm.css';

export const DiaryForm = () => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const newDiary: NewDiary = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
    };

    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');

    try {
      await createDiary(newDiary);
    } catch (error) {
      console.error('Error creating diary:', error);
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='date'>Date</label>
          <input
            className='input-value'
            required
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='weather'>Weather</label>
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            className='input-value'
            id='weather'
            name='weather'
            required
          >
            <option value='' disabled>
              Select an option
            </option>
            <option value='sunny'>Sunny</option>
            <option value='rainy'>Rainy</option>
            <option value='cloudy'>Cloudy</option>
            <option value='stormy'>Stormy</option>
            <option value='windy'>Windy</option>
          </select>
        </div>
        <div>
          <label htmlFor='visibility'>Visibility</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className='input-value'
            id='visibility'
            name='visibility'
            required
          >
            <option value='' disabled>
              Select an option
            </option>
            <option value='great'>Great</option>
            <option value='good'>Good</option>
            <option value='ok'>Ok</option>
            <option value='poor'>Poor</option>
          </select>
        </div>
        <div>
          <label htmlFor='comment'>Comment</label>
          <textarea
            className='input-value'
            id='comment'
            name='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <button type='submit'>Add</button>
      </form>
    </>
  );
};

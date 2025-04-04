import axios from "axios";
import { NonSensitiveDiary, NewDiary } from "../types";

const BASE_URL = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async () => {
  const res = await axios
    .get<NonSensitiveDiary[]>(BASE_URL);
  return res.data;
}

export const createDiary = async (object: NewDiary) => {
  const res = await axios.post<NewDiary>(BASE_URL, object)
  return res.data
}
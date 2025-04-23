import axios from "axios";
import { Diagnosis } from "../types";

const baseUrl = 'http://localhost:3001/api/diagnoses';

export const getDiagnoses = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(baseUrl);
  return data;
};
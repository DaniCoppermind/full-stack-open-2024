import { PatientsEntry } from "../../types";
import { patientsData } from "../data/patientsData";


export const getPatients = (): PatientsEntry[] => {
  return patientsData
}


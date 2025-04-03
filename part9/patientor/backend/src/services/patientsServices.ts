import { NewPatientEntry, PatientsEntry, PatientsForFrontend } from "../../types";
import { patientsData } from "../data/patientsData";
import { v4 as uuid } from 'uuid';

export const getPatients = (): PatientsForFrontend[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export const addPatient = (entry: NewPatientEntry): PatientsEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

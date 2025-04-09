import { NewPatientEntry, PatientsEntry, NonSensitivePatient } from "../../types";
import { patientsData } from "../data/patientsData";
import { v4 as uuid } from 'uuid';

export const getPatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export const findPatientById = (id: string): PatientsEntry | undefined => {
  const patient = patientsData.find(patient => patient.id === id);
  return patient;
};

export const addPatient = (entry: NewPatientEntry): PatientsEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

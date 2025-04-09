import { NewPatientEntry, PatientsEntry, NonSensitivePatient } from "../../types";
import { patients } from "../data/patientsData";
import { v4 as uuid } from 'uuid';

export const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const findPatientById = (id: string): PatientsEntry | undefined => {
  return patients.find(patient => patient.id === id);
};

export const addPatient = (entry: NewPatientEntry): PatientsEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

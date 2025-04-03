export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type DiagnosesEntry = {
  code: string;
  name: string;
  latin?: string
}

export type PatientsEntry = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type PatientsForFrontend = Omit<PatientsEntry, 'ssn'>
export type NewPatientEntry = Omit<PatientsEntry, 'id'>
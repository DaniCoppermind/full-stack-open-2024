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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {

}

export type PatientsEntry = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<PatientsEntry, 'ssn' | 'entries'>
export type NewPatientEntry = Omit<PatientsEntry, 'id'>
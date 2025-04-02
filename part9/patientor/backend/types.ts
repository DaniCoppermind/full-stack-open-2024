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

// type Genre = 'male' | 'female' | 'other'
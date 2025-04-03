import { NewPatientEntry, Gender } from "./types";

// Guard Types
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

// parses
const parseName = (name: unknown): string => {
  if(!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDate = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  };
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect occupation " + occupation);
  };
  return occupation;
};

// this should be parsed with regex or another solution for a ssn (in my case i only interested if is string [NNNN-NNNS] = S !important)
const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect SSN " + ssn);
  }
  return ssn;
};

// POST verified new patient entry
export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error("Incorrect or missing data");
  }

  if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn)
    };
    return newEntry;
  };
  throw new Error("Incorrect data: a filed missing");
  
};
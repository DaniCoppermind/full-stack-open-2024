
import { PatientsForFrontend } from "../../types";
import { patientsData } from "../data/patientsData";


export const getPatients = (): PatientsForFrontend[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

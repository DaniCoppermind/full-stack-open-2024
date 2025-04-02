import { diagnosesData } from "../data/diagnosesData";
import { DiagnosesEntry } from "../../types";

export const getDiagnosesEntries = (): DiagnosesEntry[] => {
  return diagnosesData;
}
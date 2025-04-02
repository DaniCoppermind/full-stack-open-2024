import data from "../data/diagnosesData";
import { DiagnosesEntry } from "../../types";

const getEntries = (): DiagnosesEntry[] => {
  return data;
}

export default {
  getEntries
}
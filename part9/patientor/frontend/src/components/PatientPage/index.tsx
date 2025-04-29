import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import patientService from '../../services/patients';
import { Diagnosis, PatientWithEntries } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { formatDate } from "../../utils/formatDate";
import { getDiagnoses } from "../../services/diagnosis";
import EntryDetails from "./EntryDetails";


const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<PatientWithEntries | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      }
    };

    const fetchDiagnoses = async () => {
      const diagnoses = await getDiagnoses();
      setDiagnoses(diagnoses);
    };

    void fetchPatient();
    void fetchDiagnoses();
  }, [id]);
  
  if (!patient) {
    return (
      <div>Patient not found, please try again</div>
    );
  }

  return (
   <section>
     <div>
      <h2>{patient.name} {patient.gender === "male" ? <MaleIcon /> : patient.gender === "female" ? <FemaleIcon /> : null}</h2>
      <p>Date of birth: {patient.dateOfBirth ? formatDate(patient.dateOfBirth) : ''}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
      <div>
        <h3>Entries</h3>
        {patient.entries.length > 0 ? (
          patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
          ))
        ) : (
          <p>No entries available</p>
        )}
      </div>
   </section>
  );
};

export default PatientPage;
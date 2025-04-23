import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import patientService from '../../services/patients';
import { Entry, PatientWithEntries } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { formatDate } from "../../utils/formatDate";


const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<PatientWithEntries | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [id]);
  
  if (!patient) {
    return (
      <div>Patient not found, please try again</div>
    );
  }

  const renderEntry = (entry: Entry) => {
    switch (entry.type) {
      case 'HealthCheck':
        return (
          <div key={entry.id}>
            <p>{entry.date} {entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map((code, index) => (
                <li key={index}>{code}</li>
              ))}
            </ul>
          </div>
        );
      case 'Hospital':
        return (
          <div key={entry.id}>
          <p>{entry.date} {entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map((code, index) => (
              <li key={index}>{code}</li>
            ))}
          </ul>
        </div>
        );
      case 'OccupationalHealthcare':
        return (
          <div key={entry.id}>
          <p>{entry.date} {entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map((code, index) => (
              <li key={index}>{code}</li>
            ))}
          </ul>
        </div>
        );
      default:
        return null;
    }
  };

  return (
   <section>
     <div>
      <h2>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}</h2>
      <p>Date of birth: {patient.dateOfBirth ? formatDate(patient.dateOfBirth) : ''}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
      <div>
        <h3>Entries</h3>
        {patient.entries.length > 0 ? (
          patient.entries.map((entry) => renderEntry(entry))
        ) : (
          <p>No entries available</p>
        )}
      </div>
   </section>
  );
};

export default PatientPage;
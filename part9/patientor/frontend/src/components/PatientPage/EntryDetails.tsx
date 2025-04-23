import { Entry, Diagnosis } from "../../types";

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry, diagnoses }) => {
  const getDiagnosisName = (code: string): string | undefined => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : undefined;
  };

  switch (entry.type) {
    case "HealthCheck":
      return (
        <div key={entry.id}>
          <p>
            <strong>{entry.date}</strong> - {entry.description}
          </p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {getDiagnosisName(code)}
              </li>
            ))}
          </ul>
        </div>
      );
    case "Hospital":
      return (
        <div key={entry.id}>
          <p>
            <strong>{entry.date}</strong> - {entry.description}
          </p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {getDiagnosisName(code)}
              </li>
            ))}
          </ul>
          <p>
            <strong>Discharge:</strong> {entry.discharge.date} - {entry.discharge.criteria}
          </p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div key={entry.id}>
          <p>
            <strong>{entry.date}</strong> - {entry.description}
          </p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {getDiagnosisName(code)}
              </li>
            ))}
          </ul>
          <p>
            <strong>Employer:</strong> {entry.employerName}
          </p>
        </div>
      );
    default:
      return null;
  }
};

export default EntryDetails;
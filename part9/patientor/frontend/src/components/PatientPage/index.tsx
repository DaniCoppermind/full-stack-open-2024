import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

interface PatientPageProps {
  patients: Patient[]
}

export const PatientPage = ({ patients }: PatientPageProps) => {
  const id = useParams().id;
  const patient = patients.find(p => p.id === id);

  const formatDate = (date: string): string => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!patient) {
    return <div>No patient existent</div>;
  }

  return (
    <div>
      <h2>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}</h2>
      <p>Date of birth: {formatDate(patient.dateOfBirth ?? "")}</p>
      <p>Occupation: {patient.occupation}</p>
    </div>
  );
};

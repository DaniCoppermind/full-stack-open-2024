import express from 'express';
import { addPatient, getPatients } from '../services/patientsServices';
import { toNewPatientEntry } from '../../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = addPatient(newPatientEntry);
    res.json(addedEntry);
  }  catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
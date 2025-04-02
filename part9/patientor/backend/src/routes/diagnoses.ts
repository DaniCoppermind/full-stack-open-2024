import express from "express";
import { getDiagnosesEntries } from "../services/diagnosesServices";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getDiagnosesEntries());
});

export default router;
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import RSVPModels from '../../models/weddingModels.js';
import { readJsonFile } from '../helper/weddingHelper.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getInvitationData = async (req, res) => {
  try {
    const id = req.params.id;
    const filePath = path.join(__dirname, '../../assets', `${id}Data.json`);
    const jsonData = await readJsonFile(filePath);

    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postRsvp = async (req, res) => {
  try {
    const payload = req.body;
    const rsvp = new RSVPModels(payload);

    await rsvp.save();

    res.status(201).json(rsvp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRsvp = async (req, res) => {
  try {
    const id = req.params.id;

    const rsvps = await RSVPModels.find({ id: id });

    if (rsvps.length === 0) {
      return res.status(404).json({ message: 'No RSVPs found with this ID.' });
    }

    res.json(rsvps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.get('/invitation/:id', getInvitationData);
router.post('/rsvp', postRsvp);
router.get('/rsvp/:id', getRsvp);

export default router;

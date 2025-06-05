import express from 'express';
import Query from '../Models/Queries.js';

const drouter = express.Router();

drouter.delete('/history', async (req, res) => {
  try {
    await Query.deleteMany({});
    res.status(200).json({ message: 'History cleared' });
  } catch (error) {
    console.error('Failed to clear history:', error);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

export default drouter;

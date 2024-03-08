import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    relation: String,
    message: String,
    attendance: String,
  },
  { timestamps: true, id: true }
);

const RSVPModels = mongoose.model('RSVPModels', rsvpSchema);

export default RSVPModels;

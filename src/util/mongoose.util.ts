import mongoose from 'mongoose';

export const requiredString = {
  type: String,
  required: true,
};

export const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

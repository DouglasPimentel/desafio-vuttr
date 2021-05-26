import mongoose from 'mongoose';

const ToolSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Required field'],
    },
    link: {
      type: String,
      required: [true, 'Required field'],
    },
    description: {
      type: String,
      required: [true, 'Required field'],
    },
    tags: {
      type: [String],
      required: [true, 'Required field'],
    },
  },
  {
    timestamps: true,
  },
);

const Tool = mongoose.model('Tool', ToolSchema);

export default Tool;

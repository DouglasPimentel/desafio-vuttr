import mongoose from 'mongoose';

export interface ITool extends mongoose.Document {
  title: string;
  link: string;
  description: string;
  tags: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

const ToolSchema = new mongoose.Schema<ITool>(
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
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Tool',
  },
);

const Tool: mongoose.Model<ITool> = mongoose.model('Tool', ToolSchema);

export default Tool;

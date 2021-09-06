import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Required field'],
    },
    lastName: {
      type: String,
      required: [true, 'Required field'],
    },
    email: {
      type: String,
      index: true,
      required: [true, 'Required field'],
    },
    password: {
      type: String,
      max: 16,
      min: 8,
      hidden: true,
      required: [true, 'Required field'],
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'User',
  },
);

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  encryptPassword: (password: string | undefined) => string;
}

UserSchema.pre<IUser>(
  'save',
  function encryptPasswordHook(next: mongoose.HookNextFunction) {
    if (this.isModified('password')) {
      this.password = this.encryptPassword(this.password);
    }

    next();
  },
);

UserSchema.methods = {
  encryptPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  },
};

const User: mongoose.Model<IUser> = mongoose.model('User', UserSchema);

export default User;

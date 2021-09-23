import mongoose, { Unpacked } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  comparePassword: (password: string) => boolean;
  encryptPassword: (password: string | undefined) => string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
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

UserSchema.pre<IUser>(
  'save',
  function encryptPasswordHook(next: mongoose.HookNextFunction): void {
    if (this.isModified('password')) {
      this.password = this.encryptPassword(this.password);
    }

    next();
  },
);

UserSchema.methods = {
  comparePassword(pass: string): boolean {
    return bcrypt.compareSync(pass, this.password);
  },
  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  },
};

const User: mongoose.Model<IUser> = mongoose.model('User', UserSchema);

export default User;

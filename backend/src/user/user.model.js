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
      unique: true,
      required: [true, 'Required field'],
    },
    password: {
      type: String,
      max: 16,
      min: 8,
      required: [true, 'Required field'],
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', function (next) {
  let user = this;
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      return next();
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next();
      }

      user.password = hash;

      return next();
    });
  });
});

const User = mongoose.model('User', UserSchema);

export default User;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
      maxlength: [40, 'A user must have less or equal then 40 characters,'],
      minlength: [4, 'A use must have more or equal then 4 characters,'],
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    isEditor: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;

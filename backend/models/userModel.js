import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';  // for hashing password

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {  // compare entered password with hashed password
  return await bcrypt.compare(enteredPassword, this.password);  // this.password is the hashed password
};

const User = mongoose.model('User', userSchema);

export default User;

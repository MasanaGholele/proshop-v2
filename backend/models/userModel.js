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

userSchema.pre('save', async function (next) { // .pre ensures that it is done before saving to the database
  if (!this.isModified('password')) { // if password is not modified it will move on to the next function
    next();
  }
  const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt); // if password is modified then we hash if before saving to the DB
});

const User = mongoose.model('User', userSchema);

export default User;

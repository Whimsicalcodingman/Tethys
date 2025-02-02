import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the user schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save middleware to hash passwords before saving to the database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password is not modified
  const salt = await bcrypt.genSalt(10); // Generate salt for hashing
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});

// Export the User model
const User = mongoose.model("User", UserSchema);
export default User;

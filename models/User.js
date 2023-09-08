import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    fullName: {
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
    products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    isAdmin: { type: Boolean },
  },
  { timestamps: true }
)

export const User = mongoose.models.User || mongoose.model('User', UserSchema)

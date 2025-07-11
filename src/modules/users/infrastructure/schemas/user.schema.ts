import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // puede estar vacío si viene por Google
  },
  { timestamps: true },
);

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
  },
});

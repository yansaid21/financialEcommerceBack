import { Schema } from 'mongoose';

export const TransactionSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    isIncome: { type: Boolean, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

TransactionSchema.set('toJSON', {
  transform: (_doc, ret) => {
  },
});

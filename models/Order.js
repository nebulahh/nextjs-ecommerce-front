import { model, models, Schema } from 'mongoose'

const OrderSchema = new Schema(
  {
    items: Object,
    name: String,
    email: String,
    address: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
)

export const Order = models?.Order || model('Order', OrderSchema)

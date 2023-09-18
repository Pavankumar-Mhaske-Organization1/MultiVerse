import mongoose, { Schema } from "mongoose";
import { User } from "../auth/user.models.js";
import { Address } from "./address.models.js";
import { Product } from "./product.models.js";

const orderSchema = new Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    items: {
      type: [
        {
          productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity can not be less then 1."],
            default: 1,
          },
        },
      ],
      default: [],
    },
    address: {
      type: mongoose.Types.ObjectId,
      ref: "Address",
    },
    status: {
      type: String,
      enum: ["PENDING", "CANCELLED", "COMPLETED"],
      default: "PENDING",
    },
    // This field shows if the payment is done or not
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const EcomOrder = mongoose.model("EcomOrder", orderSchema);
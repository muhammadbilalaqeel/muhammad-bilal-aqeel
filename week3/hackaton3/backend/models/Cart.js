import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        variant: { type: String },
        quantity: { type: Number, default: 1, min: 1 }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);

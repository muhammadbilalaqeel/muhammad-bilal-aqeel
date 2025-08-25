import mongoose from "mongoose";
import Cart from "./Cart.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const cart = await Cart.create({ user: this._id, products: [] });
      this.cart = cart._id;
    }
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre("remove", async function (next) {
  try {
    if (this.cart) {
      await Cart.findByIdAndDelete(this.cart);
    }
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("User", userSchema);

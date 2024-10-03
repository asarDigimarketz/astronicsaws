import { Schema, model, models } from "mongoose";

const bannerSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    newCategory: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const bannerModel =
  models.bannerCarousel || model("bannerCarousel", bannerSchema);
export default bannerModel;

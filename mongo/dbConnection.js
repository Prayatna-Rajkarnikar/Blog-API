import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.log("Database COnnection Error", error);
    });
};

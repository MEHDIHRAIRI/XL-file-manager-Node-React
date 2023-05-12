import mongoose from "mongoose";

export function connectToDatabase() {
  return mongoose
    .connect(
      "mongodb+srv://mehdihrairi:cn7r2IG0r6duUHCI@cluster0.vwlyatg.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.info("connected to database"))
    .catch((error) => {
      console.error("connectToDatabase Error =>", error);
    });
}

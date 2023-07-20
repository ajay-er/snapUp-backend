import mongoose from "mongoose";
import "dotenv/config";

const URI = process.env.MONGO_URI;

mongoose.connection.once("open", () => {
	console.log("MongoDB connection ready!💰");
});

mongoose.connection.on("error", (err) => {
	console.error("Database not connected🫡!!!" + err);
});

async function mongoConnect() {
	await mongoose.connect(URI!);
}

export default mongoConnect;
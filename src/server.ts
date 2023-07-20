import "dotenv/config";

import app from "./app";
import mongoConnect from "./config/connectDB";

const PORT = process.env.PORT || 3000;

console.clear();

(async () => {
	try {
		await mongoConnect();

		app.listen(PORT, () => {
			console.log(`SERVER IS LISTENING PORT🚀:${PORT}`);
		});
	} catch (error) {
		console.log("OOPS!AN ERROR OCCURED🤔🤔", error);
	}
})();

import mongoose, { Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

 interface IAdmin extends Document {
	name: string;
	email: string;
    password: string;
	comparePasswordInDB: (password: string, passwordInDB: string) => Promise<boolean>;
}

const adminSchema = new mongoose.Schema<IAdmin>({
	name: {
		type: String,
		required: [true, "Please enter your name"]
	},
	email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, "Please enter a valid email"]
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: [6, "Password should have at least 6 characters"],
		select: false
	}
});

adminSchema.methods.comparePasswordInDB = async function (password: string, passwordInDB: string) {
	return await bcrypt.compare(password, passwordInDB);
};

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;

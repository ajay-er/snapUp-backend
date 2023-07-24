import mongoose, { Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

interface IUser extends Document {
	name: string;
	email: string;
	age: number;
	password: string;
	confirmPassword: string;
	phoneNumber: string;
	passwordChangedAt: Date;
	imageUrl:string,
	comparePasswordInDB: (password: string, passwordInDB: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
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
	age: {
		type: Number,
		required: [true, "Please enter your age"],
		min: [18, "Minimum age should be 18"]
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: [6, "Password should have at least 6 characters"],
		select: false
	},
	confirmPassword: {
		type: String,
		required: [true, "Please confirm your password"],
		//this validator only works for save() & create()
		validate: {
			validator: function (value: string) {
				return (this as any).password === value;
			},
			message: "Password & Confirm password doesnt match"
		}
	},
	phoneNumber: {
		type: String,
		required: [true, "Please enter your phone number"],
		validate: {
			validator: function (value: string) {
				return validator.isMobilePhone(value, "any", { strictMode: false });
			},
			message: "Please enter a valid phone number"
		}
	},
	imageUrl: {	
		type: String,
	}
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	//encrypt password
	this.password = await bcrypt.hash(this.password!, 10);

	//remove confirm password
	this.set("confirmPassword", undefined, { strict: false });
	next();
});

userSchema.methods.comparePasswordInDB = async function (password: string, passwordInDB: string) {
	return await bcrypt.compare(password, passwordInDB);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;

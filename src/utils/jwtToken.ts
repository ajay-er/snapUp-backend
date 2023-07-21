import jwt from "jsonwebtoken";

const generateToken = (id: any) => {
	return jwt.sign({ id }, process.env.JWT_SECRET!, {
		expiresIn: process.env.JWT_LOGIN_EXPIRES
	});
};

export default generateToken;

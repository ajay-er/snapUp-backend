import jwt from "jsonwebtoken";

interface IPayLoad{
	id: string,
	role:string
}

const generateToken = (payLoad:IPayLoad) => {
	return jwt.sign(payLoad, process.env.JWT_SECRET!, {
		expiresIn: process.env.JWT_LOGIN_EXPIRES
	});
};

export default generateToken;

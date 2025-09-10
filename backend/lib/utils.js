import jwt from 'jsonwebtoken'

//Function to generate the user token
export const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
    return token;
}
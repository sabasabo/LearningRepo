import jwt from "jsonwebtoken";

const jwtSignature = process.env.JWT_SIGNATURE

export async function createTokens(sessionToken, userId) {
    try {
        const refreshToken = jwt.sign({
            sessionToken
        }, jwtSignature);

        const accessToken = jwt.sign({
            sessionToken,
            userId
        }, jwtSignature);
        return { refreshToken, accessToken }
    } catch (error) {
        console.log(error);
    }
}

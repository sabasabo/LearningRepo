import jwt from 'jsonwebtoken'
import mongo from 'mongodb'
import { createTokens } from './tokens.js'
const { ObjectId } = mongo;
const jwtSignature = process.env.JWT_SIGNATURE

export async function getUserFromCookie(request, reply) {
    try {
        const { user } = await import('../user/user.js');
        const { session } = await import('../session/session.js');
        if (request?.cookies?.accessToken){
            const { accessToken } = request.cookies;
            const decodedAccessToken = jwt.verify(accessToken, jwtSignature);
            return user.findOne({
                "_id": new ObjectId(decodedAccessToken?.userId)
            })

        }

        if (request?.cookies?.refreshToken) {
            const { refreshToken } = request.cookies;
            const { sessionToken } = jwt.verify(refreshToken, jwtSignature);
            const currentSession =  await session.findOne({
                sessionToken
            });

            if (currentSession.valid) {

                const currentUser =  await user.findOne({
                    "_id": new ObjectId(currentSession.userId)
                });

                await refreshTokens(sessionToken, currentUser._id, reply);
                return currentUser;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export async function refreshTokens(sessionToken, userId, reply) {
    const { accessToken, refreshToken } = await createTokens(sessionToken, userId);
    const now = new Date();
    const refreshExpires = now.setDate(now.getDate() + 30);

    reply.setCookie("refreshToken", refreshToken, {
        path: "/",
        domain: "localhost", 
        httpOnly: true,
        expires: refreshExpires
    })
    .setCookie("accessToken", accessToken, {
        path: "/",
        domain: "localhost",
        httpOnly: true
        
    })
}
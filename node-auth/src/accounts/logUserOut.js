import jwt from "jsonwebtoken";

const jwtSignature = process.env.JWT_SIGNATURE

export async function logUserOut(request, reply) {
    try {
        const { session } = await import('../session/session.js');

        if (request?.cookies?.refreshToken) {
            const { refreshToken } = request.cookies;
            // Decode refresh token
            const { sessionToken } = jwt.verify(refreshToken, jwtSignature)
            // Delete database record of session
            const currentSession = await session.deleteOne({sessionToken})
        }
        // Delete cookies:
        reply.clearCookie("refreshToken").clearCookie("accessToken");
    } catch (error) {
        console.error(error);
    }
}
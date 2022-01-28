import { createSession } from "./sessions.js";
import { refreshTokens } from './user.js'

export async function logUserIn(userId, request, reply) {
    const connectionInformation = {
        ip: request.ip,
        userAgent: request.headers['user-agent']
    }


    const sessionToken = await createSession(userId, connectionInformation);

    await refreshTokens(sessionToken, userId, reply);
}
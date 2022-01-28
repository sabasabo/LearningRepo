import { randomBytes } from 'crypto';

export async function createSession(userId, connection) {
    try {
        const sessionToken = randomBytes(43).toString("hex")
        const {ip, userAgent} = connection;
        const { session } = await import('../session/session.js');
        await session.insertOne({
            sessionToken,
            userId,
            ip,
            userAgent,
            valid: true,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        
        return sessionToken;
    } catch(error) {
        console.log(error)
        throw new Error("Session creation failed");
    }
}
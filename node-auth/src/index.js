import './env.js';
import {fastify} from 'fastify';
import fastifyStatic from 'fastify-static'
import fastifyCookie from 'fastify-cookie'
import path from 'path'
import { fileURLToPath } from 'url';
import { connectDb } from './db.js';
import { registerUser } from './accounts/register.js';
import { authorizeUser } from './accounts/authorize.js';
import { logUserIn } from './accounts/logUserIn.js';
import { logUserOut } from './accounts/logUserOut.js';
import { getUserFromCookie } from './accounts/user.js';
import { realpath } from 'fs';

// Esm specific
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = fastify();

async function startApp() {
    try {
        app.register(fastifyCookie, {
            secret: process.env.COOKIE_SIGNATURE
        })

        app.register(fastifyStatic, {
            root: path.join(__dirname, 'public')
        })
        
        app.post("/api/register", {}, async (request, reply) => {
            try {
                const userId = await registerUser(request.body.email, request.body.password);
                if (userId) {
                    await logUserIn(userId, request, reply);
                    reply.send({
                        data: {
                            status: "SUCCESS",
                            userId
                        }
                    })
                }
            } catch (err) {
                console.log(`err`, err);
                reply.send({
                    data: {
                        status: "FAILED"
                    }
                });
            }
        })

        app.post("/api/authorize", {}, async (request, reply) => {
            try {
                console.log((request.body.email, request.body.password));
                const { isAuthorized, userId } = await authorizeUser(request.body.email, request.body.password);
                if (isAuthorized) {
                    await logUserIn(userId,request, reply)
                    reply.send({
                        data: {
                            status: "SUCCESS",
                            userId
                        }
                    })
                }
            } catch (err) {
                console.log(`err`, err);
                reply.send({
                    data: {
                        status: "FAILED"
                    }
                });
            }
        })

        app.post("/api/logout", {}, async (request, reply) => {
            try {
                await logUserOut(request, reply);
                reply.send({
                    data: {
                        status: "SUCCESS",
                    }
                })
                
            } catch (error) {
                console.log(error);
                reply.send({
                    data: {
                        status: "FAILED"
                    }
                });
            }
        })

        app.get("/test", {}, async (request, reply) => {

            const user = await getUserFromCookie(request, reply);
            if (user?._id) {
                reply.send({
                    data: user
                })
            } else {
                reply.send({
                    data: "User lookup failed"
                })
            }
        });
        await app.listen(3000);
        console.log("App started at port 3000")
    } catch (error) {
        console.log(error);
    }
}
connectDb().then(() => {

    startApp();
})
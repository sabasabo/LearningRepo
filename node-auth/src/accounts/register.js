
import bcryptjs from 'bcryptjs'

const { genSalt, hash} = bcryptjs;

export async function registerUser(email, password) {
    const { user } = await import('../user/user.js');
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const result = await user.insertOne({
        email: { 
            address: email, 
            verified: false
        },
            password: hashedPassword
    });
    return result.insertedId;

}
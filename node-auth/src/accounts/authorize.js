import bcryptjs from 'bcryptjs';

const { compare } = bcryptjs;

export async function authorizeUser(email, password) {
    const {user} = await import('../user/user.js');

    console.log(user);
    const userData = await user.findOne({
        "email.address": email
    })
    const isAuthorized = compare(password, userData.password);

    return { isAuthorized, userId: userData._id};
}
const router = require("express").Router();
const Users = require("../resources/users/users-model.js");
const jwt = require('jsonwebtoken');
// const bcrypt = require("bcryptjs");



router.post("/login", async (req, res) => {
    const {user_username, user_password } = req.body;

    try {
        console.log('here is info destructured from the req bod')
        console.log(user_username)
        console.log(user_password)
        console.log('before await')
        const allegedUser = await Users.findBy({ user_username })
        console.log('after await')
        console.log(allegedUser)
        // res.json('no error, but look at res')
        const token = makeJwt(allegedUser);

        res.status(200).json({allegedUser, token})
        
    } catch (err) {
        res.status(500).json(err.message)
    }
});

function makeJwt(user) {
    const payload = {
        subject: user.user_id,
        username: user.user_username,
        role: user.user_role
    };

    const secret = process.env.JWT_SECRET || 'shh'

    const options = {
        expiresIn: "15000"
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router;
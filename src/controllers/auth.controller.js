const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


async function registerController(req, res) {
    const { username, password, firstname, lastname } = req.body;
    try {
        if (!username || !password || !firstname || !lastname) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const userExists = await userModel.findOne({ username });

        if (userExists) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            username,
            password: hashedPassword,
            firstname,
            lastname,
        });

        return res.status(201).json({
            message: "User registered successfully",
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
        });
    }
}

async function loginController(req, res) {

    try {

        const { username, password } = req.body;
        const user = await userModel.findOne({
            username: username
        });

        if (!user) {
            return res.status(401).json({
                message: "USERNAME NOT EXISTS"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: " Password Incorrect"
            })
        }
        const token = jwt.sign({ id: user._id, }, process.env.JWT_SECRET)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
            },
        });

    } catch (err) {
        return res.status(500).json({
            message: " Server Error"
        });

    }

}






module.exports = {
    registerController,
    loginController
}

const authSchema = require("../models/auth.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const user = await authSchema.findOne({ email: email })

        if (user) {
            return res.status(500).json({ msg: "Böyle bir kullanıcı zaten var!!" })
        }
        if (password.length < 6) {
            return res.status(500).json({ msg: "Şifreniz altı karakterden az olmamalıdır." })
        }
        if (!validateEmail(email)) {
            return res.status(500).json({ msg: "Email formatı dışında bir mail adresi girdiniz." })
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await authSchema.create({ username, email, password: passwordHash })

        const token = jwt.sign({ id: newUser._id }, "SECRET_KEY", { expiresIn: "1h" })

        res.status(201).json({
            status: "OK",
            newUser,
            token
        })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authSchema.findOne({ email })

        if (!user) {
            return res.status(500).json({ msg: "Böyle bir kullanıcı bulunmamaktadır!!" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)

        if (!passwordCompare) {
            return res.status(500).json({ msg: "Girilen şifre yanlıştır." })
        }
        const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" })

        res.status(200).json({
            status: "OK",
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu)$/
        );
};


module.exports = { login, register }
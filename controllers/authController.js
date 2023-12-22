import Auth from '../models/Auth.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const findUser = await Auth.findOne({ email })

        if (!findUser) {
            return res.status(401).json({ message: 'No user in DB' })
        }

        const match = await bcrypt.compare(password, findUser.hash_pass)

        if (!match) {
            return res.status(401).json({ message: 'Invalid Password' })
        }


        const token = jwt.sign(
            { email: findUser.email, userId: findUser._id }, process.env.JWT_SECRET
        )
        return res.status(200).json({
            token,
            status: 'ok'
        })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

}

export { loginUser }
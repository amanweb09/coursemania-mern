const UserDTO = require("../../dtos/userDTO");
const { PASSWORD_SECRET, ACCESS_SECRET, REFRESH_SECRET } = require("../../env")
const authService = require("../../services/auth-service")
const hashingService = require("../../services/hashing-service")
const tokenService = require("../../services/token-service")

class AuthController {

    async registerUser(req, res) {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' })
        }

        try {
            const user = await authService.find({ email })

            if (user.length) {
                return res.status(400).json({ message: 'User already exists with this email' })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' })
        }

        const hashedPassword = hashingService.hash({
            data: password,
            secret: PASSWORD_SECRET
        })

        const newUser = {
            name, email, password: hashedPassword
        }

        let user;
        try {
            user = await authService.create(newUser)
            const accessToken = tokenService.generateToken({
                payload: { _id: user._id },
                secret: ACCESS_SECRET,
                expiresIn: '1h'
            })
            const refreshToken = tokenService.generateToken({
                payload: { _id: user._id },
                secret: REFRESH_SECRET,
                expiresIn: '1y'
            })

            user.refreshToken = refreshToken
            await user.save()

            res.cookie('at', accessToken, { httpOnly: true })
            return res.status(200).json({ message: 'signup successful!', user: new UserDTO(user) })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async loginUser(req, res) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' })
        }

        let user
        try {
            const findUser = await authService.find({ email })

            if (!findUser.length) {
                return res.status(400).json({ message: 'No user found with this email' })
            }

            user = findUser[0];

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' })
        }

        const hashedPassword = hashingService.hash({
            data: password,
            secret: PASSWORD_SECRET
        })

        if (hashedPassword !== user.password) {
            return res.status(422).json({ message: 'Invalid credentials' })
        }

        try {

            const accessToken = tokenService.generateToken({
                payload: { _id: user._id },
                secret: ACCESS_SECRET,
                expiresIn: '1d'
            })
            const refreshToken = tokenService.generateToken({
                payload: { _id: user._id },
                secret: REFRESH_SECRET,
                expiresIn: '1y'
            })

            user.refreshToken = refreshToken
            await user.save()

            res.cookie('at', accessToken, { httpOnly: true })
            return res.status(200).json({ message: 'login successful!', user: new UserDTO(user) })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async refreshAccessToken(req, res) {

        const { _id } = req.body
        const { at: accessToken } = req.cookies

        if (!accessToken) {
            return res.status(422).json({ message: "Please login to continue" })
        }

        let user;

        try {

            const findUser = await authService.find({ _id })
            user = findUser[0];

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        }

        try {

            tokenService.verifyToken({
                token: user.refreshToken,
                secret: REFRESH_SECRET
            })
            const at = tokenService.generateToken({
                payload: { _id },
                secret: ACCESS_SECRET,
                expiresIn: '1d'
            })

            res.cookie('at', at)
            return res.status(200).json({ message: 'refreshed' })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async logout(req, res) {
        res.clearCookie('at')
        return res.status(200).json({ message: 'logged out!', user: null })
    }

    async profile(req, res) {
        try {
            const user = await authService.find({ _id: req.user._id })
            return res.status(200).json({ user: new UserDTO(user[0]) })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'something went wrong!' })
        }
    }
}

module.exports = new AuthController()
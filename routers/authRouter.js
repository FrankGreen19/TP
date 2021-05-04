const Router = require('express').Router;
const patientRepository = require('../repositories/patientRepository')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

const authRouter = Router();

authRouter.route("/")
    .post(async function (req, res) {

        const user = await patientRepository.getByLogin(req.body.login)

        if (user) {
            if (req.body.password == user.password) {
                const token = jwt.sign(
                    {
                        id: user.id,
                        login: user.login
                    },
                    keys.jwt,
                    {expiresIn: 3600});

                res.status(200).json({
                    token: `Bearer ${token}`
                });
            } else {
                res.status(401).json({
                    message: "Неправильный пароль."
                });
            }
        } else {
            res.status(404).json({
                message: "Пользователь не найден!"
            });
        }

    });

module.exports = authRouter;

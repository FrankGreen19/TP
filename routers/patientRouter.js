const Router = require('express').Router;
const patientRepository = require('../repositories/patientRepository')

const patientRouter = Router();
patientRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await patientRepository.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const rssItem = {
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                patronymic: req.body.patronymic,
            };
            res.send(await patientRepository.post(rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
patientRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await patientRepository.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const rssItem = {
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                patronymic: req.body.patronymic,
            };
            res.send(await patientRepository.put(id, rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await patientRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = patientRouter;
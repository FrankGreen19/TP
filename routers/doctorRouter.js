const Router = require('express').Router;
const doctorRepository = require('../repositories/doctorRepository')

const doctorRouter = Router();
doctorRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await doctorRepository.getAll());
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
                position: req.body.position,
            };
            res.send(await doctorRepository.post(rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
doctorRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await doctorRepository.get(id));
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
                position: req.body.position,
            };
            res.send(await doctorRepository.put(id, rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await doctorRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = doctorRouter;
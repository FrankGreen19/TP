const Router = require('express').Router;
const medicineRepository = require('../repositories/medicineRepository')

const medicineRouter = Router();
medicineRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await medicineRepository.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const rssItem = {
                name: req.body.name,
                description: req.body.description,
                amount: req.body.amount,
                id_same_medicine: req.body.id_same_medicine,
            };
            res.send(await medicineRepository.post(rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
medicineRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await medicineRepository.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const rssItem = {
                name: req.body.name,
                description: req.body.description,
                amount: req.body.amount,
                id_same_medicine: req.body.id_same_medicine,
            };
            res.send(await medicineRepository.put(id, rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await medicineRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = medicineRouter;
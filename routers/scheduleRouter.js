const Router = require('express').Router;
const scheduleRepository = require('../repositories/scheduleRepository')

const scheduleRouter = Router();
scheduleRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await scheduleRepository.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const rssItem = {
                doctor_id: parseInt(req.body.doctor_id),
                time: new Date(req.body.time)
            };
            res.send(await scheduleRepository.post(rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
scheduleRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await scheduleRepository.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const rssItem = {
                doctor_id: parseInt(req.body.doctor_id),
                time: new Date(req.body.time)
            };
            res.send(await scheduleRepository.put(id, rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await scheduleRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = scheduleRouter;
const Router = require('express').Router;
const analysisRepository = require('../repositories/analysisRepository')

const analysisRouter = Router();
analysisRouter.route('/')
    .get(async function(req, res) {
        try {
            let analysises = await analysisRepository.getAll();

            for(let i of analysises){
                i.medical_story = {
                    id: i.id_medical_story,
                    doctor_id: i.doctor_id,
                    patient_id: i.patient_id,
                    diagnosis: i.diagnosis,
                    appointment: i.appointment,
                }
                delete i.id_medical_story;
                delete i.doctor_id;
                delete i.patient_id;
                delete i.diagnosis;
                delete i.appointment;
            }
            res.send(analysises);
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const rssItem = {
                id_medical_story: req.body.id_medical_story,
                type: req.body.type,
                result: req.body.result,
            };
            res.send(await analysisRepository.post(rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
analysisRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            let i =await analysisRepository.get(id);
            i.medical_story = {
                id: i.id_medical_story,
                doctor_id: i.doctor_id,
                patient_id: i.patient_id,
                diagnosis: i.diagnosis,
                appointment: i.appointment,
            }
            delete i.id_medical_story;
            delete i.doctor_id;
            delete i.patient_id;
            delete i.diagnosis;
            delete i.appointment;
            res.send(i);

        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const rssItem = {
                id_medical_story: req.body.id_medical_story,
                type: req.body.type,
                result: req.body.result,
            };
            res.send(await analysisRepository.put(id, rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await analysisRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = analysisRouter;
const Router = require('express').Router;
const medicalStoryRepository = require('../repositories/medicalStoryRepository')

const medicalStoryRouter = Router();
medicalStoryRouter.route('/')
    .get(async function(req, res) {
        try {
            let medicalStories = await medicalStoryRepository.getAll();

            for (let story of medicalStories) {
                story.patient = {
                    "id": story.patient_id,
                    "lastname": story.lastname,
                    "firstname": story.firstname,
                    "patronymic": story.patronymic
                }
                story.doctor = {
                    "id": story.doctor_id,
                    "lastname": story.doctor_lastname,
                    "firstname": story.doctor_firstname,
                    "patronymic": story.doctor_patronymic,
                    "position": story.position
                }
                delete story.patient_id;
                delete story.doctor_id;
                delete story.lastname;
                delete story.firstname;
                delete story.patronymic;
                delete story.doctor_lastname;
                delete story.doctor_firstname;
                delete story.doctor_patronymic;
                delete story.position;
            }

            res.send(medicalStories);
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const rssItem = {
                patient_id: req.body.patient_id,
                doctor_id: req.body.doctor_id,
                diagnosis: req.body.diagnosis,
                appointment: req.body.appointment
            };
            res.send(await medicalStoryRepository.post(rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
medicalStoryRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);

            let story = await medicalStoryRepository.get(id);
            story.patient = {
                "id": story.patient_id,
                "lastname": story.lastname,
                "firstname": story.firstname,
                "patronymic": story.patronymic
            }
            story.doctor = {
                "id": story.doctor_id,
                "lastname": story.doctor_lastname,
                "firstname": story.doctor_firstname,
                "patronymic": story.doctor_patronymic,
                "position": story.position
            }
            delete story.patient_id;
            delete story.doctor_id;
            delete story.lastname;
            delete story.firstname;
            delete story.patronymic;
            delete story.doctor_lastname;
            delete story.doctor_firstname;
            delete story.doctor_patronymic;
            delete story.position;

            res.send(story);
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const rssItem = {
                patient_id: req.body.patient_id,
                doctor_id: req.body.doctor_id,
                diagnosis: req.body.diagnosis,
                appointment: req.body.appointment
            };
            res.send(await medicalStoryRepository.put(id, rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await medicalStoryRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = medicalStoryRouter;
const Router = require('express').Router;
const recordRepository = require('../repositories/recordRepository')

const pharmacyRouter = Router();
pharmacyRouter.route('/')
    .get(async function(req, res) {
        try {
            let records = await recordRepository.getAll();

            for (let record of records) {
                record.patient = {
                    "id": record.patient_id,
                    "lastname": record.lastname,
                    "firstname": record.firstname,
                    "patronymic": record.patronymic
                }
                record.doctor = {
                    "id": record.doctor_id,
                    "lastname": record.doctor_lastname,
                    "firstname": record.doctor_firstname,
                    "patronymic": record.doctor_patronymic,
                    "position": record.position
                }
                delete record.patient_id;
                delete record.doctor_id;
                delete record.lastname;
                delete record.firstname;
                delete record.patronymic;
                delete record.doctor_lastname;
                delete record.doctor_firstname;
                delete record.doctor_patronymic;
                delete record.position;
            }

            res.send(records);
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
                date: req.body.date,
                description: req.body.description
            };
            res.send(await recordRepository.post(rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
pharmacyRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);

            let record = await recordRepository.get(id);
            record.patient = {
                "id": record.patient_id,
                "lastname": record.lastname,
                "firstname": record.firstname,
                "patronymic": record.patronymic
            }
            record.doctor = {
                "id": record.doctor_id,
                "lastname": record.doctor_lastname,
                "firstname": record.doctor_firstname,
                "patronymic": record.doctor_patronymic,
                "position": record.position
            }
            delete record.patient_id;
            delete record.doctor_id;
            delete record.lastname;
            delete record.firstname;
            delete record.patronymic;
            delete record.doctor_lastname;
            delete record.doctor_firstname;
            delete record.doctor_patronymic;
            delete record.position;

            res.send(record);
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
                date: req.body.date,
                description: req.body.description
            };
            res.send(await recordRepository.put(id, rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await recordRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = pharmacyRouter;
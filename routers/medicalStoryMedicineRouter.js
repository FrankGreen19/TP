const Router = require('express').Router;
const medicalstorymedicineRepository = require('../repositories/medicalStoryMedicineRepository')

const medicalstorymedicineRouter = Router();
medicalstorymedicineRouter.route('/')
    .get(async function(req, res) {
        try {
            let medicalstorymedicines = await medicalstorymedicineRepository.getAll();

            for (let medicalstorymedicine of medicalstorymedicines) {
                medicalstorymedicine.medical_story = {
                    id: medicalstorymedicine.id_medical_story,
                    doctor_id: medicalstorymedicine.doctor_id,
                    patient_id: medicalstorymedicine.patient_id,
                    diagnosis: medicalstorymedicine.diagnosis,
                    appointment: medicalstorymedicine.appointment,
                }
                medicalstorymedicine.medicine = {
                    "id": medicalstorymedicine.id_medicine,
                    "name": medicalstorymedicine.name,
                    "description": medicalstorymedicine.description,
                    "amount": medicalstorymedicine.amount,
                    "id_same_medicine": medicalstorymedicine.id_same_medicine
                }
                delete medicalstorymedicine.id_medical_story;
                delete medicalstorymedicine.doctor_id;
                delete medicalstorymedicine.patient_id;
                delete medicalstorymedicine.diagnosis;
                delete medicalstorymedicine.appointment;
                delete medicalstorymedicine.id_medicine;
                delete medicalstorymedicine.id_same_medicine;
                delete medicalstorymedicine.name;
                delete medicalstorymedicine.description;
                delete medicalstorymedicine.amount;
                delete medicalstorymedicine.id_same_medicine;
            }

            res.send(medicalstorymedicines);
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const rssItem = {
                id_medical_story: req.body.id_medical_story,
                id_medicine: req.body.id_medicine
            };
            res.send(await medicalstorymedicineRepository.post(rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
medicalstorymedicineRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);

            let medicalstorymedicine = await medicalstorymedicineRepository.get(id);
            medicalstorymedicine.medical_story = {
                id: medicalstorymedicine.id_medical_story,
                doctor_id: medicalstorymedicine.doctor_id,
                patient_id: medicalstorymedicine.patient_id,
                diagnosis: medicalstorymedicine.diagnosis,
                appointment: medicalstorymedicine.appointment,
            }
            medicalstorymedicine.medicine = {
                "id": medicalstorymedicine.id_medicine,
                "name": medicalstorymedicine.name,
                "description": medicalstorymedicine.description,
                "amount": medicalstorymedicine.amount,
                "id_same_medicine": medicalstorymedicine.id_same_medicine
            }
            delete medicalstorymedicine.id_medical_story;
            delete medicalstorymedicine.doctor_id;
            delete medicalstorymedicine.patient_id;
            delete medicalstorymedicine.diagnosis;
            delete medicalstorymedicine.appointment;
            delete medicalstorymedicine.id_medicine;
            delete medicalstorymedicine.id_same_medicine;
            delete medicalstorymedicine.name;
            delete medicalstorymedicine.description;
            delete medicalstorymedicine.amount;
            delete medicalstorymedicine.same_medicine;

            res.send(medicalstorymedicine);
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
                id_medicine: req.body.id_medicine
            };
            res.send(await medicalstorymedicineRepository.put(id, rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await medicalstorymedicineRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = medicalstorymedicineRouter;
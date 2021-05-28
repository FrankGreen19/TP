const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT d.lastname as doctor_lastname, d.firstname as doctor_firstname, 
                    d.patronymic as doctor_patronymic, d.position,
                    p.lastname, p.firstname, p.patronymic,
                    record.*
                FROM record
                JOIN doctor d on record.doctor_id = d.id 
                JOIN patient p on record.patient_id = p.id`,
    select: `SELECT d.lastname as doctor_lastname, d.firstname as doctor_firstname, 
                    d.patronymic as doctor_patronymic, d.position,
                    p.lastname, p.firstname, p.patronymic,
                    record.*
            FROM record
            JOIN doctor d on record.doctor_id = d.id 
            JOIN patient p on record.patient_id = p.id  
            WHERE record.id = $1`,
    insert: `INSERT INTO "record"("patient_id", "doctor_id", "date", "description") 
            VALUES ($1, $2, $3, $4) 
            RETURNING "id", "patient_id", "doctor_id", "date", "description"`,
    update: `UPDATE "record" 
            SET "patient_id" = $1, "doctor_id" = $2, "date" = $3, "description" = $4
            WHERE "id" = $5
            RETURNING "id", "patient_id", "doctor_id", "date", "description"`,
    delete: `DELETE FROM "record" 
            WHERE "id" = $1 
            RETURNING "id", "patient_id", "doctor_id", "date", "description"`
}

async function getAll() {
    const query = await pool.query(queryStrings.selectAll);
    return query.rows;
}

async function get(id) {
    const query = await pool.query(
        queryStrings.select,
        [id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function post(rssItem) {
    const query = await pool.query(
        queryStrings.insert,
        [rssItem.patient_id, rssItem.doctor_id, rssItem.date, rssItem.description]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, rssItem) {
    const query = await pool.query(
        queryStrings.update,
        [rssItem.patient_id, rssItem.doctor_id, rssItem.date, rssItem.description, id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function remove(id) {
    const query = await pool.query(
        queryStrings.delete,
        [id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

module.exports = { getAll, get, post, put, remove }
const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT m.*, p.*, pharmacy.id,
                    (SELECT name FROM medicine WHERE medicine.id = m.id_same_medicine) as same_medicine
                FROM pharmacy
                JOIN medicine m on pharmacy.id_medicine = m.id
                JOIN patient p on pharmacy.id_patient = p.id`,
    select: `SELECT m.*, p.*, pharmacy.id,
                    (SELECT name FROM medicine WHERE medicine.id = m.id_same_medicine) as same_medicine
             FROM pharmacy
            JOIN medicine m on pharmacy.id_medicine = m.id
            JOIN patient p on pharmacy.id_patient = p.id   
            WHERE pharmacy.id = $1`,
    insert: `INSERT INTO "pharmacy"("id_patient", "id_medicine") 
            VALUES ($1, $2) 
            RETURNING "id", "id_patient", "id_medicine"`,
    update: `UPDATE "pharmacy" 
            SET "id_patient" = $1, "id_medicine" = $2
            WHERE "id" = $3
            RETURNING "id", "id_patient", "id_medicine"`,
    delete: `DELETE FROM "pharmacy" 
            WHERE "id" = $1 
            RETURNING "id", "id_patient", "id_medicine"`
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
        [rssItem.id_patient, rssItem.id_medicine]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, rssItem) {
    const query = await pool.query(
        queryStrings.update,
        [rssItem.id_patient, rssItem.id_medicine, id]);
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
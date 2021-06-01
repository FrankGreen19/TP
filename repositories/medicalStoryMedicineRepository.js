const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT m.*, p.*, medical_story_medicine.id
                FROM medical_story_medicine
                JOIN medical_story m on medical_story_medicine.id_medical_story = m.id
                JOIN medicine p on medical_story_medicine.id_medicine = p.id`,
    select: `SELECT m.*, p.*, medical_story_medicine.id
                FROM medical_story_medicine
                JOIN medical_story m on medical_story_medicine.id_medical_story = m.id
                JOIN medicine p on medical_story_medicine.id_medicine = p.id   
            WHERE medical_story_medicine.id = $1`,
    insert: `INSERT INTO "medical_story_medicine"("id_medical_story", "id_medicine") 
            VALUES ($1, $2) 
            RETURNING "id", "id_medical_story", "id_medicine"`,
    update: `UPDATE "medical_story_medicine" 
            SET "id_medical_story" = $1, "id_medicine" = $2
            WHERE "id" = $3
            RETURNING "id", "id_medical_story", "id_medicine"`,
    delete: `DELETE FROM "medical_story_medicine" 
            WHERE "id" = $1 
            RETURNING "id", "id_medical_story", "id_medicine"`
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
        [rssItem.id_medical_story, rssItem.id_medicine]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, rssItem) {
    const query = await pool.query(
        queryStrings.update,
        [rssItem.id_medical_story, rssItem.id_medicine, id]);
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
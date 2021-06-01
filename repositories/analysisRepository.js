const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT m.*, analysis.id, analysis.type, analysis.result 
                FROM "analysis"
                JOIN medical_story as m on analysis.id_medical_story = m.id`,
    select: `SELECT m.*, analysis.id, analysis.type, analysis.result 
                FROM "analysis"
                JOIN medical_story as m on analysis.id_medical_story = m.id  
            WHERE analysis.id = $1`,
    insert: `INSERT INTO "analysis"("id_medical_story", "type", "result") 
            VALUES ($1, $2, $3)     
            RETURNING "id", "id_medical_story", "type", "result"`,
    update: `UPDATE "analysis" 
            SET "id_medical_story" = $1, "type" = $2, "result" = $3 
            WHERE "id" = $4 
            RETURNING "id", "id_medical_story", "type", "result"`,
    delete: `DELETE FROM "analysis" 
            WHERE "id" = $1 
            RETURNING "id", "id_medical_story", "type", "result"`
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
        [rssItem.id_medical_story, rssItem.type, rssItem.result]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, rssItem) {
    const query = await pool.query(
        queryStrings.update,
        [rssItem.id_medical_story, rssItem.type, rssItem.result, id]);
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
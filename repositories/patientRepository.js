const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT "id", "lastname", "firstname", "patronymic"
                FROM "patient" 
                ORDER BY "id"`,
    select: `SELECT "id", "lastname", "firstname", "patronymic"
                FROM "patient"  
            WHERE "id" = $1`,
    insert: `INSERT INTO "patient"("lastname", "firstname", "patronymic") 
            VALUES ($1, $2, $3) 
            RETURNING "id", "lastname", "firstname", "patronymic"`,
    update: `UPDATE "patient" 
            SET "lastname" = $1, "firstname" = $2, "patronymic" = $3
            WHERE "id" = $4 
            RETURNING "id", "lastname", "firstname", "patronymic"`,
    delete: `DELETE FROM "patient" 
            WHERE "id" = $1 
            RETURNING "id", "lastname", "firstname", "patronymic"`
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
        [rssItem.lastname, rssItem.firstname, rssItem.patronymic]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, rssItem) {
    const query = await pool.query(
        queryStrings.update,
        [rssItem.lastname, rssItem.firstname, rssItem.patronymic, id]);
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
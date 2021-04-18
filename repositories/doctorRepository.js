const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT "id", "lastname", "firstname", "patronymic", "position" 
                FROM "doctor" 
                ORDER BY "id"`,
    select: `SELECT "id", "lastname", "firstname", "patronymic", "position" 
                FROM "doctor"  
            WHERE "id" = $1`,
    insert: `INSERT INTO "doctor"("lastname", "firstname", "patronymic", "position") 
            VALUES ($1, $2, $3, $4) 
            RETURNING "id", "lastname", "firstname", "patronymic", "position"`,
    update: `UPDATE "doctor" 
            SET "lastname" = $1, "firstname" = $2, "patronymic" = $3, "position" = $4 
            WHERE "id" = $5 
            RETURNING "id", "lastname", "firstname", "patronymic", "position"`,
    delete: `DELETE FROM "doctor" 
            WHERE "id" = $1 
            RETURNING "id", "lastname", "firstname", "patronymic", "position"`
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
        [rssItem.lastname, rssItem.firstname, rssItem.patronymic, rssItem.position]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, rssItem) {
    const query = await pool.query(
        queryStrings.update,
        [rssItem.lastname, rssItem.firstname, rssItem.patronymic, rssItem.position, id]);
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
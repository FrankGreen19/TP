const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT "id", "doctor_id", "time"
                FROM "schedule"
                ORDER BY "id"`,
    select: `SELECT "id", "doctor_id", "time"
                FROM "schedule"
            WHERE "id" = $1`,
    insert: `INSERT INTO "schedule"("doctor_id", "time")
            VALUES ($1, $2)
            RETURNING "id", "doctor_id", "time"`,
    update: `UPDATE "schedule"
            SET "doctor_id" = $1, "time" = $2
            WHERE "id" = $3
            RETURNING "id", "doctor_id", "time"`,
    delete: `DELETE FROM "schedule"
            WHERE "id" = $1
            RETURNING "id", "doctor_id", "time"`
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
        [rssItem.doctor_id, rssItem.time]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, rssItem) {
    const query = await pool.query(
        queryStrings.update,
        [rssItem.doctor_id, rssItem.time, id]);
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
const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT "id", "name", "description", "amount", "id_same_medicine" 
                FROM "medicine" 
                ORDER BY "id"`,
    select: `SELECT "id", "name", "description", "amount", "id_same_medicine" 
                FROM "medicine"  
            WHERE "id" = $1`,
    insert: `INSERT INTO "medicine"("name", "description", "amount", "id_same_medicine") 
            VALUES ($1, $2, $3, $4) 
            RETURNING "id", "name", "description", "amount", "id_same_medicine"`,
    update: `UPDATE "medicine" 
            SET "name" = $1, "description" = $2, "amount" = $3, "id_same_medicine" = $4 
            WHERE "id" = $5 
            RETURNING "id", "name", "description", "amount", "id_same_medicine"`,
    delete: `DELETE FROM "medicine" 
            WHERE "id" = $1 
            RETURNING "id", "name", "description", "amount", "id_same_medicine"`
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
        [rssItem.name, rssItem.description, rssItem.amount, rssItem.id_same_medicine]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, rssItem) {
    const query = await pool.query(
        queryStrings.update,
        [rssItem.name, rssItem.description, rssItem.amount, rssItem.id_same_medicine, id]);
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
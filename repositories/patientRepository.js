const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT *
                FROM "patient" 
                ORDER BY "id"`,
    select: `SELECT *
                FROM "patient"  
            WHERE "id" = $1`,
    selectByLogin: `SELECT *
                FROM "patient"  
            WHERE "login" = $1`,
    insert: `INSERT INTO "patient"("lastname", "firstname", "patronymic", "login", "password") 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING "id", "lastname", "firstname", "patronymic", "login", "password"`,
    update: `UPDATE "patient" 
            SET "lastname" = $1, "firstname" = $2, "patronymic" = $3, "login" = $4, "password" = $5
            WHERE "id" = $6
            RETURNING "id", "lastname", "firstname", "patronymic", "login", "password"`,
    delete: `DELETE FROM "patient" 
            WHERE "id" = $1 
            RETURNING "id", "lastname", "firstname", "patronymic", "login", "password"`
}

async function getAll() {
    const query = await pool.query(queryStrings.selectAll);
    return query.rows;
}

async function getByLogin(login) {
    const query = await pool.query(queryStrings.selectByLogin, [login]);
    if (query.rows.length === 0) {
        return null;
    }
    return query.rows[0];
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
        [rssItem.lastname, rssItem.firstname, rssItem.patronymic, rssItem.login, rssItem.password]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, rssItem) {
    const query = await pool.query(
        queryStrings.update,
        [rssItem.lastname, rssItem.firstname, rssItem.patronymic, rssItem.login, rssItem.password, id]);
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

module.exports = { getAll, get, getByLogin, post, put, remove }
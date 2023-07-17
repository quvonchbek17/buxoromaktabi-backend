const { Pool } = require('pg')
const { DB_CONNECTION_URL } = require('../configs/keys')

const pool = new Pool({
    connectionString: DB_CONNECTION_URL
})

const fetchData = async(query, ...params) => {

    const client = await pool.connect()
    try {
        const { rows } = await client.query(query, params.length ? params : null)
        return rows
    } finally {
        client.release()
    }
}

module.exports = {
    fetchData
}
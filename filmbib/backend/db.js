require("dotenv").config({ path: __dirname + "/../.env" });
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

async function query(sql, params) {
  let connection;
  try {
    connection = await pool.getConnection();
    const res = await connection.query(sql, params);
    return res;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

async function close() {
  await pool.end();
}

module.exports = { query, close };

if (require.main === module) {
  (async () => {
    try {
      const res = await query("SELECT 1 AS ok");
      console.log("DB test result:", res);
    } catch (err) {
      console.error("DB test failed:", err);
    } finally {
      await close();
      console.log("Pool closed, exiting.");
    }
  })();
}
const getDB = require("../getDB");

const createFormQuery = async (full_name, email, phone, company, country, message) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(
      `INSERT INTO clients (full_name, email, phone, company, country, message) VALUES (?, ?, ?, ?, ?, ?)`,
      [full_name, email, phone, company, country, message]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = createFormQuery;

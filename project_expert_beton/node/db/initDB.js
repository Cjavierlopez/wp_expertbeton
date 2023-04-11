require ('dotenv').config();

const getDB = require ('./getDB');

const createTables = async () => {
  let connection;

  try {
    connection = await getDB();

    console.log('Crating tables...');

    await connection.query(
      `CREATE TABLE IF NOT EXISTS clients (
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      full_name VARCHAR(150) NOT NULL,
      email VARCHAR(100) NOT NULL,
      phone INT NOT NULL,
      company VARCHAR(100) NOT NULL,
      country VARCHAR(100) NOT NULL,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      modified_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP       
      );`
    );
    
    console.log('Tables crated!');
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();

    process.exit();
  }
};

createTables();
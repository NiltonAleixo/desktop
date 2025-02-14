// electron/dbManager.js
const sqlite3 = require('sqlite3').verbose();

let db;

const openConnection = () => {
  if (!db) {
    db = new sqlite3.Database('electron/SFDB.db', (err) => {
      if (err) console.error(err.message);
      else console.log('Conectado ao banco SQLite.');
    });
  }
};

const selectQuery = (query, callback) => {
  openConnection();
  if (!db) {
    console.error("Erro: Conexão com o banco de dados não encontrada!");
    return;
  }

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Erro na consulta SQL:", err.message);
      callback([]);
    } else {
      callback(rows);
    }
  });
};

const closeConnection = () => {
  if (db) {
    db.close((err) => {
      if (err) console.error(err.message);
      else console.log('Conexão SQLite fechada.');
    });
  }
};

//  ADICIONE ISTO NO FINAL DO ARQUIVO:
module.exports = { selectQuery, closeConnection };
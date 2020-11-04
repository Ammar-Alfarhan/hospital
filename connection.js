const mssql = require('mssql');
// config for your database
const config = {
  user: 'sa',
  password: 'Ammar5631',
  server: 'localhost',
  database: 'hospital',
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

mssql.connect(config, function(err) {
  if (err) console.log(err);
});

module.exports = mssql;

module.exports = {
    Host: "localhost",
    USER: "postgres",
    Password: "coldgamez32",
    Database: "ChatApp",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
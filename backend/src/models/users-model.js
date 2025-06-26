const fs = require('fs');
const path = require('path');

const userDatabaseFilePath = path.join(__dirname, '../database/users.json');

const getAllUsers = () => {
  const usersData = JSON.parse(fs.readFileSync(userDatabaseFilePath, 'utf-8'));
  return usersData;
};

const saveUsers = (data) => {
  fs.writeFileSync(userDatabaseFilePath, JSON.stringify(data, null, 2));
};


const getUserByEmail = (email) => {
  const users = getAllUsers();
  return users.find((user) => user.email === email);
};

module.exports = { getAllUsers, saveUsers, getUserByEmail };
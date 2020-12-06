const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../src/config');

function cleanTable(db) {
  return db.raw(
    `TRUNCATE
            users
            RESTART IDENTITY CASCADE`
  );
}

// function makeAuthHeader(email, jwtSecret) {
//   const token = jwt.sign({ id: user.id }, jwtSecret, {
//     subject: email,
//     algorithm: 'HS256',
//   });
//   return `jwt_token ${token}`;
// }

module.exports = {
  cleanTable,
  // makeAuthHeader,
};

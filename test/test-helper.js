const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../src/config');

function cleanTable(db) {
  return db.raw(
    `TRUNCATE
            users
            RESTART IDENTITY CASCADE`
  );
}

// function makeAuthHeader(email, JWT_SECRET) {
//   const token = jwt.sign({ id: user.id }, JWT_SECRET, {
//     subject: email,
//     algorithm: 'HS256',
//   });
//   return `jwt_token ${token}`;
// }

module.exports = {
  cleanTable,
  // makeAuthHeader,
};

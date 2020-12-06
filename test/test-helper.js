const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../src/config');

const userArr = [
  {
    user_id: '1ac1a124-9aaa-4b2f-9cbb-6039a083f958',
    user_name: 'chris',
    user_email: 'chris@chris.com',
    user_password: 'chris',
  },
  {
    user_id: 'd1eff057-955f-4457-82d6-243b543ec34d',
    user_name: 'Tori',
    user_email: 'tori@tori.com',
    user_password: 'tori',
  },
];

function cleanTable(db) {
  return db.raw(
    `TRUNCATE
            users
            RESTART IDENTITY CASCADE`
  );
}

function makeAuthHeader(email, JWT_SECRET) {
  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    subject: email,
    algorithm: 'HS256',
  });
  return `jwt_token ${token}`;
}

module.exports = {
  userArr,
  cleanTable,
  makeAuthHeader,
};

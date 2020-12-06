const jwt = require('jsonwebtoken');

function makeAuthHeader(email, JWT_SECRET) {
  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    subject: email,
    algorithm: 'HS256',
  });
  return `jwt_token ${token}`;
}

module.exports = {
  makeAuthHeader,
};

'use strict';

exports.port = process.env.PORT || 3000;
exports.mongodb = {
  uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'localhost/makeeapi'
};
exports.authentication = {
  header: 'x-access-token',
  jwtSecret: "nodeseed1688999",
  jwtSession: {
        session: false
  }
};
exports.mysql = {
  host: 'localhost',
  user: '',
  password: '',
  database: 'nodeseed'
};
exports.companyName = 'WTF';
exports.projectName = 'nodejsseed';
exports.systemEmail = 'bigdstut@gmail.com';
exports.smtp = {
  from: {
    name: process.env.SMTP_FROM_NAME || exports.projectName +' Website',
    address: process.env.SMTP_FROM_ADDRESS || 'your@email.addy'
  },
  credentials: {
    user: process.env.SMTP_USERNAME || 'your@email.addy',
    password: process.env.SMTP_PASSWORD || 'bl4rg!',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    ssl: true
  }
};

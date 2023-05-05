'user strict'
const express = require('express');
const sms = express();
const controller = require('../Controllers/Inbox/InboxMessage');

sms.get('/query_incoming_sms',controller.get_query_incoming_sms);

module.exports = sms;  